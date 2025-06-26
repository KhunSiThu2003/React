import React, { Profiler, useEffect, useState, useCallback } from "react";
import axios from "axios";
import Heading from "./components/Heading";
import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";
import Loader from "./components/Loader";
import useSWR, { useSWRConfig } from "swr";

const fetcher = url => axios.get(url).then(res => res.data);

const App = () => {
  // app state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using SWR for data fetching
  const { data, error: swrError, isLoading } = useSWR("http://localhost:5000/tasks", fetcher, {
    revalidateOnFocus: false,
  });

  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (data) {
      setTasks(data);
      setLoading(false);
    }
    if (swrError) {
      setError(swrError.message);
      setLoading(false);
    }
  }, [data, swrError]);

  const addTask = async (newTask) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/tasks", newTask);
      // SWR will automatically revalidate and update the data
      mutate("http://localhost:5000/tasks");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      // SWR will automatically revalidate and update the data
      mutate("http://localhost:5000/tasks");
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
      
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
      // SWR will automatically revalidate and update the data
      mutate("http://localhost:5000/tasks");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onRender = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    });
  };

  if (isLoading || loading) {
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