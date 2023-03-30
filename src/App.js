import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Form from "./components/Form";

import Help from "./components/Help";
import HelpIntro from "./components/Help/Intro";
import HelpAdd from "./components/Help/Adding";
import HelpRemove from "./components/Help/Removing";
import HelpChange from "./components/Help/Changing";

import NotFound from "./components/NotFound";

import Spinner from "./components/Spinner";
import ErrorMessage from "./components/ErrorMessage";

import * as restAPI from './restapi';

export default function App() {

  // Sets the initial state.
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await restAPI.read();
      if (result.success) {
        // Do something
      }
      else {
        setError(result.error);
      }

      setIsLoading(false);
    })();
  }, []);

  // Adds a task.
  const handleAddTask = (newTask) => {
    const updatedTasks = [
      ...tasks,
      newTask
    ];
    setTasks(updatedTasks);
  }

  // Toggles a task status.
  const handleStatusChange = async (id) => {

    // Update the state.
    const updatedTasks = [...tasks];
    updatedTasks.forEach((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
    });
    setTasks(updatedTasks);

    // Update the server.
    const data = updatedTasks.find((task) => task.id === id);
    const result = await restAPI.update(data);
    if (!result.success) {
      setError(result.error);
    }
  }

  // Removes a task from the list.
  const handleTaskRemove = async (id) => {

    // Update the state.
    const filteredTasks = tasks.filter(
      (task) => task.id !== id
    );
    setTasks(filteredTasks);

    // Update the server.
    const result = await restAPI.remove(id);
    if (!result.success) {
      setError(result.error);
    }
  }

  // Removes all tasks form the list.
  const handleClearTasks = async () => {
    setTasks([]);

    // Update the server.
    const result = await restAPI.clear();
    if (!result.success) {
      setError(result.error);
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        <Spinner show={isLoading} />
        <ErrorMessage error={error} />

        {/* Set the app routes */}
        <Routes>
          <Route path="/" element={
            <Tasks
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onTaskRemove={handleTaskRemove}
              onClearTasks={handleClearTasks}
            />
          } />
          <Route path="/add" element={
            <Form
              onAddTask={handleAddTask}
            />
          } />
          <Route path="/help" element={<Help />}>
            <Route path="" element={<HelpIntro />} />
            <Route path="add" element={<HelpAdd />} />
            <Route path="remove" element={<HelpRemove />} />
            <Route path="change" element={<HelpChange />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
