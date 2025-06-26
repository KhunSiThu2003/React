import React from "react";

const Task = ({ job: { id, task, isDone }, removeTask, doneTask }) => {
  const handleRemoveTaskBtn = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this task?")) {
      removeTask(id);
    }
  };

  const handleTaskClick = () => {
    doneTask(id);
  };

  return (
    <div 
      className={`flex justify-between items-center p-4 rounded-lg mb-3 last:mb-0 transition-all duration-200
        ${isDone 
          ? "bg-green-50 border border-green-200" 
          : "bg-white border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"}
      `}
      onClick={handleTaskClick}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 
          ${isDone ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
          {isDone && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <p className={`text-gray-800 ${isDone ? "line-through text-gray-500" : ""}`}>
          {task}
        </p>
      </div>
      <button
        onClick={handleRemoveTaskBtn}
        className="flex items-center justify-center p-2 rounded-full hover:bg-red-50 transition-colors"
        aria-label="Delete task"
      >
        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default Task;