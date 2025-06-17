import { useState, useEffect } from 'react'
import Search from './components/Search'
import Contact from './components/Contact'
import Book from './components/Book'
import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(()=>{
    noteService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

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
      noteService
      .create({name: newName, number:newNumber})
      .then( returnedNote => {
        setPersons(persons.concat(returnedNote))
      })
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