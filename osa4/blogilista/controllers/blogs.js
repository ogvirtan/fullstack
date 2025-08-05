const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  const addedBlog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes ? body.likes : 0
  }).save()

  user.blogs = user.blogs.concat(addedBlog._id)
  await user.save()
  response.status(201).json(addedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updatedBlog = await Blog.findById(request.params.id)
  updatedBlog.likes = body.likes
  await updatedBlog.save()
  response.status(201).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  const addingUser = await Blog.findById(request.params.id)
  if (addingUser.user.toString() !== user.id.toString()) {
    return response.status(400).json({ error: 'not authorized to delete' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter