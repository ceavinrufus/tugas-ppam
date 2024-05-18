import { ScrollView, Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import onboarding from "../assets/onboarding.png";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center bg-white w-full h-full">
          <View className="items-center justify-center w-[75%] h-full">
            <Image
              source={onboarding}
              className="text-2xl font-Raleway mb-14 w-full"
              resizeMode="contain"
            />
            <Text className="text-2xl font-RalewayBold">
              Welcome to Virtuoso
            </Text>
            <Text className="text-sm text-center">
              Manage your day and boost your productivity with your pocket-sized
              virtual workspace!
            </Text>
            <View className="w-[95%]">
              <CustomButton
                title={"Log in"}
                handlePress={() => {
                  router.push("/sign-in");
                }}
                containerStyles="w-full mt-7"
                textStyles={"font-ProximaNovaBold"}
              />
              <CustomButton
                title={"Register"}
                handlePress={() => {
                  router.push("/sign-up");
                }}
                containerStyles="w-full mt-2 bg-white border border-primary"
                textStyles="text-primary font-ProximaNovaBold"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
