import PropTypes from 'prop-types';
import css from './Contact.module.css';

export const Contact = ({ name, number, handleClickDelete }) => {
  return (
    <li className={css.item}>
      {name}: {number} <button onClick={handleClickDelete}>Delete</button>
    </li>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
};
