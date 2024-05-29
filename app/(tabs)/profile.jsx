import {
  ScrollView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import TabButtons from "../../components/TabButtons";
import CustomButton from "../../components/CustomButton";
import { ModalContent, ModalTitle, SlideAnimation } from "react-native-modals";
import { MaterialIcons } from "@expo/vector-icons";
import FormField from "../../components/FormField";

const Profile = () => {

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="justify-center self-center h-full px-4 w-[95%]">
          <LinearGradient
            className="rounded-lg border-[#FACC2D] border"
            colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
            locations={[0, 0, 0, 1]}
            style={{ flex: 1, padding: 20 }}
          >
            <Text className="text-1xl font-ProximaNovaBold color-[#190482] mt-1">Marcheline Fanni</Text>
            <Text className="text-1xl font-ProximaNova mt-1">A penultimate year student in Institut Teknologi Bandung who loves learning new things and wants to keep her life organized.</Text>
            <View className="flex-row gap-2 mt-1 flex-1">
              <View className="flex-1">
                <CustomButton
                  title={"Edit Profile"}
                  handlePress={() => {router.push("/edit");}}
                  containerStyles="mt-1 h-[30px] rounded-md bg-[#FACC2D]"
                  textStyles={"font-ProximaNova text-xs color-[#222222]"}
                />
              </View>
              <View className="flex-1">
                <CustomButton
                  title={"See Badges"}
                  handlePress={() => {router.push("/badges");}}
                  containerStyles="mt-1 h-[30px] rounded-md bg-[#FACC2D]"
                  textStyles={"font-ProximaNova text-xs color-[#222222]"}
                />
              </View>
            </View>
          </LinearGradient>
          <View className="mt-2">
            <Text className="text-2xl font-RalewayBold color-[#190482] mt-2">Account Settings</Text>
            <View className="mt-1">
              <CustomButton
                    title={"Subscription"}
                    handlePress={null}
                    containerStyles="mt-1 h-[45px] rounded-md bg-[#FFFFFF] border border-[#D9D9D9] flex items-start px-5"
                    textStyles={"font-ProximaNova text-2xs color-[#222222]"}
                  />
            </View>
            <View className="mt-1">
              <CustomButton
                    title={"Preferences"}
                    handlePress={null}
                    containerStyles="mt-1 h-[45px] rounded-md bg-[#FFFFFF] border border-[#D9D9D9] flex items-start px-5"
                    textStyles={"font-ProximaNova text-2xs color-[#222222]"}
                  />
            </View>
            <View className="mt-1">
              <CustomButton
                    title={"Notifications"}
                    handlePress={null}
                    containerStyles="mt-1 h-[45px] rounded-md bg-[#FFFFFF] border border-[#D9D9D9] flex items-start px-5"
                    textStyles={"font-ProximaNova text-2xs color-[#222222]"}
                  />
            </View>
            <View className="mt-1">
              <CustomButton
                    title={"Privacy Settings"}
                    handlePress={null}
                    containerStyles="mt-1 h-[45px] rounded-md bg-[#FFFFFF] border border-[#D9D9D9] flex items-start px-5"
                    textStyles={"font-ProximaNova text-2xs color-[#222222]"}
                  />
            </View>
            <View className="mt-1">
              <CustomButton
                    title={"Help Center"}
                    handlePress={null}
                    containerStyles="mt-1 h-[45px] rounded-md bg-[#FFFFFF] border border-[#D9D9D9] flex items-start px-5"
                    textStyles={"font-ProximaNova text-2xs color-[#222222]"}
                  />
            </View>
          </View>
          <View className="mt-2">
              <CustomButton
                    title={"Sign Out"}
                    handlePress={() => {router.push("/");}}
                    containerStyles="mt-1 h-[40px] rounded-md"
                    textStyles={"font-RalewayBold text-2xs"}
                  />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
