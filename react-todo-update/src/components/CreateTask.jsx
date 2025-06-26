import React, { useState } from "react";

const CreateTask = ({ addTask }) => {
  const [job, setJob] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleOnChange = (event) => {
    setJob(event.target.value);
  };

  const handleAddTaskBtn = () => {
    if (job.trim() === "") {
      return; // Don't add empty tasks
    }
    
    const newTask = {
      task: job.trim(),
      isDone: false,
      createdAt: new Date().toISOString() // Add creation timestamp
    };
    
    addTask(newTask);
    setJob("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTaskBtn();
    }
  };

  return (
    <div className="mb-6">
      <div className={`flex transition-all duration-200 ${isInputFocused ? "ring-2 ring-blue-500 rounded-lg" : ""}`}>
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:border-blue-500 transition-colors duration-200"
          value={job}
          onChange={handleOnChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="What needs to be done?"
          aria-label="Add new task"
        />
        <button
          onClick={handleAddTaskBtn}
          disabled={!job.trim()}
          className={`bg-blue-500 text-white px-5 py-3 rounded-r-lg font-medium transition-colors duration-200
            ${!job.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}
          `}
        >
          Add Task
        </button>
      </div>
      
      {/* Quick tips */}
      {job.trim() === "" && (
        <div className="text-sm text-gray-400 mt-2">
          Tip: Press Enter to quickly add tasks
        </div>
      )}
    </div>
  );
};

export default CreateTask;