import { Text, View, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import spaces from "../../assets/icons/spaces.png";
import analytics from "../../assets/icons/analytics.png";
import focus from "../../assets/icons/focus.png";
import leaderboard from "../../assets/icons/leaderboard.png";
import profile from "../../assets/icons/profile.png";
import HamburgerButton from "../../components/HamburgerButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View
      className={`${
        focused && "border-t-2 border-yellow"
      } flex-1 items-center justify-center space-y-1`}
    >
      <View className={`${focused ? "bg-yellow" : "bg-white"} rounded-sm p-1`}>
        {icon}
      </View>
      <Text className={`${focused} text-[10px]`}>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  const handleMenuPress = () => {};
  return (
    <>
      <LinearGradient
        colors={["#C2D9FF", "#DFEBFF"]}
        locations={[0.95, 1]}
        style={{ flex: 1 }}
      >
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
            headerStyle: {
              backgroundColor: "#C2D9FF",
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
                  icon={
                    <MaterialCommunityIcons
                      name="account-group"
                      size={24}
                      color="black"
                    />
                  }
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
                  icon={
                    <MaterialCommunityIcons
                      name="google-analytics"
                      size={24}
                      color="black"
                    />
                  }
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
              headerShown: true,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={
                    <MaterialCommunityIcons
                      name="av-timer"
                      size={24}
                      color="black"
                    />
                  }
                  color={color}
                  name={"Focus"}
                  focused={focused}
                />
              ),
              headerRight: () => (
                <HamburgerButton onPress={handleMenuPress} /> // Menu
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
                  icon={
                    <MaterialIcons name="leaderboard" size={24} color="black" />
                  }
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
              headerShown: true,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={
                    <FontAwesome5 name="user-alt" size={24} color="black" />
                  }
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
