import { useState } from 'react'
import Search from './components/Search'
import Contact from './components/Contact'
import Book from './components/Book'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addHenkilo = (event) =>{
    event.preventDefault()

    const onlyNames = persons.map(p => p.name)

    if (onlyNames.includes(newName)){
      window.alert(`${newName} is already added to the phone book`)
      setNewName('')
      setNewNumber('')

    } else if (newName === '' || newNumber === ''){
      window.alert(`fill out both fields`)
      
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
   const handleSearchChange = (event) =>{
    setSearch(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <Search input = {search} onChange={handleSearchChange}/>
      <h2>add a new</h2>
        <Contact name={newName} number={newNumber} onNumChange = {handleNumberChange} onNameChange= {handleNameChange} onSubmit= {addHenkilo}/>
      <h2>Numbers</h2>
        <Book persons = {persons} search={search}/>
    </div>
  )

}

export default App