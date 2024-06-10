import React from "react";
import { Stack } from "expo-router";

const FocusLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="settings"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Settings",
            headerBackVisible: true,
            headerTitleStyle: {
              fontFamily: "ProximaNovaBold",
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="music"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Music",
            headerBackVisible: true,
            headerTitleStyle: {
              fontFamily: "ProximaNovaBold",
              fontSize: 24,
            },
          }}
        />
      </Stack>
    </>
  );
};

export default FocusLayout;
