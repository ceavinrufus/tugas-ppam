import {
  ScrollView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import TabButtons from "../../components/TabButtons";
import CustomButton from "../../components/CustomButton";
import { ModalContent, ModalTitle, SlideAnimation } from "react-native-modals";
import FormField from "../../components/FormField";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Badges = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="justify-center self-center h-full px-4 w-[95%]">
          <Text className="text-2xl font-RalewayBold color-[#190482] mt-1">
            Overview
          </Text>
          <LinearGradient
            className="mt-2 rounded-lg border-[#FACC2D] border"
            colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
            locations={[0, 0, 0, 1]}
            style={{ flex: 1, padding: 20 }}
          >
            <View className="flex-row gap-2 flex-1">
              <LinearGradient
                className="mt-2 rounded-lg border-[#FACC2D] border justify-center items-center"
                colors={["#FACC2D", "#FCE07F"]}
                locations={[0, 1]}
                style={{ flex: 1, padding: 10 }}
              >
                <Text className="text-2xl font-ProximaNovaBold color-[#190482]">
                  2521
                </Text>
                <Text className="text-1xl font-ProximaNovaMedium color-black">
                  total sessions
                </Text>
              </LinearGradient>
              <LinearGradient
                className="mt-2 rounded-lg border-[#FACC2D] border justify-center items-center"
                colors={["#FACC2D", "#FCE07F"]}
                locations={[0, 1]}
                style={{ flex: 1, padding: 10 }}
              >
                <Text className="text-2xl font-ProximaNovaBold color-[#190482]">
                  182
                </Text>
                <Text className="text-1xl font-ProximaNovaMedium color-black">
                  badges
                </Text>
              </LinearGradient>
            </View>
            <View className="flex-row gap-2 mt-1 flex-1">
              <LinearGradient
                className="mt-2 rounded-lg border-[#FACC2D] border justify-center items-center"
                colors={["#FACC2D", "#FCE07F"]}
                locations={[0, 1]}
                style={{ flex: 1, padding: 10 }}
              >
                <Text className="text-2xl font-ProximaNovaBold color-[#190482]">
                  9
                </Text>
                <Text className="text-1xl font-ProximaNovaMedium color-black">
                  days streak
                </Text>
              </LinearGradient>
              <LinearGradient
                className="mt-2 rounded-lg border-[#FACC2D] border justify-center items-center"
                colors={["#FACC2D", "#FCE07F"]}
                locations={[0, 1]}
                style={{ flex: 1, padding: 10 }}
              >
                <Text className="text-2xl font-ProximaNovaBold color-[#190482]">
                  2
                </Text>
                <Text className="text-1xl font-ProximaNovaMedium color-black">
                  daily rank
                </Text>
              </LinearGradient>
            </View>
          </LinearGradient>
          <Text className="mt-7 text-2xl font-RalewayBold color-[#190482]">
            Badges
          </Text>
          <LinearGradient
            className="mt-2 rounded-lg border-[#C2D9FF] border"
            colors={["#C2D9FF", "#DFEBFF", "#FFF"]}
            locations={[0, 1, 1]}
            style={{ flex: 1, padding: 15 }}
          >
            <View className="flex-row gap-3 flex-1">
              <LinearGradient
                className="rounded-lg border-[#FACC2D] border-2 justify-center items-center px-4"
                colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
                locations={[0, 0, 0, 1]}
                style={{ padding: 10 }}
              >
                <MaterialCommunityIcons
                  name="police-badge"
                  size={40}
                  color="black"
                />
                <Text className="text-black font-ProximaNovaBold mt-2">
                  Level 3
                </Text>
              </LinearGradient>
              <View className="justify-center items-start">
                <Text className="text-black font-ProximaNovaBold text-xl">
                  Pomodoro Hustler
                </Text>
                <Text className="text-black font-ProximaNova text-xs mt-1">
                  Complete 10 pomodoro sessions
                </Text>
                <Text className="text-[#190482] font-ProximaNovaBold text-xs mt-2">
                  STATUS: ONGOING (5/10)
                </Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            className="mt-2 rounded-lg border-[#C2D9FF] border"
            colors={["#C2D9FF", "#DFEBFF", "#FFF"]}
            locations={[0, 1, 1]}
            style={{ flex: 1, padding: 15 }}
          >
            <View className="flex-row gap-3 flex-1">
              <LinearGradient
                className="rounded-lg border-[#FACC2D] border-2 justify-center items-center px-4"
                colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
                locations={[0, 0, 0, 1]}
                style={{ padding: 10 }}
              >
                <MaterialCommunityIcons
                  name="police-badge"
                  size={40}
                  color="black"
                />
                <Text className="text-black font-ProximaNovaBold mt-2">
                  Level 3
                </Text>
              </LinearGradient>
              <View className="justify-center items-start">
                <Text className="text-black font-ProximaNovaBold text-xl">
                  Pomodoro Hustler
                </Text>
                <Text className="text-black font-ProximaNova text-xs mt-1">
                  Complete 10 pomodoro sessions
                </Text>
                <Text className="text-[#190482] font-ProximaNovaBold text-xs mt-2">
                  STATUS: ONGOING (5/10)
                </Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            className="mt-2 rounded-lg border-[#C2D9FF] border"
            colors={["#C2D9FF", "#DFEBFF", "#FFF"]}
            locations={[0, 1, 1]}
            style={{ flex: 1, padding: 15 }}
          >
            <View className="flex-row gap-3 flex-1">
              <LinearGradient
                className="rounded-lg border-[#FACC2D] border-2 justify-center items-center px-4"
                colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
                locations={[0, 0, 0, 1]}
                style={{ padding: 10 }}
              >
                <MaterialCommunityIcons
                  name="police-badge"
                  size={40}
                  color="black"
                />
                <Text className="text-black font-ProximaNovaBold mt-2">
                  Level 3
                </Text>
              </LinearGradient>
              <View className="justify-center items-start">
                <Text className="text-black font-ProximaNovaBold text-xl">
                  Pomodoro Hustler
                </Text>
                <Text className="text-black font-ProximaNova text-xs mt-1">
                  Complete 10 pomodoro sessions
                </Text>
                <Text className="text-[#190482] font-ProximaNovaBold text-xs mt-2">
                  STATUS: ONGOING (5/10)
                </Text>
              </View>
            </View>
          </LinearGradient>
          <View className="mt-4">
            <CustomButton
              title={"View All Badges"}
              handlePress={() => {
                router.push("/profile");
              }}
            />
          </View>
          <View className="mt-7"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Badges;
