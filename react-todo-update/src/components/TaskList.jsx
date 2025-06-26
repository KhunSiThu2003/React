import React from "react";
import Task from "./Task";
import Loader from "./Loader";

const TaskList = ({ tasks, removeTask, doneTask, loading = false }) => {
  // Safely handle tasks data
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  
  // Calculate task counts safely
  const totalTasks = safeTasks.length;
  const doneTasksCount = safeTasks.filter(task => task?.isDone).length;

  if (loading) {
    return <Loader />;
  }

  if (!Array.isArray(tasks)) {
    console.error("Invalid tasks data:", tasks);
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p className="font-bold">Data Error</p>
        <p>Tasks data is not in the expected format. Please try refreshing.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="font-bold font-serif text-xl mb-3">
        Task List (Total: {totalTasks}, Done: {doneTasksCount})
      </h3>
      
      {totalTasks === 0 ? (
        <p className="text-gray-500 italic">No tasks to display. Start by adding a new task!</p>
      ) : (
        <div className="space-y-2">
          {safeTasks.map((task) => (
            <Task
              doneTask={doneTask}
              removeTask={removeTask}
              key={task.id}
              job={task}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;