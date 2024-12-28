import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice.ts";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask({ id: Date.now().toString(), title, completed: false }));
      setTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white shadow-lg rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Add New Task
      </h2>
      <div className="flex items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task"
          className="flex-grow px-4 py-2 border-2 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className={`px-6 py-2 font-semibold rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out ${
            title.trim()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default React.memo(TaskForm);
