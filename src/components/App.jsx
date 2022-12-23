import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';
import ContactsForm from './ContactsForm/ContactsForm';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const contact = {
      name: data.name,
      number: data.number,
      id: nanoid(),
    };
    setContacts([...contacts, contact]);
  };

  const checkDublicatesName = value =>
    contacts.some(({ name }) => name.toLowerCase() === value.toLowerCase());

  const getFilteredContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const changeFilter = filter => {
    setFilter(filter);
  };

  const removeContact = id => {
    setContacts(prev => [...prev.filter(contact => contact.id !== id)]);
    return;
  };

  return (
    <>
      <div>
        <h1
          style={{
            marginBottom: '15px',
            color: '#8f66fd',
            textAlign: 'center',
          }}
        >
          Phonebook
        </h1>
        <ContactsForm
          addContact={addContact}
          dublicateName={checkDublicatesName}
        />

        <h2
          style={{
            marginBottom: '15px',
            color: '#8f66fd',
            textAlign: 'center',
          }}
        >
          Contacts
        </h2>
        <Filter value={filter} onChangeFilter={changeFilter} />
        <ContactsList
          contacts={getFilteredContact()}
          onRemoveContact={removeContact}
        />
      </div>
    </>
  );
}
