import { Contact } from 'components/Contact/Contact';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <Contact
          key={contact.id}
          name={contact.name}
          number={contact.number}
          handleClickDelete={() => onDelete(contact.id)}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
