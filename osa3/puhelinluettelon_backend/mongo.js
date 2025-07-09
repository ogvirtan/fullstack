const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('invalid number of arguments')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fsdb:${password}@cluster0.g8bwyru.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 3) {
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
} else {
  contact.save().then(() => {
    console.log('contact saved!')
    mongoose.connection.close()
  })
}
