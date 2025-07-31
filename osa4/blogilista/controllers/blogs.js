const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  //const user = await User.findById(body.user)
  const user = await User.findOne({})
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
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter