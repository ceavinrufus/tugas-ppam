import { ScrollView, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import CustomBarChart from "../../components/Analytics/CustomBarChart";
import CustomPieChart from "../../components/Analytics/CustomPieChart";
import CustomButton from "../../components/CustomButton";
import {
  generateLocaleISODate,
  getStartOfWeek,
  getEndOfWeek,
} from "../../utils/dateHelper";
import { LinearGradient } from "expo-linear-gradient";

const Analytics = () => {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [barData, setBarData] = useState([]);
  const currentDate = new Date();
  const [lowRange, setLowRange] = useState(
    generateLocaleISODate(getStartOfWeek(currentDate))
  );
  const [highRange, setHighRange] = useState(
    generateLocaleISODate(getEndOfWeek(currentDate))
  );

  useEffect(() => {
    const fetchSchedule = async () => {
      const { data, error } = await supabase
        .from("schedules")
        .select()
        .eq("user_id", user.id)
        .gt("date", lowRange)
        .lt("date", highRange);

      if (error) {
        console.error("Error fetching schedule data:", error);
      } else {
        const sortedData = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setSchedule(sortedData);
        generateWeeklyData(sortedData);
      }
    };

    fetchSchedule();
  }, [lowRange, highRange]);

  const generateWeeklyData = (data) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklySessions = daysOfWeek.map((day) => ({
      value: 0,
      label: day,
    }));

    data.forEach((entry) => {
      const dayIndex = new Date(entry.date).getDay();
      weeklySessions[dayIndex].value += entry.sessions;
    });

    setBarData(weeklySessions);
  };

  const calculateStreak = (data) => {
    let maxStreak = 0;
    let currentStreak = 0;
    let lastDate = null;

    if (data.length === 0) return 0;

    data.forEach((entry, index) => {
      if (entry.sessions > 0) {
        const currDate = new Date(entry.date);
        if (lastDate) {
          const diffTime = currDate - lastDate;
          const diffDays = diffTime / (1000 * 60 * 60 * 24);

          if (diffDays === 1) {
            currentStreak += 1;
          } else {
            maxStreak = Math.max(maxStreak, currentStreak);
            currentStreak = 1;
          }
        } else {
          currentStreak = 1;
        }
        lastDate = currDate;
      } else {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 0;
        lastDate = null;
      }
    });
    maxStreak = Math.max(maxStreak, currentStreak);
    return maxStreak;
  };

  const totalSessions = schedule.reduce((acc, item) => acc + item.sessions, 0);
  const totalAccess = schedule.length;
  const totalStreak = calculateStreak(schedule);
  const totalFocus = schedule.reduce((acc, item) => acc + item.focus_time, 0);
  const totalNotFocus = schedule.reduce(
    (acc, item) => acc + item.not_focus_time,
    0
  );
  const totalBreak = schedule.reduce((acc, item) => acc + item.break_time, 0);

  const pieData = [
    { value: totalFocus, color: "#190482", text: "Focus", focused: true },
    { value: totalBreak, color: "#C2D9FF", text: "Productive Break" },
    { value: totalNotFocus, color: "#FACC2D", text: "Not Focus" },
  ];

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <ScrollView>
        <View className="justify-center self-center h-full px-4 w-[95%]">
          <Text className="text-2xl font-RalewayBold text-primary">
            Weekly Overview
          </Text>

          {/* Date Input Fields */}
          <View className="flex-row justify-between mt-4">
            <View className="flex-1 mr-2">
              <Text className="text-sm font-RalewayBold text-primary">
                Start Date
              </Text>
              <TextInput
                value={lowRange}
                readOnly
                onChangeText={setLowRange}
                placeholder="YYYY-MM-DD"
                className="border border-gray-300 p-2 rounded-md"
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-sm font-RalewayBold text-primary">
                End Date
              </Text>
              <TextInput
                value={highRange}
                readOnly
                onChangeText={setHighRange}
                placeholder="YYYY-MM-DD"
                className="border border-gray-300 p-2 rounded-md"
              />
            </View>
          </View>

          <LinearGradient
            className="mt-2 rounded-lg border-[#C2D9FF] border"
            colors={["#C2D9FF", "#DFEBFF", "#FFF"]}
            locations={[0, 1, 1]}
            style={{ flex: 1, padding: 15 }}
          >
            <View className="flex-row gap-2 flex-1 justify-center items-center">
              <View className="flex-1 rounded-lg border-[#FFF] border bg-white justify-center items-center">
                <Text className="mt-1 text-2xl font-ProximaNovaBold text-primary">
                  {totalSessions}
                </Text>
                <Text className="mb-1 text-xs font-ProximaNovaReg color-black">
                  focus sessions
                </Text>
              </View>
              <View className="flex-1 rounded-lg border-[#FFF] border bg-white justify-center items-center">
                <Text className="mt-1 text-2xl font-ProximaNovaBold text-primary">
                  {totalAccess}
                </Text>
                <Text className="mb-1 text-xs font-ProximaNovaReg color-black">
                  days accessed
                </Text>
              </View>
              <View className="flex-1 rounded-lg border-[#FFF] border bg-white justify-center items-center">
                <Text className="mt-1 text-2xl font-ProximaNovaBold text-primary">
                  {totalStreak}
                </Text>
                <Text className="mb-1 text-xs font-ProximaNovaReg color-black">
                  days streak
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Bar Chart */}
          <View className="flex-row mt-4 items-center justify-between">
            <Text className="text-2xl font-RalewayBold text-primary">
              Session Analytics
            </Text>
            <CustomButton
              title={"Details"}
              handlePress={() => {
                router.push("/analytics");
              }}
              containerStyles="h-[25px] w-[60px] rounded-md bg-yellow"
              textStyles={"font-font-ProximaNovaBold text-xs text-black"}
            />
          </View>
          <View className="mt-2 bg-white border-secondary items-center border-2 rounded-xl">
            <View className="py-3 mr-2 overflow-hidden w-[90%]">
              {barData && <CustomBarChart data={barData} />}
            </View>
          </View>

          {/* Pie Chart */}
          <View className="flex-row mt-4 items-center justify-between">
            <Text className="text-2xl font-RalewayBold text-primary">
              Focus Analytics
            </Text>
            <CustomButton
              title={"Details"}
              handlePress={() => {
                router.push("/analytics");
              }}
              containerStyles="h-[25px] w-[60px] rounded-md bg-yellow"
              textStyles={"font-ProximaNovaBold text-xs text-black"}
            />
          </View>
          <View className="mt-2 items-center justify-center border-secondary border-2 pb-4 rounded-xl">
            {totalFocus | totalBreak | totalNotFocus ? (
              <CustomPieChart data={pieData} />
            ) : (
              <Text className="pt-4 font-ProximaNovaItalic">
                You haven't done any sessions this week
              </Text>
            )}
          </View>
          <View className="mt-7"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;
