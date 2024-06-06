import React from "react";
import { Stack } from "expo-router";

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
            headerBackVisible: true,
            headerTitleStyle: {
              fontFamily: "ProximaNovaBold",
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="badges"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Badges",
            headerBackVisible: true,
            headerTitleStyle: {
              fontFamily: "ProximaNovaBold",
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="changepassword"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Change Password",
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

export default ProfileLayout;
