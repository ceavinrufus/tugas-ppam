import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [currentTask, setCurrentTask] = useState(null);
  const [taskStartTime, setTaskStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroTimer, setPomodoroTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isPomodoroTimerRunning, setIsPomodoroTimerRunning] = useState(false);
  const pomodoroTimerRef = useRef(null);

  //   useEffect(() => {
  //     const loadTaskState = async () => {
  //       try {
  //         const storedTask = await AsyncStorage.getItem("currentTask");
  //         const storedStartTime = await AsyncStorage.getItem("taskStartTime");
  //         if (storedTask && storedStartTime) {
  //           setCurrentTask(JSON.parse(storedTask));
  //           setTaskStartTime(parseInt(storedStartTime, 10));
  //         }
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     };

  //     loadTaskState();

  //     const appStateListener = AppState.addEventListener(
  //       "change",
  //       async (nextAppState) => {
  //         if (nextAppState === "background") {
  //           try {
  //             await AsyncStorage.setItem(
  //               "currentTask",
  //               JSON.stringify(currentTask)
  //             );
  //             await AsyncStorage.setItem(
  //               "taskStartTime",
  //               taskStartTime.toString()
  //             );
  //           } catch (e) {
  //             console.error(e);
  //           }
  //         } else if (nextAppState === "active") {
  //           const now = Date.now();
  //           setElapsedTime(
  //             (prev) => prev + Math.floor((now - taskStartTime) / 1000)
  //           );
  //           setTaskStartTime(now);
  //         }
  //       }
  //     );

  //     return () => {
  //       appStateListener.remove();
  //     };
  //   }, [currentTask, taskStartTime]);

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

  useEffect(() => {
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
    } else {
      if (pomodoroTimerRef.current) {
        clearInterval(pomodoroTimerRef.current);
      }
    }
    return () => clearInterval(pomodoroTimerRef.current);
  }, [isPomodoroTimerRunning]);

  const startTask = async (task) => {
    setCurrentTask(task);
    const now = Date.now();
    setTaskStartTime(now);
    // setElapsedTime(0);
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
    // setCurrentTask(null);
    setTaskStartTime(null);
    // setElapsedTime(0);
    // try {
    //   await AsyncStorage.removeItem("currentTask");
    //   await AsyncStorage.removeItem("taskStartTime");
    // } catch (e) {
    //   console.error(e);
    // }
  };

  return (
    <TaskContext.Provider
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
