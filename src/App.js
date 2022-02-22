// src/App.js
import "./App.css";
import { useState } from "react";
import contacts from "./contacts.json";

function App() {
  const [contactList, setContactList] = useState(contacts.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(
    contacts.slice(5, contacts.length)
  );

  const addRandomContact = () => {
    const randomNumber = Math.floor(Math.random() * remainingContacts.length);
    const newContact = remainingContacts[randomNumber];
    remainingContacts.splice(randomNumber, 1); //remove the contacts from the remaining contact list
    setContactList(contactList => [...contactList, newContact])
    setRemainingContacts(remainingContacts => [...remainingContacts])
  }

  const sortByName = () => {
    setContactList((contacts) => {
      const dataToSort = [...contacts];
      dataToSort.sort((a, b) => (a.name < b.name ? -1 : 1));
      return dataToSort;
    });
  };

  const sortByPopularity = () => {
    setContactList((contacts) => {
      const dataToSort = [...contacts];
      dataToSort.sort((a, b) => (a.popularity < b.popularity ? -1 : 1));
      return dataToSort;
    });
  };

  const deleteContact = (contactId) => {
    console.log(contactId)
    const filteredContacts = contactList.filter((contact) => {
      return contact.id !== contactId;
    });

    setContactList(filteredContacts);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button className="btn" onClick={() => addRandomContact()}>
        Add Random Contact
      </button>

      <button className="btn" onClick={() => sortByName()}>
        Sort By Name
      </button>

      <button className="btn" onClick={() => sortByPopularity()}>
        Sort By Popularity
      </button>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((contact, i) => {
            return (
              <tr key={i}>
                <td>
                  <img
                    src={contact.pictureUrl}
                    alt="illustration"
                    width="80"
                    height="120"
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td>{contact.wonOscar ? <p>🏆</p> : <p></p>}</td>
                <td>{contact.wonEmmy ? <p>🏆</p> : <p></p>}</td>
                <td>
                <button className="btn" onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default App;
