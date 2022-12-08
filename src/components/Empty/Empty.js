import PropTypes from 'prop-types';

export const Empty = ({ text }) => {
  return <div>{text}</div>;
};

Empty.propTypes = {
  text: PropTypes.string.isRequired,
};
