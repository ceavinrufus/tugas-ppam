import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import TextProximaNovaReg from "../../components/TextProximaNovaReg";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
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
            title="Email Address"
            placeholder={"Ex: johndoe@gmail.com"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
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
            title={"Login"}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <TextProximaNovaReg>Don't have an account?</TextProximaNovaReg>
            <Link
              href="/register"
              className="text-primary font-ProximaNovaReg underline"
            >
              Register
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
