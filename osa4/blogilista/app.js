const express = require('express')
require('express-async-errors')
const app = express()

const Blog = require('./models/blog')

app.use(express.json())

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  if (blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }

})

app.post('/api/blogs', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  })
  if (blog.title && blog.url) {
    const addedBlog = await blog.save()
    response.status(201).json(addedBlog)
  }
  response.status(400).json(blog)
})

module.exports = app
