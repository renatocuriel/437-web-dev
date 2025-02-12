function AddTaskForm() {
    return (
      <div className="flex gap-2 items-center">
        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New task name"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800">
          Add task
        </button>
      </div>
    );
  }
  
export default AddTaskForm;
  