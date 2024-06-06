import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const NotFoundScreen = () => {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView>
        <View className="justify-center self-center items-center h-screen px-4 w-[90%]">
          <View className="flex-row items-center">
            <Text className="font-RalewayBold text-primary text-6xl mb-1">
              4
            </Text>
            <Image
              style={{ width: 48, height: 48 }}
              source={require("../assets/img/logo.png")}
            ></Image>
            <Text className="font-RalewayBold text-primary text-6xl mb-1">
              4
            </Text>
          </View>
          <Text className="text-lg font-ProximaNovaReg">Page Not Found</Text>
          <CustomButton
            containerStyles={"w-1/2 mt-7"}
            title={"Go to Home"}
            handlePress={() => router.replace("/")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotFoundScreen;
