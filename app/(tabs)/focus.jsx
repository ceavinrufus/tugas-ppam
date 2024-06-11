import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import TabButtons from "../../components/TabButtons";
import CustomButton from "../../components/CustomButton";
import TasksContainer from "../../components/Focus/TasksContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTimer } from "../../context/TimerContext";
import { supabase } from "../../lib/supabase";
import { useSchedule } from "../../context/ScheduleContext";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import {
  generateLocaleISODate,
  getDayFormattedDate,
  getPreviousDate,
  getNextDate,
} from "../../utils/dateHelper";
import { formatTime } from "../../utils/timeHelper";

const Focus = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { tasks, setTasks } = useSchedule();
  const [modalVisible, setModalVisible] = useState(false);
  const [targetDate, setTargetDate] = useState(
    generateLocaleISODate(new Date())
  );
  const { user } = useAuth();
  const [sessionRunning, setSessionRunning] = useState(false);
  const [showStopConfirmation, setShowStopConfirmation] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const countdownIntervalRef = useRef(null);
  const [triggerResetTimer, setTriggerResetTimer] = useState(false);
  const [tempTask, setTempTask] = useState(currentTask);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("tasks")
          .select()
          .eq("user_id", user.id)
          .eq("date", targetDate);

        if (error) {
          console.error("Error fetching tasks:", error);
        } else {
          setTasks(data);
        }
      }
    };

    fetchTasks();
  }, [targetDate, user]);

  const {
    pomodoroTimer,
    shortBreakTimer,
    longBreakTimer,
    notFocusTimer,
    isPomodoroTimerRunning,
    isShortBreakTimerRunning,
    isLongBreakTimerRunning,
    startTask,
    pauseTask,
    resetTimers,
    startShortBreak,
    setIsPomodoroTimerRunning,
    setIsShortBreakTimerRunning,
    setIsLongBreakTimerRunning,
    startLongBreak,
    currentTask,
    isAutoStartBreaks,
    isAutoStartPomodoros,
    defaultPomodoroTimer,
    defaultShortBreakTimer,
    defaultLongBreakTimer,
  } = useTimer();

  const buttons = [
    { title: "Pomodoro" },
    { title: "Short Break" },
    { title: "Long Break" },
  ];

  // Format Day, Date Month Year
  const formattedDate = getDayFormattedDate(new Date(targetDate));

  const handleStartSession = () => {
    if (selectedTab === 0 && !isPomodoroTimerRunning) {
      startTask(currentTask || tasks[0]);
    } else if (selectedTab === 1 && !isShortBreakTimerRunning) {
      startShortBreak();
    } else if (selectedTab === 2 && !isLongBreakTimerRunning) {
      startLongBreak();
    }
  };

  const handleStopSession = () => {
    setShowStopConfirmation(true);
    setIsPomodoroTimerRunning(false);
    setIsShortBreakTimerRunning(false);
    setIsLongBreakTimerRunning(false);
    setTempTask(currentTask);
    pauseTask();
    setCountdown(10);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownIntervalRef.current);
          updateSessionData();
          setTriggerResetTimer(!triggerResetTimer);
          setShowStopConfirmation(false);
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const cancelStopSession = () => {
    clearInterval(countdownIntervalRef.current);
    startTask(tempTask);
    setShowStopConfirmation(false);
    setCountdown(10);
  };

  const updateSessionData = async () => {
    try {
      // Update elapsed time for each task
      for (const task of tasks) {
        await supabase
          .from("tasks")
          .update({ elapsedTime: task.elapsedTime })
          .eq("id", task.id);
      }

      // Update schedule data
      await supabase.rpc("increment_schedule", {
        uid: user.id,
        d: targetDate,
        add_focus: defaultPomodoroTimer - pomodoroTimer,
        add_break:
          defaultShortBreakTimer +
          defaultLongBreakTimer -
          shortBreakTimer -
          longBreakTimer,
        add_not_focus: notFocusTimer,
        add_sessions: calculateSessions(),
      });
    } catch (error) {
      console.error("Error updating session data:", error);
    }
  };

  const calculateSessions = () => {
    // Calculate the number of sessions completed based on tasks and pomodoroTimer
    let completedSessions = 0;
    for (const task of tasks) {
      completedSessions += Math.floor(task.elapsedTime / defaultPomodoroTimer);
    }
    return completedSessions;
  };

  const getCurrentTimer = () => {
    if (selectedTab === 0) {
      return pomodoroTimer;
    } else if (selectedTab === 1) {
      return shortBreakTimer;
    } else if (selectedTab === 2) {
      return longBreakTimer;
    }
    return notFocusTimer;
  };

  useEffect(() => {
    resetTimers();
  }, [triggerResetTimer]);

  useEffect(() => {
    setSessionRunning(
      (selectedTab === 0 && isPomodoroTimerRunning) ||
        (selectedTab === 1 && isShortBreakTimerRunning) ||
        (selectedTab === 2 && isLongBreakTimerRunning) ||
        currentTask
    );
  }, [
    isPomodoroTimerRunning,
    isShortBreakTimerRunning,
    isLongBreakTimerRunning,
    currentTask,
    selectedTab,
  ]);

  useEffect(() => {
    if (
      isAutoStartBreaks &&
      shortBreakTimer === 5 &&
      isShortBreakTimerRunning
    ) {
      setSelectedTab(1);
    }
    if (isAutoStartPomodoros && pomodoroTimer === 5 && isPomodoroTimerRunning) {
      setSelectedTab(0);
    }
  }, [
    isShortBreakTimerRunning,
    isPomodoroTimerRunning,
    shortBreakTimer,
    pomodoroTimer,
    isAutoStartBreaks,
    isAutoStartPomodoros,
  ]);

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <GestureHandlerRootView className="justify-center self-center h-full w-full">
        <View className="self-center px-4 w-[95%] h-full">
          <LinearGradient
            className="rounded-lg border-[#FACC2D] border"
            colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
            locations={[0, 0, 0, 1]}
            style={{ padding: 20 }}
          >
            <TabButtons
              buttons={buttons}
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab} // Pass selectedTab to TabButtons
            />

            <View className="mt-7 items-center">
              {/* Display the appropriate timer */}
              <Text className="text-2xl font-ProximaNovaBold">
                {formatTime(notFocusTimer)}
              </Text>
              <Text className="text-6xl font-ProximaNovaBold">
                {formatTime(getCurrentTimer())}
              </Text>
              {/* Task selected */}
              <LinearGradient
                className="mt-5 rounded-md border-yellow border w-full"
                colors={["#FCE07F", "#FACC2D", "#FFF"]}
                locations={[0.5, 1, 1]}
              >
                <Text className="font-ProximaNovaMedium bg-gradient-to-b from-[#FCE07F] to-yellow p-1 text-[10px] text-center">
                  {currentTask ? currentTask.name : "No selected task"}
                </Text>
              </LinearGradient>
              {/* Start/Pause button */}
              <CustomButton
                title={sessionRunning ? "Stop Session" : "Start Session"}
                handlePress={
                  sessionRunning ? handleStopSession : handleStartSession
                }
                containerStyles="mt-2 h-[30px] w-full rounded-md"
                textStyles={"font-ProximaNovaBold text-xs"}
              />
            </View>
          </LinearGradient>

          {/* Tanggal */}
          <View className="flex-1 mt-2">
            <View className="flex-row gap-2 mt-2">
              <View className="flex-1 flex-row items-center justify-between rounded-md h-[45px] bg-secondary px-3">
                <TouchableOpacity
                  onPress={() => setTargetDate(getPreviousDate(targetDate))}
                >
                  <Entypo name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
                <Text className="font-ProximaNovaMedium">{formattedDate}</Text>
                <TouchableOpacity
                  onPress={() => setTargetDate(getNextDate(targetDate))}
                >
                  <Entypo name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="w-1/6 h-[45px] justify-center bg-secondary items-center rounded-md"
              >
                {/* <FontAwesome name="sort-amount-asc" size={20} color="black" /> */}
                <Entypo name="add-to-list" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View className="mt-4 flex-1">
              {tasks && (
                <TasksContainer
                  tasks={tasks}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              )}
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
      {showStopConfirmation && (
        <View
          style={{ backgroundColor: "rgba(194, 217, 255, 0.5)" }}
          className="absolute top-0 left-0 right-0 bottom-0 bg-opacity-50 flex justify-center items-center"
        >
          <View className="bg-white p-4 rounded-lg">
            <Text className="text-lg font-RalewayBold">Stop Session?</Text>
            <Text className="mt-2 font-ProximaNovaReg">
              Session will be logged in {countdown} seconds.
            </Text>
            <View className="flex-row mt-4">
              <CustomButton
                title={"Cancel"}
                handlePress={cancelStopSession}
                containerStyles="bg-red-500 px-4 py-2 rounded-lg"
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Focus;
