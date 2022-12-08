import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './FormCreate.module.css';

export const FormCreate = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const { name, number } = form.elements;

    onSubmit({ id: nanoid(), name: name.value, number: number.value });
    name.value = '';
    number.value = '';
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formCreate}>
        <label className={css.label}>Name</label>
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={css.formCreate}>
        <label className={css.label}>Number</label>
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

FormCreate.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
