import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import TextProximaNovaReg from "../../components/TextProximaNovaReg";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase"; // Assuming you have a supabase.js file where Supabase client is initialized

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const submit = async () => {
    const errorOccured = { email: "", password: "" };

    if (!form.email || !form.password) {
      errorOccured.email = form.email ? "" : "Email is required";
      errorOccured.password = form.password ? "" : "Password is required";
    }

    if (!errorOccured.email && !validateEmail(form.email)) {
      errorOccured.email = "Invalid email format";
    }

    if (!errorOccured.password && !validatePassword(form.password)) {
      errorOccured.password =
        "Password must be at least 8 characters long and contain both letters and numbers";
    }

    setErrors(errorOccured);
    if (errorOccured.email || errorOccured.password) {
      return;
    }

    setIsSubmitting(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      Alert.alert(
        "Login failed!",
        error.message,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setForm({ email: "", password: "" });
      router.push("/focus");
    }
  };

  return (
    <SafeAreaView className="">
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="justify-center self-center h-full px-4 w-[90%]"
        >
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
          {errors.email ? (
            <TextProximaNovaReg className="text-red-500">
              {errors.email}
            </TextProximaNovaReg>
          ) : null}

          <FormField
            title="Password"
            placeholder={"Must consist of letters and numbers"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
          />
          {errors.password ? (
            <TextProximaNovaReg className="text-red-500">
              {errors.password}
            </TextProximaNovaReg>
          ) : null}

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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
