import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const ScheduleContext = createContext();

export const useSchedule = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
  const [tasks, setTasks] = useState(null);

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  };

  const updateTask = async (taskId, updatedTask) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(newTasks);
  };

  const removeTask = async (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  return (
    <ScheduleContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        updateTask,
        removeTask,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
