import { Alert, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import ProfileCard from "../../components/Profile/ProfileCard";
import Menu from "../../components/Profile/Menu";

const Profile = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="self-center px-4 w-[95%] h-full">
          <ProfileCard />
          <Text className="text-2xl font-RalewayBold color-[#190482] mb-1">
            Account Settings
          </Text>
          <Menu />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
