import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Login",
            headerBackVisible: true,
            headerTitleStyle: {
              fontFamily: "ProximaNovaBold",
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Register",
            headerBackVisible: true,
            headerTitleStyle: {
              fontFamily: "ProximaNovaBold",
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="verify"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
