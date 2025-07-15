const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((s, b) => {
      return b.likes + s
    }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 'empty list'
    : blogs.reduce((s, b) => {
      return b.likes >= s.likes ? b : s
    }, blogs[0])
}

const blogsByAuthor = (blogs) => {
  const blogsByAuthorMap = blogs.reduce((rVal, b) => {
    rVal.has(b.author)
      ? rVal.set(b.author, { blogs: rVal.get(b.author).blogs + 1, likes: rVal.get(b.author).likes + b.likes })
      : rVal.set(b.author, { blogs: 1, likes: b.likes })
    return rVal
  }, new Map())
  return [...blogsByAuthorMap].map(([author, { blogs, likes }]) => ({
    author,
    blogs,
    likes,
  }))
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 'empty list'
  }
  const bba = blogsByAuthor(blogs)
  const rItem = bba.sort((a, b) => b.blogs - a.blogs)[0]
  return { author: rItem.author, blogs: rItem.blogs }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 'empty list'
  }
  const bba = blogsByAuthor(blogs)
  const rItem = (bba.sort((a, b) => b.likes - a.likes))[0]
  return { author: rItem.author, likes: rItem.likes }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
