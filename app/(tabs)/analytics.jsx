import {
  ScrollView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert
} from "react-native";
import React, { useState } from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import TabButtons from "../../components/TabButtons";
import CustomButton from "../../components/CustomButton";
import { ModalContent, ModalTitle, SlideAnimation } from "react-native-modals";
import FormField from "../../components/FormField";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";


const Analytics = () => {
  const analyticsOverview = [
    {
      id: 1,
      sessions: 25,
      accessed: 12,
      streak: 9
    }
  ];

  const weeklyData = [
    {value: 3, label: 'Mon', frontColor: '#C2D9FF'},
    {value: 4, label: 'Tue', frontColor: '#C2D9FF'},
    {value: 2, label: 'Wed', frontColor: '#C2D9FF'},
    {value: 1, label: 'Thu', frontColor: '#C2D9FF'},
    {value: 5, label: 'Fri', frontColor: '#C2D9FF'},
    {value: 2, label: 'Sat', frontColor: '#C2D9FF'},
    {value: 4, label: 'Sun', frontColor: '#C2D9FF'},
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View View className="justify-center self-center h-full px-4 w-[95%]">
          <Text className="text-2xl font-RalewayBold color-[#190482] mt-1">Overview</Text>
          <LinearGradient
            className="mt-2 rounded-lg border-[#C2D9FF] border"
            colors={["#C2D9FF", "#DFEBFF", "#FFF"]}
            locations={[0, 1, 1]}
            style={{ flex: 1, padding: 15 }}
          >
            {analyticsOverview.map((analyticsOverview) => (
              <View key ={analyticsOverview.id} className="flex-row gap-2 flex-1 justify-center items-center">
                <View className="flex-1 rounded-lg border-[#FFF] border bg-white justify-center items-center">
                  <Text className="mt-1 text-2xl font-ProximaNovaBold color-[#190482]">{analyticsOverview.sessions}</Text>
                  <Text className="mb-1 text-xs font-ProximaNova color-black">focus sessions</Text>
                </View>
                <View className="flex-1 rounded-lg border-[#FFF] border bg-white justify-center items-center">
                  <Text className="mt-1 text-2xl font-ProximaNovaBold color-[#190482]">{analyticsOverview.accessed}</Text>
                  <Text className="mb-1 text-xs font-ProximaNova color-black">days accessed</Text>
                </View>
                <View className="flex-1 rounded-lg border-[#FFF] border bg-white justify-center items-center">
                  <Text className="mt-1 text-2xl font-ProximaNovaBold color-[#190482]">{analyticsOverview.streak}</Text>
                  <Text className="mb-1 text-xs font-ProximaNova color-black">days streak</Text>
                </View>
              </View>
            ))}
          </LinearGradient>
          <View className="flex-row mt-4">
            <Text className="text-2xl font-RalewayBold color-[#190482] mt-1">Weekly Analytics</Text>
            <View className="justify-normal flex-1 items-end">
              <CustomButton
                title={"Details"}
                handlePress={() => {router.push("/analytics");}}
                containerStyles="mt-1 h-[25px] w-[60px] rounded-md bg-[#FACC2D]"
                textStyles={"font-ProximaNova text-xs color-[#222222]"}
              />
            </View>
          </View>
          <View className="mt-2 flex-row items-center justify-center bg-white border-secondary border-2 px-1 py-2.5 rounded-xl">
            <BarChart
              showFractionalValues
              showYAxisIndices
              noOfSections={5}
              maxValue={5}
              data={weeklyData}
              isAnimated
              height={120}
              barWidth={15}
            />
          </View>
          <View className="flex-row mt-4">
            <Text className="text-2xl font-RalewayBold color-[#190482] mt-1">Monthly Analytics</Text>
            <View className="justify-normal flex-1 items-end">
              <CustomButton
                title={"Details"}
                handlePress={() => {router.push("/analytics");}}
                containerStyles="mt-1 h-[25px] w-[60px] rounded-md bg-[#FACC2D]"
                textStyles={"font-ProximaNova text-xs color-[#222222]"}
              />
            </View>
          </View>
          <View className="mt-2 flex-row items-center justify-center bg-white border-secondary border-2 px-1 py-2.5 rounded-xl">
            <Text>a</Text>
          </View>
          <View className="mt-7"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;
