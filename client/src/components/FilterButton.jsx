import PropTypes from 'prop-types';

export default function FilterButton({ name, isPressed, setFilter }) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

// PropTypes validation
FilterButton.propTypes = {
  name: PropTypes.string.isRequired,        // Filter name like "All", "Active", "Completed"
  isPressed: PropTypes.bool.isRequired,     // Whether this filter button is active
  setFilter: PropTypes.func.isRequired,     // Function to change the filter in context
};
