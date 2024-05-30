import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

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
            headerBackVisible: true,
            headerTitleStyle: {
              fontFamily: "ProximaNovaBold",
              fontSize: 24,
            },
            // headerLeft: () => (
            //   <CustomButton
            //     title={"Edit Profile"}
            //     handlePress={() => {
            //       router.push("/profile");
            //     }}
            //     leftIcon={
            //       <AntDesign name="arrowleft" size={25} color="black" />
            //     }
            //     containerStyles="justify-start bg-transparent flex-row"
            //     textStyles={"text-black text-2xl ml-3"}
            //   />
            // ),
          }}
        />
        <Stack.Screen
          name="badges"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#C2D9FF" },
            headerTitle: "Badges",
            headerBackVisible: true,
            headerTitleStyle: {
              fontFamily: "ProximaNovaBold",
              fontSize: 24,
            },
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
                handlePress={() => {
                  router.push("/edit");
                }}
                leftIcon={
                  <AntDesign name="arrowleft" size={25} color="black" />
                }
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
