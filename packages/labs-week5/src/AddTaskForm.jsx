import React from 'react';

function AddTaskForm( { onNewTask } ) {
    const [taskName, setTaskName] = React.useState("");

    function handleAddTask() {
      onNewTask(taskName);
      setTaskName("");
    }

    function handleTextChange(e) {
      setTaskName(e.target.value);
    }

    function handleKeyDown(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTask();
      }
    }

    return (
      <div className="flex gap-2 items-center">
        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New task name"
          value={taskName}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddTask} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800">
          Add task
        </button>
      </div>
    );
  }
  
export default AddTaskForm;
  