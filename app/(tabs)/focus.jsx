import { ScrollView, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import TabButtons from "../../components/TabButtons";
import CustomButton from "../../components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
import TasksContainer from "../../components/TasksContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Focus = () => {
  const [selectedTab1, setSelectedTab1] = useState(0);
  const [selectedTab2, setSelectedTab2] = useState(0);

  const buttons1 = [
    { title: "Pomodoro" },
    { title: "Short Break" },
    { title: "Long Break" },
  ];

  const buttons2 = [{ title: "Today" }, { title: "Calendar" }];

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
        <ScrollView>
          <View className="self-center px-4 w-[95%]">
            <LinearGradient
              className="rounded-lg border-[#FACC2D] border"
              colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
              locations={[0, 0, 0, 1]}
              style={{ flex: 1, padding: 20 }}
            >
              <TabButtons buttons={buttons1} setSelectedTab={setSelectedTab1} />

              <View className="flex-1 mt-7 items-center">
                {selectedTab1 === 0 ? (
                  <Text className="text-6xl font-ProximaNovaBold">25:00</Text>
                ) : selectedTab1 === 1 ? (
                  <Text className="text-6xl font-ProximaNovaBold">5:00</Text>
                ) : (
                  <Text className="text-6xl font-ProximaNovaBold">20:00</Text>
                )}
                <LinearGradient
                  className="mt-5 rounded-md border-yellow border w-full"
                  colors={["#FCE07F", "#FACC2D", "#FFF"]}
                  locations={[0.5, 1, 1]}
                >
                  <Text className="font-ProximaNovaMedium bg-gradient-to-b from-[#FCE07F] to-yellow  p-1 text-[10px]  text-center ">
                    No selected task
                  </Text>
                </LinearGradient>
                <CustomButton
                  title={"Start Session"}
                  handlePress={null}
                  containerStyles="mt-2 h-[30px] rounded-md"
                  textStyles={"font-ProximaNovaBold text-xs"}
                />
              </View>
            </LinearGradient>
            <View className="mt-2">
              {/* <TabButtons
              buttons={buttons2}
              setSelectedTab={setSelectedTab2}
              otherTextStyles={"text-sm"}
            /> */}
              {/* <CalendarComponent /> */}
              <View className="flex-row gap-2 mt-2 flex-1">
                <View className="flex-1 items-center justify-center rounded-md h-[45px] bg-secondary">
                  <Text className="font-ProximaNovaMedium">
                    {formattedDate}
                  </Text>
                </View>
                <Pressable className="w-1/6 h-[45px] justify-center items-center bg-secondary rounded-md">
                  <FontAwesome name="sort-amount-asc" size={20} color="black" />
                </Pressable>
              </View>
              <View className="border-t border-primary my-3"></View>
              <TasksContainer />
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Focus;
