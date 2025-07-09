require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()

const Contact = require('./models/contact')

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.use((req, res, next) => {
  if (req.method === 'POST') {
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :post-content'
    )(req, res, next)
  } else {
    morgan('tiny')(req, res, next)
  }
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    if (!body.number) {
      return res.status(400).json({ error: 'everything missing' })
    }
    return res.status(400).json({ error: 'name missing' })
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number missing' })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact
    .save()
    .then((savedContact) => {
      res.json(savedContact)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  Contact.findById(req.params.id)
    .then((contact) => {
      contact.name = body.name
      contact.number = body.number

      return contact.save().then((updatedContact) => {
        res.json(updatedContact)
      })
    })
    .catch((error) => next(error))
})

app.get('/info', (req, res, next) => {
  const date = new Date().toString()
  Contact.find({})
    .then((contacts) => {
      res.send(
        `<p>Phonebook has info for ${contacts.length} people</p><p>${date}</p>`
      )
    })
    .catch((error) => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Contact.find({})
    .then((contacts) => {
      res.json(contacts)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

morgan.token('post-content', function (req) {
  return JSON.stringify(req.body)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)
