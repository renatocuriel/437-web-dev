import './App.css'
import TodoItem from "./TodoItem";
import AddTaskForm from './AddTaskForm';

function App() {
  const tasks = ["Work", "Study", "Sleep", "Repeat"];

  return (
    <main className="m-4">
      <AddTaskForm />

      <section>
        <h1 className="text-xl font-bold mt-4">To do</h1>
        <ul>
          {tasks.map((task, index) => (
            <TodoItem key={index} task={task} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
