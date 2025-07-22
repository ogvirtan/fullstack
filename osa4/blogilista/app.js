const express = require('express')
require('express-async-errors')
const app = express()

const blogsRouter = require('./controllers/blogs')

const usersRouter = require('./controllers/users')

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = async (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: 'ValidationError' })
  }
  else if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  return response.status(500).send({ error: error.name })
}

app.use(errorHandler)

module.exports = app
