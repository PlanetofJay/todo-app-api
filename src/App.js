import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import uuid from "react-uuid";

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

export default function App() {

  // Sets the initial state.
  const [tasks, setTasks] = useState([
    { id: uuid(), description: "Walk the dog", done: true },
    { id: uuid(), description: "Wash the car", done: false },
    { id: uuid(), description: "Finish the app", done: false }
  ]);

  // Adds a task.
  const handleAddTask = (newTask) => {
    const updatedTasks = [
      ...tasks,
      newTask
    ];
    setTasks(updatedTasks);
  }

  // Toggles a task status.
  const handleStatusChange = (id) => {
    const updatedTasks = [...tasks];
    updatedTasks.forEach((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
    });
    setTasks(updatedTasks);
  }

  // Removes a task from the list.
  const handleTaskRemove = (id) => {
    const filteredTasks = tasks.filter(
      (task) => task.id !== id
    );
    setTasks(filteredTasks);
  }

  // Removes all tasks form the list.
  const handleClearTasks = () => {
    setTasks([]);
  }

  return (
    <>
      <Header />
      <main className="page">
        <Spinner show={false} />
        <ErrorMessage error='' />

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
