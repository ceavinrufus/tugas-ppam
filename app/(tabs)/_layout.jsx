import { Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Tabs, Redirect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
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
  let [fontsLoaded, error] = useFonts({
    Raleway_700Bold,
    ProximaNovaReg: require("../../assets/fonts/ProximaNovaRegular.otf"),
    ProximaNovaBold: require("../../assets/fonts/ProximaNovaBold.otf"),
    ProximaNovaMedium: require("../../assets/fonts/ProximaNovaSemibold.otf"),
  });

  useEffect(() => {
    if (error) {
      throw error;
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  const handleMenuPress = () => {};

  if (!fontsLoaded && !error) return null;
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
            headerLeftContainerStyle: {
              paddingLeft: 6,
            },
            headerRightContainerStyle: {
              paddingRight: 6,
            },
          }}
        >
          <Tabs.Screen
            name="spaces"
            options={{
              title: "Spaces",
              headerShown: true,
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
              headerRight: () => (
                <View className="py-[10px] mr-4 bg-gray-100 rounded-md">
                  <HamburgerButton onPress={handleMenuPress} />
                </View>
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
                <View className="py-[10px] mr-4 bg-gray-100 rounded-md">
                  <HamburgerButton onPress={handleMenuPress} />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="leaderboard"
            options={{
              title: "Leaderboard",
              headerShown: true,
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
              headerRight: () => (
                <View className="py-[10px] mr-4 bg-gray-100 rounded-md">
                  <HamburgerButton onPress={handleMenuPress} />
                </View>
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
