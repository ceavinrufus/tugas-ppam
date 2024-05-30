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

const Edit = () => {
  const [form, setForm] = useState({ name: "", username: "", email: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    router.push("/profile");
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="justify-center self-center h-full px-4 w-[90%]">
        <FormField
            title="Name"
            placeholder={"Marcheline Fanni"}
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Username"
            placeholder={"marchelinefanni"}
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-4"
          />
          <FormField
            title="Email Address"
            placeholder={"marchelinefa@gmail.com"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-4"
            keyboardType="email"
          />
          <FormField
            title="Description"
            placeholder={"A penultimate student in Institut Teknologi ..."}
            value={form.description}
            handleChangeText={(e) => setForm({ ...form, description: e })}
            otherStyles="mt-4"
          />
          <CustomButton
            title={"Save Changes"}
            handlePress={submit}
            containerStyles="mt-7 h-[40px] rounded-md"
            textStyles={"font-RalewayBold text-2xs"}
            isLoading={isSubmitting}
          />
          <CustomButton
            title={"Change Password"}
            handlePress={() => {router.push("/changepassword");}}
            containerStyles="mt-4 h-[40px] rounded-md bg-[#FFFFFF] border border-[#190482]"
            textStyles={"font-RalewayBold text-2xs color-[#190482]"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Edit;
