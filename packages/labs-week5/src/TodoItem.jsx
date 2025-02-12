import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TodoItem({ task}) {
  return (
    <li className="flex items-center gap-2">
      <label className="flex items-center">
        <input 
            type="checkbox" 
            className="mr-2" 
        /> 
        {task.name}
      </label>
      <button className="text-gray-500 hover:text-gray-700 ml-2">
        <FontAwesomeIcon icon={faTrash} title="Delete task" />
      </button>
    </li>
  );
}

export default TodoItem;
