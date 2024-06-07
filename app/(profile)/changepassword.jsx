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

const ChangePassword = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    // TODO: Implement change password
    router.push("/profile");
  };

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <ScrollView>
        <View className="justify-center self-center h-full px-4 w-[90%]">
          <FormField
            title="Email Address"
            placeholder={"Ex: johndoe@gmail.com"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles=""
            keyboardType="email"
          />
          <FormField
            title="Old Password"
            placeholder={"Must consists of letters and numbers"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
          />
          <FormField
            title="New Password"
            placeholder={"Must consists of letters and numbers"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
          />
          <FormField
            title="Confirm Password"
            placeholder={"Must consists of letters and numbers"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
          />
          <CustomButton
            title={"Save Changes"}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <CustomButton
            title={"Cancel"}
            handlePress={() => {
              router.push("/edit");
            }}
            containerStyles="mt-2 bg-white border border-primary"
            textStyles={"text-primary"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
