import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";
import { generateLocaleISODate } from "../utils/dateHelper";

const ScheduleContext = createContext();

export const useSchedule = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState(null);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("schedules")
          .select()
          .eq("user_id", user.id)
          .eq("date", generateLocaleISODate(new Date()));

        if (error) {
          console.error("Error fetching schedule data:", error);
        } else {
          setSchedule(data[0]);
        }
      }
    };

    fetchSchedule();
  }, [user]);

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
        schedule,
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
