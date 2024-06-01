import { ScrollView, Text, View, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import TabButtons from "../../components/TabButtons";
import CustomButton from "../../components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
import TasksContainer from "../../components/Focus/TasksContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Focus = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const buttons = [
    { title: "Pomodoro" },
    { title: "Short Break" },
    { title: "Long Break" },
  ];

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
    if (index === 0) setTimer(25 * 60); // 25 minutes
    if (index === 1) setTimer(5 * 60); // 5 minutes
    if (index === 2) setTimer(20 * 60); // 20 minutes
    setIsRunning(false); // Stop the timer when changing tabs
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
    <SafeAreaView>
      <GestureHandlerRootView className="justify-center self-center h-full w-full">
        <View className="self-center px-4 w-[95%] h-full">
          <LinearGradient
            className="rounded-lg border-[#FACC2D] border"
            colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
            locations={[0, 0, 0, 1]}
            style={{ padding: 20 }}
          >
            <TabButtons buttons={buttons} setSelectedTab={handleTabChange} />

            <View className="mt-7 items-center">
              <Text className="text-6xl font-ProximaNovaBold">
                {formatTime(timer)}
              </Text>
              <LinearGradient
                className="mt-5 rounded-md border-yellow border w-full"
                colors={["#FCE07F", "#FACC2D", "#FFF"]}
                locations={[0.5, 1, 1]}
              >
                <Text className="font-ProximaNovaMedium bg-gradient-to-b from-[#FCE07F] to-yellow p-1 text-[10px] text-center">
                  No selected task
                </Text>
              </LinearGradient>
              <CustomButton
                title={"Start Session"}
                handlePress={startTimer}
                containerStyles="mt-2 h-[30px] rounded-md"
                textStyles={"font-ProximaNovaBold text-xs"}
              />
            </View>
          </LinearGradient>
          <View className="flex-1 mt-2">
            <View className="flex-row gap-2 mt-2">
              <View className="flex-1 items-center justify-center rounded-md h-[45px] bg-secondary">
                <Text className="font-ProximaNovaMedium">{formattedDate}</Text>
              </View>
              <Pressable className="w-1/6 h-[45px] justify-center items-center bg-secondary rounded-md">
                <FontAwesome name="sort-amount-asc" size={20} color="black" />
              </Pressable>
            </View>
            <View className="border-t border-primary my-3"></View>
            <TasksContainer />
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Focus;
