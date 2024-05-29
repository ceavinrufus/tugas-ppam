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

const Badges = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="justify-center self-center h-full px-4 w-[90%]">
          <Text>Badges</Text>
          <CustomButton
              title={"Back to Profile"}
              handlePress={() => {router.push("/profile");}}
              containerStyles="mt-1 h-[40px] rounded-md"
              textStyles={"font-RalewayBold text-2xs"}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Badges;
