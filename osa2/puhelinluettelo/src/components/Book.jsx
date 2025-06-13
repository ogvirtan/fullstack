const Book = ({ persons, search }) =>{
    const contactsToShow = search === ''
    ? persons
    : persons.filter(entry => entry.name.toLowerCase().includes(search.toLowerCase()))

    return(
        contactsToShow.map(c => <p key = {c.name}>{c.name} {c.number}</p>)
    )
}

export default Book