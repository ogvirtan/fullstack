const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const emptyblogs = []

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

test('dummy returns one', () => {
  const result = listHelper.dummy(emptyblogs)
  assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
  test('empty list returns 0', () => {
    assert.strictEqual(listHelper.totalLikes(emptyblogs), 0)
  })
  test('summing works', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
})

describe('favoriteBlog', () => {
  test('returns the most liked blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    })
  })
  test('empty list returns string', () => {
    assert.strictEqual(listHelper.favoriteBlog(emptyblogs), 'empty list')
  })
})

describe('mostBlogs', () => {
  test('returns correct author and amount of blogs', () => {
    assert.strictEqual(listHelper.mostBlogs(blogs).author, 'Robert C. Martin')
    assert.strictEqual(listHelper.mostBlogs(blogs).blogs, 3)
  })
  test('empty list returns string', () => {
    assert.strictEqual(listHelper.mostBlogs(emptyblogs), 'empty list')
  })
})

describe('mostLikes', () => {
  test('returns correct author and amount of likes', () => {
    assert.strictEqual(listHelper.mostLikes(blogs).author, 'Edsger W. Dijkstra')
    assert.strictEqual(listHelper.mostLikes(blogs).likes, 17)
  })
  test('empty list returns string', () => {
    assert.strictEqual(listHelper.mostLikes(emptyblogs), 'empty list')
  })
})
