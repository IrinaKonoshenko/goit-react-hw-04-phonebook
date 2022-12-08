import { ContactList } from './ContactList/ContactList';
import { Empty } from './Empty/Empty';
import { Filter } from './Filter/Filter';
import { FormCreate } from './FormCreate/FormCreate';
import { Section } from './Section/Section';
import { useState, useEffect } from 'react';
import { useMemo } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      setContacts(JSON.parse(contacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isAlreadyInContact = contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isAlreadyInContact) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    setContacts([...contacts, contact]);
  };

  const onChangeFilter = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [contacts, filter]);

  const onDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="App">
      <Section title="Phonebook">
        <FormCreate onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filter} onChangeFilter={onChangeFilter} />
        {filteredContacts.length > 0 ? (
          <ContactList contacts={filteredContacts} onDelete={onDelete} />
        ) : (
          <Empty text="Not found" />
        )}
      </Section>
    </div>
  );
};
