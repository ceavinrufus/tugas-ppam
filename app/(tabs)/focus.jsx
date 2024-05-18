import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import TabButtons from "../../components/TabButtons";
import CustomButton from "../../components/CustomButton";

const Focus = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const buttons = [
    { title: "Pomodoro" },
    { title: "Short Break" },
    { title: "Long Break" },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="justify-center self-center h-full px-4 w-[95%]">
          <LinearGradient
            className="rounded-lg border-[#FACC2D] border"
            colors={["#FDEAA9", "#FDEDB5", "#FFFFFF"]}
            style={{ flex: 1, padding: 20 }}
          >
            <TabButtons
              buttons={buttons}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />

            <View className="flex-1 mt-7 items-center">
              {selectedTab === 0 ? (
                <Text className="text-6xl font-ProximaNovaBold">25:00</Text>
              ) : selectedTab === 1 ? (
                <Text className="text-6xl font-ProximaNovaBold">5:00</Text>
              ) : (
                <Text className="text-6xl font-ProximaNovaBold">20:00</Text>
              )}
              <Text className="font-ProximaNovaMedium border-yellow border w-full p-1 text-[10px] mt-5 rounded-md text-center ">
                No selected task
              </Text>
              <CustomButton
                title={"Start Session"}
                handlePress={null}
                containerStyles="mt-2 h-[30px] rounded-md"
                textStyles={"font-ProximaNovaBold text-xs"}
              />
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Focus;
