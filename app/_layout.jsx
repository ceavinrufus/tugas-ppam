import React, { useEffect } from "react";
import { router, SplashScreen, Stack } from "expo-router";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { TimerProvider } from "../context/TimerContext";
import { ScheduleProvider } from "../context/ScheduleContext";
import { SpaceProvider } from "../context/SpaceContext";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { MusicProvider } from "../context/MusicContext";
import MusicControl from "../components/Focus/MusicControl";

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
      <Stack.Screen
        name="+not-found"
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
      <MusicProvider>
        <ScheduleProvider>
          <SpaceProvider>
            <TimerProvider>
              <InitialLayout />
              <MusicControl />
            </TimerProvider>
          </SpaceProvider>
        </ScheduleProvider>
      </MusicProvider>
    </AuthProvider>
  );
};

export default RootLayout;
