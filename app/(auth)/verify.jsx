import { Text, View, ScrollView, Image } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Verify = () => {
  const handleLogin = () => {
    router.navigate("/login"); // Ganti dengan rute yang sesuai untuk halaman login
  };

  return (
    <SafeAreaView className="bg-white">
      <ScrollView>
        <View className="justify-center self-center items-center h-screen px-4 w-[90%]">
          <Image
            source={{
              uri: "https://media.giphy.com/media/tf9jjMcO77YzV4YPwE/giphy.gif",
            }}
            style={{ width: 200, height: 200 }}
          />
          <Text className="font-RalewayBold text-primary text-2xl">
            Email Verified!
          </Text>
          <Text className="text-sm font-ProximaNovaReg">
            Your email has been successfully verified.
          </Text>
          <CustomButton
            title={"Go to Login"}
            handlePress={handleLogin}
            containerStyles="mt-7 w-full"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verify;
