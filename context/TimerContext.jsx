import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const [currentTask, setCurrentTask] = useState(null);
  const [taskStartTime, setTaskStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroTimer, setPomodoroTimer] = useState(25 * 60); // 25 minutes in seconds
  const [notFocusTimer, setNotFocusTimer] = useState(0);
  const [shortBreakTimer, setShortBreakTimer] = useState(5 * 60); // 5 minutes in seconds
  const [longBreakTimer, setLongBreakTimer] = useState(15 * 60); // 20 minutes in seconds
  const [isPomodoroTimerRunning, setIsPomodoroTimerRunning] = useState(false);
  const [isShortBreakTimerRunning, setIsShortBreakTimerRunning] =
    useState(false);
  const [isLongBreakTimerRunning, setIsLongBreakTimerRunning] = useState(false);
  const pomodoroTimerRef = useRef(null);
  const shortBreakTimerRef = useRef(null);
  const longBreakTimerRef = useRef(null);
  const notFocusTimerRef = useRef(null);

  useEffect(() => {
    let intervalId;

    if (isPomodoroTimerRunning) {
      pomodoroTimerRef.current = setInterval(() => {
        setPomodoroTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(pomodoroTimerRef.current);
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
  ]);

  useEffect(() => {
    let intervalId;
    if (isRunning && currentTask && taskStartTime) {
      intervalId = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - taskStartTime) / 1000));
      }, 1000);
    } else if (!isRunning) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, currentTask, taskStartTime]);

  const startTask = async (task) => {
    setShortBreakTimer(5 * 60);
    setLongBreakTimer(15 * 60);
    setCurrentTask(task);
    const now = Date.now();
    setTaskStartTime(now);
    setIsRunning(true);
    setIsPomodoroTimerRunning(true); // Start central timer
    try {
      await AsyncStorage.setItem("currentTask", JSON.stringify(task));
      await AsyncStorage.setItem("taskStartTime", now.toString());
    } catch (e) {
      console.error(e);
    }
  };

  const pauseTask = async () => {
    setIsRunning(false);
    setIsPomodoroTimerRunning(false); // Pause central timer
    setIsShortBreakTimerRunning(false);
    setIsLongBreakTimerRunning(false);
    setTaskStartTime(null);
  };

  const startShortBreak = () => {
    setPomodoroTimer(25 * 60);
    setLongBreakTimer(15 * 60);
    setIsRunning(false);
    setIsShortBreakTimerRunning(true);
    setIsPomodoroTimerRunning(false);
    setIsLongBreakTimerRunning(false);
  };

  const pauseShortBreak = () => {
    setIsShortBreakTimerRunning(false);
  };

  const startLongBreak = () => {
    setPomodoroTimer(25 * 60);
    setShortBreakTimer(5 * 60);
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
        isPomodoroTimerRunning,
        setIsPomodoroTimerRunning,
        shortBreakTimer,
        setShortBreakTimer,
        isShortBreakTimerRunning,
        setIsShortBreakTimerRunning,
        longBreakTimer,
        setLongBreakTimer,
        isLongBreakTimerRunning,
        setIsLongBreakTimerRunning,
        notFocusTimer,
        setNotFocusTimer,
        startShortBreak,
        pauseShortBreak,
        startLongBreak,
        pauseLongBreak,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
