import { ContactList } from './ContactList/ContactList';
import { Empty } from './Empty/Empty';
import { Filter } from './Filter/Filter';
import { FormCreate } from './FormCreate/FormCreate';
import { Section } from './Section/Section';
import { useState, useEffect } from 'react';
import { useMemo } from 'react';

function getContactsInLocalStorage() {
  const contacts = localStorage.getItem('contacts');
  if (contacts) {
    return JSON.parse(contacts);
  }
  return [];
}

export const App = () => {
  const [contacts, setContacts] = useState(getContactsInLocalStorage());
  const [filter, setFilter] = useState('');

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
