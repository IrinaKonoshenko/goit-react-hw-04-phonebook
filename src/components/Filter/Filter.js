import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filter, onChangeFilter }) => {
  return (
    <div className={css.content}>
      <label className={css.title}>Find contacts by name</label>
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={onChangeFilter}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func,
};
