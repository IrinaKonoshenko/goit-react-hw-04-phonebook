import { Component } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Empty } from './Empty/Empty';
import { Filter } from './Filter/Filter';
import { FormCreate } from './FormCreate/FormCreate';
import { Section } from './Section/Section';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      contacts: [],
      filter: '',
    };
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({
        contacts: JSON.parse(contacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    const isAlreadyInContact = this.state.contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isAlreadyInContact) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }
    this.setState({
      contacts: [...this.state.contacts, contact],
    });
  };

  onChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filteredContacts = () => {
    return this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
  };

  onDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    return (
      <div className="App">
        <Section title="Phonebook">
          <FormCreate onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter
            filter={this.state.filter}
            onChangeFilter={this.onChangeFilter}
          />
          {this.filteredContacts().length > 0 ? (
            <ContactList
              contacts={this.filteredContacts()}
              onDelete={this.onDelete}
            />
          ) : (
            <Empty text="Not found" />
          )}
        </Section>
      </div>
    );
  }
}
