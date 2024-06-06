import React, { useEffect } from "react";
import { BackHandler, Alert } from "react-native";
import { router, SplashScreen, Stack } from "expo-router";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { TaskProvider } from "../context/TaskContext";
import { ScheduleProvider } from "../context/ScheduleContext";
import { SpaceProvider } from "../context/SpaceContext";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { session, initialized } = useAuth();

  useEffect(() => {
    if (!initialized) return;

    if (session) {
      // Redirect authenticated users to the focus page
      router.replace("/(tabs)/focus");
    } else if (!session) {
      // Redirect unauthenticated users to the login page
      router.replace("/");
    }
  }, [session, initialized]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(profile)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(focus)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const RootLayout = () => {
  let [fontsLoaded, error] = useFonts({
    Raleway_700Bold,
    ProximaNovaReg: require("../assets/fonts/ProximaNovaRegular.otf"),
    ProximaNovaBold: require("../assets/fonts/ProximaNovaBold.otf"),
    ProximaNovaItalic: require("../assets/fonts/ProximaNovaRegularItalic.otf"),
    ProximaNovaMedium: require("../assets/fonts/ProximaNovaSemibold.otf"),
  });

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Exit App", "Do you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    if (error) {
      throw error;
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <AuthProvider>
      <ScheduleProvider>
        <SpaceProvider>
          <TaskProvider>
            <InitialLayout />
          </TaskProvider>
        </SpaceProvider>
      </ScheduleProvider>
    </AuthProvider>
  );
};

export default RootLayout;
