import { Text, View, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import spaces from "../../assets/icons/spaces.png";
import analytics from "../../assets/icons/analytics.png";
import focus from "../../assets/icons/focus.png";
import leaderboard from "../../assets/icons/leaderboard.png";
import profile from "../../assets/icons/profile.png";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center space-y-1 border-[#FACC2D]">
      <View
        className={`${focused ? "bg-[#FACC2D]" : "bg-white"} rounded-sm p-1`}
      >
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className={`w-[26px] h-[26px]`}
        />
      </View>
      <Text className={`${focused} text-[10px]`}>{name}</Text>
    </View>
  );
};
const TabsLayout = () => {
  return (
    <>
      <LinearGradient colors={["#C2D9FF", "#DFEBFF"]} style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "#000",
            tabBarStyle: {
              backgroundColor: "transparent",
              elevation: 0,
              height: 73,
            },
          }}
        >
          <Tabs.Screen
            name="spaces"
            options={{
              title: "Spaces",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={spaces}
                  color={color}
                  name={"Spaces"}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="analytics"
            options={{
              title: "Analytics",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={analytics}
                  color={color}
                  name={"Analytics"}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="focus"
            options={{
              title: "Focus",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={focus}
                  color={color}
                  name={"Focus"}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="leaderboard"
            options={{
              title: "Leaderboard",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={leaderboard}
                  color={color}
                  name={"Leaderboard"}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={profile}
                  color={color}
                  name={"Profile"}
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      </LinearGradient>
    </>
  );
};

export default TabsLayout;
