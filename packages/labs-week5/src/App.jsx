import './App.css'
import React from 'react';
import { nanoid } from 'nanoid';
import TodoItem from "./TodoItem";
import AddTaskForm from './AddTaskForm';

const INITIAL_TASK_LIST = [
  { id: nanoid(), name: "Eat", completed: false },
  { id: nanoid(), name: "Sleep", completed: false },
  { id: nanoid(), name: "Repeat", completed: false },
];

function App() {
  const [tasks, setTasks] = React.useState(INITIAL_TASK_LIST);

  function addTask(taskName) {
    const newTask = { id: nanoid(), name: taskName, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompletion(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <main className="m-4">      
      <AddTaskForm onNewTask={addTask} />
      <button onClick={() => setTasks([])} className="p-1 bg-red-600 text-white">Delete all</button>

      <section>
        <h1 className="text-xl font-bold mt-4">To do</h1>
        <ul>
          {tasks.map((task) => (
            <TodoItem key={task.id} task={task} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
