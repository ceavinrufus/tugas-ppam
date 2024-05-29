import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ProfileLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="edit"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Edit Profile",
          }}
        />
        <Stack.Screen
          name="badges"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Badges",
          }}
        />
      </Stack>
    </>
  );
};

export default ProfileLayout;
