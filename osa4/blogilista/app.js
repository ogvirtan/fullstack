const express = require('express')
require('express-async-errors')
const app = express()

const Blog = require('./models/blog')

app.use(express.json())

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

app.post('/api/blogs', async (request, response) => {
  const body = request.body
  const addedBlog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  }).save()
  response.status(201).json(addedBlog)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = async (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: 'ValidationError' })
  }
}

app.use(errorHandler)

module.exports = app
