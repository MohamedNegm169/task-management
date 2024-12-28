import React from "react";
import TaskForm from "./components/TaskForm.tsx";
import TaskList from "./components/TaskList.tsx";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Task Management App
        </h1>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
