import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

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
            headerLeft: () => (
              <CustomButton 
                title={""}
                handlePress={() => {router.push("/profile");}} 
                icon={<AntDesign name="arrowleft" size={25} color="black" />}
                containerStyles="mt-3 h-[30px] w-[40px] rounded-md bg-[#C2D9FF]"
              />
            ),
          }}
        />
        <Stack.Screen
          name="badges"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Badges",
            headerLeft: () => (
              <CustomButton 
                title={""}
                handlePress={() => {router.push("/profile");}} 
                icon={<AntDesign name="arrowleft" size={25} color="black" />}
                containerStyles="mt-3 h-[30px] w-[40px] rounded-md bg-[#C2D9FF]"
              />
            ),
          }}
        />
        <Stack.Screen
          name="changepassword"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Change Password",
            headerLeft: () => (
              <CustomButton 
                title={""}
                handlePress={() => {router.push("/edit");}} 
                icon={<AntDesign name="arrowleft" size={25} color="black" />}
                containerStyles="mt-3 h-[30px] w-[40px] rounded-md bg-[#C2D9FF]"
              />
            ),
          }}
        />
      </Stack>
    </>
  );
};

export default ProfileLayout;
