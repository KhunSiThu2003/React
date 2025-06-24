import React, { Profiler, useEffect, useState, useCallback } from "react";
import Heading from "./components/Heading";
import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";
import Loader from "./components/Loader"; // Assuming you have a Loader component

const App = () => {
  // app state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTask = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/tasks");
      if (!res.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (newTask) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) {
        throw new Error('Failed to add task');
      }

      fetchTask(); // Refresh tasks after adding a new one
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error('Failed to delete task');
      }

      fetchTask(); // Refresh tasks after deletion
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const doneTask = async (id) => {
    try {
      setLoading(true);
      const taskToUpdate = tasks.find(task => task.id === id);
      const updatedTask = { ...taskToUpdate, isDone: !taskToUpdate.isDone };

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) {
        throw new Error('Failed to update task');
      }

      fetchTask(); // Refresh tasks after updating
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout
      (() => {
        fetchTask();
      }, 1000); // Simulate a delay for loading
  }, [fetchTask]);

  const onRender = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    // You can add performance logging here if needed
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-10">
      <Profiler id="App" onRender={onRender}>
        <Heading />
        <CreateTask addTask={addTask} />
        <TaskList
          doneTask={doneTask}
          removeTask={removeTask}
          tasks={tasks}
          loading={loading}
        />
      </Profiler>
    </div>
  );
};

export default App;