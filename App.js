// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
    // contacts.push(contact)
    // console.log(contacts)
  };

  const editContact = (contact) => {
    setSelectedContact(contact);
    setIsEditing(true);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setSelectedContact({ name: '', phone: '', email: '' });
    // debugger
    setIsEditing(false);
  };

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
       setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  return (
    <div className="App">
      <h1 class="text-center fs-2">Contact Book</h1>
      <ContactForm
        addContact={addContact}
        selectedContact={selectedContact}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
       setContacts={setContacts}
      />
      <ContactList
        contacts={contacts}
        editContact={editContact}
        deleteContact={deleteContact}
      />
    </div>
  );
}

function ContactForm({ addContact, selectedContact, isEditing, setIsEditing, setContacts }) {
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    if (isEditing) {
      setContact(selectedContact);
    }
  }, [selectedContact, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
       setContacts(prevContacts => prevContacts.map(c => c.id === selectedContact.id ? contact : c));
      setIsEditing(false);
    } else {
      addContact({ ...contact, id: Date.now() });
    }
    setContact({ name: '', phone: '', email: '' });
  };

  return (
    <div className="container-fluid d-flex justify-content-center">
      <form onSubmit={handleSubmit} className='col-4  rounded border border-2 p-3'>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id='name'
          className='form-control mb-3'
          placeholder="Name"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          required
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          className='form-control mb-3'
          placeholder="phone"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id='email'
          className='form-control mb-3'
          placeholder="Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          required
        />
        <div className="text-center">
          <button type="submit" className='btn btn-primary mt-1'> {isEditing ? 'Update' : 'Add'} Contact</button>
        </div>
      </form>
    </div>
  );
}

function ContactList({ contacts, editContact, deleteContact }) {
  return (
    <div className="container mt-3">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>
                <button className='btn btn-success me-2' onClick={() => editContact(contact)}>Edit</button>
                <button className='btn btn-danger' onClick={() => deleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;