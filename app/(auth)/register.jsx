import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import TextProximaNovaReg from "../../components/TextProximaNovaReg";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};
  return (
    <SafeAreaView className="">
      <ScrollView
      // contentContainerStyle={{
      //   height: "100%",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      >
        <View className="justify-center self-center h-full px-4 w-[90%]">
          <Text className="font-RalewayBold text-primary text-2xl">Hello!</Text>
          <TextProximaNovaReg className="text-sm">
            Welcome back to Virtuoso! Ready to boost your productivity with us?
          </TextProximaNovaReg>

          <FormField
            title="Username"
            placeholder={"Username"}
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="username"
          />
          <FormField
            title="Email Address"
            placeholder={"Ex: johndoe@gmail.com"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-4"
            keyboardType="email"
          />
          <FormField
            title="Password"
            placeholder={"Must consists of letters and numbers"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
          />

          <CustomButton
            title={"Register"}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <TextProximaNovaReg>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-ProximaNovaReg underline"
              >
                Login
              </Link>
            </TextProximaNovaReg>
          </View>
          <View className="justify-center flex-row pt-5">
            <TextProximaNovaReg otherStyles="text-center">
              By registering, you have read and agree to Virtuoso’s{" "}
              <TextProximaNovaReg className="text-primary leading-2 underline">
                Terms of Service
              </TextProximaNovaReg>
            </TextProximaNovaReg>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
