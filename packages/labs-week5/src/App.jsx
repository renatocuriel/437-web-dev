import './App.css'
import React from 'react';
import { nanoid } from 'nanoid';
import TodoItem from "./TodoItem";
import AddTaskForm from './AddTaskForm';
import Modal from './Modal';

const INITIAL_TASK_LIST = [
  { id: nanoid(), name: "Eat", completed: false },
  { id: nanoid(), name: "Sleep", completed: false },
  { id: nanoid(), name: "Repeat", completed: false },
];

function App() {
  const [tasks, setTasks] = React.useState(INITIAL_TASK_LIST);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function addTask(taskName) {
    const newTask = { id: nanoid(), name: taskName, completed: false };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  }

  function toggleTaskCompletion(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        return updatedTask
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <main className="m-4">      
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800">
        New task
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        headerLabel="New Task"
      >
        <AddTaskForm onNewTask={addTask} />
      </Modal>

      <section>
        <h1 className="text-xl font-bold mt-4">To do</h1>
        <ul>
          {tasks.map((task) => (
            <TodoItem key={task.id} task={task} onToggle={toggleTaskCompletion} onDelete={deleteTask} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
