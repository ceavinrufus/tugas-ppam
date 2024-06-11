import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import TabButtons from "../../components/TabButtons";
import CustomButton from "../../components/CustomButton";
import TasksContainer from "../../components/Focus/TasksContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTimer } from "../../context/TimerContext"; // Import the useTimer hook
import { supabase } from "../../lib/supabase";
import { useSchedule } from "../../context/ScheduleContext";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import {
  generateLocaleISODate,
  getDayFormattedDate,
} from "../../utils/dateHelper";
import { getPreviousDate, getNextDate } from "../../utils/dateHelper";
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
  }, [targetDate]);

  const {
    pomodoroTimer,
    shortBreakTimer,
    longBreakTimer,
    notFocusTimer,
    isPomodoroTimerRunning,
    isShortBreakTimerRunning,
    isLongBreakTimerRunning,
    isNotFocusTimerRunning,
    startTask,
    pauseTask,
    startShortBreak,
    startLongBreak,
    startNotFocus,
    pauseShortBreak,
    pauseLongBreak,
    pauseNotFocus,
    currentTask,
    isAutoStartBreaks,
    isAutoStartPomodoros,
    isAutoSwitchTasks,
  } = useTimer(); // Use the useTimer hook

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
    // Give user confirmation to stop session
    // Countdown to 10 seconds
    // If the countdown finished, update the elapsed data for each task to task database in supabase
    // If the countdown finished, update all the column on schedules table in supabase
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
    setSessionRunning(
      (selectedTab == 0 && isPomodoroTimerRunning) ||
        (selectedTab == 1 && isShortBreakTimerRunning) ||
        (selectedTab == 2 && isLongBreakTimerRunning)
    );
  }, [
    isPomodoroTimerRunning,
    isShortBreakTimerRunning,
    isPomodoroTimerRunning,
  ]);

  useEffect(() => {
    if (isAutoStartBreaks && shortBreakTimer == 5 && isShortBreakTimerRunning) {
      setSelectedTab(1); // Switch to short break tab
    }
    if (isAutoStartPomodoros && pomodoroTimer == 5 && isPomodoroTimerRunning) {
      setSelectedTab(0); // Switch to pomodoro tab
    }
  }, [isShortBreakTimerRunning, isPomodoroTimerRunning]);

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
    </SafeAreaView>
  );
};

export default Focus;
