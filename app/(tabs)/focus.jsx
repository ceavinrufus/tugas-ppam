import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import TabButtons from "../../components/TabButtons";
import CustomButton from "../../components/CustomButton";
import TasksContainer from "../../components/Focus/TasksContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTask } from "../../context/TaskContext"; // Import the useTask hook
import { supabase } from "../../lib/supabase";
import { useSchedule } from "../../context/ScheduleContext";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

const Focus = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { tasks, setTasks } = useSchedule();
  const [modalVisible, setModalVisible] = useState(false);
  const [shortBreak, setShortBreak] = useState(5 * 60);
  const [longBreak, setLongBreak] = useState(20 * 60);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        ({ data, error } = await supabase
          .from("tasks")
          .select()
          .eq("user_id", user.id)
          .eq("date", "2024-06-07"));

        if (error) {
          console.error("Error fetching tasks:", error);
        } else {
          setTasks(data);
        }
      }
    };

    fetchTasks();
  }, []);

  const {
    pomodoroTimer,
    isPomodoroTimerRunning,
    startTask,
    pauseTask,
    currentTask,
  } = useTask(); // Use the useTask hook

  const buttons = [
    { title: "Pomodoro" },
    { title: "Short Break" },
    { title: "Long Break" },
  ];

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  function getDayName(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  }

  const targetDate = new Date();
  const formattedDate = `${getDayName(
    targetDate
  )}, ${targetDate.getDate()} ${targetDate.toLocaleString("default", {
    month: "long",
  })} ${targetDate.getFullYear()}`;

  return (
    <SafeAreaView className="bg-white">
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
              setSelectedTab={(index) => setSelectedTab(index)}
            />

            <View className="mt-7 items-center">
              {/* Pomodoro Timer */}
              <Text className="text-6xl font-ProximaNovaBold">
                {selectedTab === 0
                  ? formatTime(pomodoroTimer)
                  : selectedTab === 1
                  ? formatTime(shortBreak)
                  : formatTime(longBreak)}
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
              {/* Start button */}
              {/* Todo: Click start auto start first task */}
              <CustomButton
                title={isPomodoroTimerRunning ? "Pause" : "Start"}
                handlePress={() => {
                  isPomodoroTimerRunning
                    ? pauseTask()
                    : currentTask
                    ? startTask(currentTask)
                    : startTask(tasks[0]);
                }}
                containerStyles="mt-2 h-[30px] w-full rounded-md"
                textStyles={"font-ProximaNovaBold text-xs"}
              />
            </View>
          </LinearGradient>

          {/* Tanggal */}
          <View className="flex-1 mt-2">
            <View className="flex-row gap-2 mt-2">
              <View className="flex-1 items-center justify-center rounded-md h-[45px] bg-secondary">
                <Text className="font-ProximaNovaMedium">{formattedDate}</Text>
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
