import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store.ts";
import {
  deleteTask,
  editTask,
  toggleTaskCompletion,
  setFilter,
} from "../store/tasksSlice.ts";
import { useDebounce } from "../hooks/useDebounce.ts";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteTask(id));
    },
    [dispatch]
  );

  const handleToggle = useCallback(
    (id: string) => {
      dispatch(toggleTaskCompletion(id));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (id: string, newTitle: string) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        dispatch(editTask({ ...task, title: newTitle }));
      }
    },
    [dispatch, tasks]
  );

  const debouncedFilter = useDebounce(filter, 300);

  const filteredTasks = useMemo(() => {
    switch (debouncedFilter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "incomplete":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, debouncedFilter]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <label
          htmlFor="filter"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Filter Tasks
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) =>
            dispatch(
              setFilter(e.target.value as "all" | "completed" | "incomplete")
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="bg-gray-50 rounded-lg p-4 shadow-sm transition duration-300 ease-in-out hover:shadow-md"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <input
                type="text"
                value={task.title}
                onChange={(e) => handleEdit(task.id, e.target.value)}
                className={`ml-3 flex-grow px-2 py-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              />
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(TaskList);
