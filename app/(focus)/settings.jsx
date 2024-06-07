import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, View, Text, Switch, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TimerInput from "../../components/Focus/TimerInput";

const Settings = () => {
  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <ScrollView>
        <View className={"self-center px-4 w-[95%] h-full"}>
          <Text className="text-2xl font-RalewayBold color-[#190482] mb-1">
            Timer Settings
          </Text>
          <LinearGradient
            className="rounded-lg flex-col justify-center mt-2"
            colors={["#C2D9FF", "#DFEBFF", "#FFFFFF"]}
            locations={[0, 1, 1]}
            style={{ paddingHorizontal: 20, paddingVertical: 16 }}
          >
            <Text className="font-ProximaNovaBold mb-3">Time (minutes)</Text>
            <View className={"flex-row justify-between"}>
              <View className={"items-center"}>
                <Text
                  className={
                    "font-ProximaNovaMedium text-[10px] text-gray-800 mb-1"
                  }
                >
                  Pomodoro
                </Text>
                <TimerInput initialValue={"25"} />
              </View>
              <View className={"items-center"}>
                <Text
                  className={
                    "font-ProximaNovaMedium text-[10px] text-gray-800 mb-1"
                  }
                >
                  Short Break
                </Text>
                <TimerInput initialValue={"5"} />
              </View>
              <View className={"items-center"}>
                <Text
                  className={
                    "text-[10px] font-ProximaNovaMedium  text-gray-800 mb-1"
                  }
                >
                  Long Break
                </Text>
                <TimerInput initialValue={"15"} />
              </View>
            </View>
          </LinearGradient>
          {/* <View className={"flex-row justify-between items-center mb-4"}> */}
          <View
            style={{
              shadowColor: "#C2D9FF",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 10,
            }}
            className={
              "mt-2 h-[60px] flex-row items-center rounded-xl border border-secondary bg-[#FFFFFF] justify-between px-5"
            }
          >
            <Text className={"text-sm text-gray-800"}>Auto Start Breaks</Text>
            <Switch />
          </View>
          <View
            style={{
              shadowColor: "#C2D9FF",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 10,
            }}
            className={
              "mt-2 h-[60px] flex-row items-center rounded-xl border border-secondary bg-[#FFFFFF] justify-between px-5"
            }
          >
            <Text className={"text-sm text-gray-800"}>
              Auto Start Pomodoros
            </Text>
            <Switch />
          </View>
          <View
            style={{
              shadowColor: "#C2D9FF",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 10,
            }}
            className={
              "mt-2 h-[60px] flex-row items-center rounded-xl border border-secondary bg-[#FFFFFF] justify-between px-5"
            }
          >
            <Text className={"text-sm text-gray-800 mb-1"}>
              Long Break Interval
            </Text>
            <TimerInput
              otherContainerStyles={"bg-[#C2D9FF]"}
              initialValue={"2"}
            />
          </View>

          <Text className="text-2xl font-RalewayBold color-[#190482] mt-5 mb-1">
            Task Settings
          </Text>
          <View
            className={
              "mt-2 h-[60px] flex-row items-center rounded-xl border border-secondary bg-[#FFFFFF] justify-between px-5"
            }
          >
            <Text className={"text-sm text-gray-800"}>Auto Check Tasks</Text>
            <Switch />
          </View>
          <View
            className={
              "mt-2 h-[60px] flex-row items-center rounded-xl border border-secondary bg-[#FFFFFF] justify-between px-5"
            }
          >
            <Text className={"text-sm text-gray-800"}>Auto Switch Tasks</Text>
            <Switch />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
