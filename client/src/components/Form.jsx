import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Form({ addTask }) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim()) {
      addTask(name.trim()); // call context function to add task (backend sync)
      setName('');
    } else {
      alert('Input box is EMPTY, please enter a task to add');
    }
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

// PropTypes validation
Form.propTypes = {
  addTask: PropTypes.func.isRequired, // must be a function passed from context
};
