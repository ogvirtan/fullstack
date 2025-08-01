const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'initial', passwordHash })

  await user.save()
  await Blog.insertMany(helper.initialBlogs)
})

describe('GET', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

describe('POST', () => {
  test('a valid blog entry is present in the database', async () => {
    const user = await User.findOne({})
    const newBlog = {
      title: 'testBook',
      author: 'testAuthor',
      url: 'test_url',
      likes: 0,
      user: user._id
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const latestEntry = blogsAtEnd.slice(-1)[0]

    assert.strictEqual(latestEntry.title, newBlog.title)
    assert.strictEqual(latestEntry.author, newBlog.author)
    assert.strictEqual(latestEntry.url, newBlog.url)
    assert.strictEqual(latestEntry.likes, newBlog.likes)
  })

  test('a blog entry with no likes-field is present in the database with likes-value set at 0', async () => {
    const user = await User.findOne({})
    const newBlog = {
      title: 'testBook',
      author: 'testAuthor',
      url: 'test_url',
      user: user._id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const latestEntry = blogsAtEnd.slice(-1)[0]
    assert.strictEqual(latestEntry.likes, 0)
  })

  test('a blog entry with no title or no url returns 400', async () => {
    const user = await User.findOne({})
    const newBlog = {
      author: 'testAuthor',
      user: user._id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('DELETE', () => {
  test('deleting an item actually deletes an item with status code 204', async () => {
    const blogs = await helper.blogsInDb()
    const delBlog = blogs[0]

    await api.delete(`/api/blogs/${delBlog.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(b => b.url)

    assert(!contents.includes(delBlog.url))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test('trying to delete with faulty id returns 400 and does not affect database', async () => {
    await api.delete('/api/blogs/asdasdasd').expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('PUT', () => {
  test('modifying works and returns status code 201', async () => {
    const blogs = await helper.blogsInDb()
    const modBlog = blogs[0]
    const ogLikes = modBlog.likes
    modBlog.likes += 1
    await api
      .put(`/api/blogs/${modBlog.id}`)
      .send(modBlog)
      .expect(201)

    assert.strictEqual(modBlog.likes, ogLikes + 1)
  })
  test('modifying does not add objects with faulty id and returns 400', async () => {
    const newBlog = {
      title: 'Not supposed to be in DB',
      author: 'Not supposed to be in DB',
      url: 'Not supposed to be in DB',
    }
    await api
      .put('/api/blogs/asdasdasd')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})


describe('MISCELLANEOUS', () => {
  test('id field within blogs is valid', async () => {
    const blogs = await helper.blogsInDb()

    assert(Object.keys(blogs[0]).includes('id'))
  })
})

after(async () => {
  await mongoose.connection.close()
})