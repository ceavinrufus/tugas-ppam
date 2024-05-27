import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  let [fontsLoaded, error] = useFonts({
    Raleway_700Bold,
    ProximaNovaReg: require("../assets/fonts/Proxima Nova Regular.otf"),
    ProximaNovaBold: require("../assets/fonts/Proxima Nova Bold.otf"),
    ProximaNovaMedium: require("../assets/fonts/Proxima Nova Semibold.otf"),
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
    </Stack>
  );
};

export default RootLayout;