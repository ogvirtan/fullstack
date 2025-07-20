const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

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

test('id field within blogs is valid', async () => {
  const blogs = await helper.blogsInDb()

  assert(Object.keys(blogs[0]).includes('id'))
})

test('a valid blog entry is present in the database', async () => {
  const newBlog = {
    title: 'testBook',
    author: 'testAuthor',
    url: 'test_url',
    likes: 0
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
  const newBlog = {
    title: 'testBook',
    author: 'testAuthor',
    url: 'test_url',
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
  const newBlog = {
    author: 'testAuthor',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})