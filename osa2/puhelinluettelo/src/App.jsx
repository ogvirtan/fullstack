import { useState, useEffect } from "react";
import Search from "./components/Search";
import Contact from "./components/Contact";
import Book from "./components/Book";
import Notification from "./components/Notification";
import noteService from "./services/notes";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [latestAlert, setAlertStatus] = useState(false);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });
  }, []);

  const addHenkilo = (event) => {
    event.preventDefault();

    const onlyNames = persons.map((p) => p.name);

    if (newName === "" || newNumber === "") {
      window.alert(`fill out both fields`);
    } else {
      if (onlyNames.includes(newName)) {
        if (
          window.confirm(
            `${newName} is already added to the phone book, replace the old number with a new one?`
          )
        ) {
          const contact = persons.find((c) => c.name === newName);
          const updatedContact = { ...contact, number: newNumber };

          noteService
            .update(contact.id, updatedContact)
            .then((rN) => {
              setPersons(persons.map((c) => (c.id !== contact.id ? c : rN)));
            })
            .then(() => {
              setAlertStatus(false);
              setAlertMessage(`Contact ${newName} modified`);
              setTimeout(() => {
                setAlertMessage(null);
              }, 5000);
            })
            .catch((error) => {
              setAlertStatus(true);
              setAlertMessage(
                `Contact ${newName} has already been removed from the server`
              );
              setTimeout(() => {
                setAlertMessage(null);
              }, 5000);
              console.log("", error);
            });
        }
      } else {
        noteService
          .create({ name: newName, number: newNumber })
          .then((returnedNote) => {
            setPersons(persons.concat(returnedNote));
          })
          .then(() => {
            setAlertStatus(false);
            setAlertMessage(`Contact ${newName} added`);
            setTimeout(() => {
              setAlertMessage(null);
            }, 5000);
            setAlertStatus(false);
          })
          .catch((error) => console.log("", error));
      }
      setNewName("");
      setNewNumber("");
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const delContact = (id) => {
    const delName = persons.find((c) => c.id === id).name;
    noteService
      .remove(id)
      .then(() => {
        return noteService.getAll();
      })
      .then((updatedList) => {
        setPersons(updatedList);
      })
      .then(() => {
        setAlertStatus(false);
        setAlertMessage(`Contact ${delName} deleted`);
        setTimeout(() => {
          setAlertMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setAlertStatus(true);
        setAlertMessage(
          `Contact ${delName} has already been removed from the server`
        );
        setTimeout(() => {
          setAlertMessage(null);
        }, 5000);
        console.log("", error);
      });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification alertmsg={alertMessage} error={latestAlert} />
      <Search input={search} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <Contact
        name={newName}
        number={newNumber}
        onNumChange={handleNumberChange}
        onNameChange={handleNameChange}
        onSubmit={addHenkilo}
      />
      <h2>Numbers</h2>
      <Book persons={persons} search={search} delContact={delContact} />
    </div>
  );
};

export default App;
