import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSchedule } from "./ScheduleContext";

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const { tasks } = useSchedule();
  const [currentTask, setCurrentTask] = useState(null);
  const [taskStartTime, setTaskStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [defaultPomodoroTimer, setDefaultPomodoroTimer] = useState(25 * 60); // 25 minutes in seconds
  const [pomodoroTimer, setPomodoroTimer] = useState(defaultPomodoroTimer); // 25 minutes in seconds
  const [notFocusTimer, setNotFocusTimer] = useState(0);
  const [defaultShortBreakTimer, setDefaultShortBreakTimer] = useState(5 * 60); // 5 minutes in seconds
  const [shortBreakTimer, setShortBreakTimer] = useState(
    defaultShortBreakTimer
  ); // 5 minutes in seconds
  const [defaultLongBreakTimer, setDefaultLongBreakTimer] = useState(20 * 60); // 15 minutes in seconds
  const [longBreakTimer, setLongBreakTimer] = useState(defaultLongBreakTimer); // 15 minutes in seconds
  const [isPomodoroTimerRunning, setIsPomodoroTimerRunning] = useState(false);
  const [isShortBreakTimerRunning, setIsShortBreakTimerRunning] =
    useState(false);
  const [isLongBreakTimerRunning, setIsLongBreakTimerRunning] = useState(false);
  const [isAutoStartBreaks, setIsAutoStartBreaks] = useState(false);
  const [isAutoStartPomodoros, setIsAutoStartPomodoros] = useState(false);
  const [isAutoSwitchTasks, setIsAutoSwitchTasks] = useState(false);

  const pomodoroTimerRef = useRef(null);
  const shortBreakTimerRef = useRef(null);
  const longBreakTimerRef = useRef(null);
  const notFocusTimerRef = useRef(null);

  useEffect(() => {
    if (isPomodoroTimerRunning) {
      pomodoroTimerRef.current = setInterval(() => {
        setPomodoroTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(pomodoroTimerRef.current);
            if (isAutoStartBreaks) {
              startShortBreak();
            }
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (isShortBreakTimerRunning) {
      shortBreakTimerRef.current = setInterval(() => {
        setShortBreakTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(shortBreakTimerRef.current);
            if (isAutoStartPomodoros) {
              startTask(currentTask || tasks[0]);
            }
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (isLongBreakTimerRunning) {
      longBreakTimerRef.current = setInterval(() => {
        setLongBreakTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(longBreakTimerRef.current);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (currentTask) {
      notFocusTimerRef.current = setInterval(() => {
        setNotFocusTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(pomodoroTimerRef.current);
      clearInterval(shortBreakTimerRef.current);
      clearInterval(longBreakTimerRef.current);
      clearInterval(notFocusTimerRef.current);
    };
  }, [
    isPomodoroTimerRunning,
    isShortBreakTimerRunning,
    isLongBreakTimerRunning,
    currentTask,
    isAutoStartBreaks,
    isAutoStartPomodoros,
  ]);

  useEffect(() => {
    let intervalId;
    if (isRunning && currentTask && taskStartTime) {
      intervalId = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - taskStartTime) / 1000));
        if (
          isAutoSwitchTasks &&
          currentTask &&
          currentTask.estimated_pomodoro * defaultPomodoroTimer <= elapsedTime
        ) {
          // Switch to the next task if the current task is completed
          const currentIndex = tasks.findIndex(
            (task) => task.id === currentTask.id
          );
          const nextTask = tasks[currentIndex + 1];
          if (nextTask) {
            startTask(nextTask);
          } else {
            pauseTask();
          }
        }
      }, 1000);
    } else if (!isRunning) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, currentTask, taskStartTime, isAutoSwitchTasks, elapsedTime]);

  const startTask = async (task) => {
    setShortBreakTimer(defaultShortBreakTimer);
    setLongBreakTimer(defaultLongBreakTimer);
    setCurrentTask(task);
    const now = Date.now();
    setTaskStartTime(now);
    setIsRunning(true);
    setIsPomodoroTimerRunning(true); // Start central timer
    // try {
    //   await AsyncStorage.setItem("currentTask", JSON.stringify(task));
    //   await AsyncStorage.setItem("taskStartTime", now.toString());
    // } catch (e) {
    //   console.error(e);
    // }
  };

  useEffect(() => {
    setPomodoroTimer(defaultPomodoroTimer);
    setShortBreakTimer(defaultShortBreakTimer);
    setLongBreakTimer(defaultLongBreakTimer);
  }, [defaultPomodoroTimer, defaultShortBreakTimer, defaultLongBreakTimer]);

  const pauseTask = async () => {
    setIsRunning(false);
    setIsPomodoroTimerRunning(false); // Pause central timer
    setIsShortBreakTimerRunning(false);
    setIsLongBreakTimerRunning(false);
    setTaskStartTime(null);
  };

  const startShortBreak = () => {
    setPomodoroTimer(defaultPomodoroTimer);
    setLongBreakTimer(defaultLongBreakTimer);
    setIsRunning(false);
    setIsShortBreakTimerRunning(true);
    setIsPomodoroTimerRunning(false);
    setIsLongBreakTimerRunning(false);
  };

  const pauseShortBreak = () => {
    setIsShortBreakTimerRunning(false);
  };

  const startLongBreak = () => {
    setPomodoroTimer(defaultPomodoroTimer);
    setShortBreakTimer(defaultShortBreakTimer);
    setIsRunning(false);
    setIsLongBreakTimerRunning(true);
    setIsPomodoroTimerRunning(false);
    setIsShortBreakTimerRunning(false);
  };

  const pauseLongBreak = () => {
    setIsLongBreakTimerRunning(false);
  };

  return (
    <TimerContext.Provider
      value={{
        currentTask,
        startTask,
        pauseTask,
        elapsedTime,
        isRunning,
        pomodoroTimer,
        setPomodoroTimer,
        defaultPomodoroTimer,
        setDefaultPomodoroTimer,
        isPomodoroTimerRunning,
        setIsPomodoroTimerRunning,
        shortBreakTimer,
        setShortBreakTimer,
        defaultShortBreakTimer,
        setDefaultShortBreakTimer,
        isShortBreakTimerRunning,
        setIsShortBreakTimerRunning,
        longBreakTimer,
        setLongBreakTimer,
        defaultLongBreakTimer,
        setDefaultLongBreakTimer,
        isLongBreakTimerRunning,
        setIsLongBreakTimerRunning,
        notFocusTimer,
        setNotFocusTimer,
        startShortBreak,
        pauseShortBreak,
        startLongBreak,
        pauseLongBreak,
        isAutoStartBreaks,
        setIsAutoStartBreaks,
        isAutoStartPomodoros,
        setIsAutoStartPomodoros,
        isAutoSwitchTasks,
        setIsAutoSwitchTasks,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
