import React from "react";
import { Stack } from "expo-router";

const LeaderboardLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="leaderboard"
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Spaces Leaderboard",
            headerBackVisible: true,
            headerTitleStyle: {
              fontFamily: "ProximaNovaBold",
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="spacerank"
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Spaces Leaderboard",
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

export default LeaderboardLayout;
