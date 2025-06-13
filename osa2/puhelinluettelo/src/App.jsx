import { useState } from 'react'

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

  const contactsToShow = search === ''
    ? persons
    : persons.filter(entry => entry.name.toLowerCase().includes(search.toLowerCase()))

  const addHenkilo = (event) =>{
    event.preventDefault()
    const onlyNames = persons.map(p => p.name)
    if (onlyNames.includes(newName)){
      window.alert(`${newName} is already added to the phone book`)
    }else if(newName === '' || newNumber === ''){
      window.alert(`fill out both fields`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    setNewName('')
    setNewNumber('')
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
      <form>
          filter shown with <input value = {search} onChange={handleSearchChange}/>
      </form>
      <h2>add a new</h2>
      <form onSubmit = {addHenkilo}>
        <div>
          name: <input value = {newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {contactsToShow.map(c => <p key = {c.name}>{c.name} {c.number}</p>)}
    </div>
  )

}

export default App