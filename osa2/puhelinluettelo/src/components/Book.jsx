const Book = ({ persons, search, delContact }) => {
  const contactsToShow =
    search === ""
      ? persons
      : persons.filter((entry) =>
          entry.name.toLowerCase().includes(search.toLowerCase())
        );

  return contactsToShow.map((c) => (
    <p key={c.id}>
      {c.name} {c.number}
      <button
        id={c.id}
        name={c.name}
        onClick={() => {
          if (window.confirm(`Delete ${c.name}`)) {
            delContact(c.id);
          }
        }}
      >
        delete
      </button>
    </p>
  ));
};

export default Book;
