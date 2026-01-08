import { useContext, useRef, useEffect, useState } from 'react';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import usePrevious from './utils/usePrevious.js';
import { TasksContext } from './context/TasksContext';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {
  const { tasks, addTask, deleteTask, toggleTaskCompleted, editTask } = useContext(TasksContext);
  const [filter, setFilter] = useState('All');

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        key={task._id}
        id={task._id}
        name={task.text}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const updateNoun = taskList.length > 1 ? 'tasks' : 'task';

  function updateFilteredText(text) {
    switch (text) {
      case 'All':
        return `${filter} ${updateNoun}`;
      case 'Active':
        return `${taskList.length} ${updateNoun} remaining`;
      case 'Completed':
        return `${taskList.length} ${updateNoun} completed`;
    }
  }

  const remainingTasksText = tasks.length === 0 ? 'Empty - no task' : updateFilteredText(filter);

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ));

  return (
    <main className="todoapp stack-large">
      <h1>TodoSync</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{remainingTasksText}</h2>
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {taskList}
      </ul>
    </main>
  );
}
