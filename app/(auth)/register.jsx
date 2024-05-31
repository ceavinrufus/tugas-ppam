import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import TextProximaNovaReg from "../../components/TextProximaNovaReg";
import { supabase } from "../../lib/supabase";
import { makeRedirectUri } from "expo-auth-session";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const redirectTo = makeRedirectUri();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const submit = async () => {
    const errorOccured = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };

    if (!form.name || !form.email || !form.password || !passwordConfirm) {
      errorOccured.name = form.name ? "" : "Name is required";
      errorOccured.email = form.email ? "" : "Email is required";
      errorOccured.password = form.password ? "" : "Password is required";
      errorOccured.passwordConfirm = passwordConfirm
        ? ""
        : "Confirm password is required";
    }

    if (!errorOccured.email && !validateEmail(form.email)) {
      errorOccured.email = "Invalid email format";
    }

    if (!errorOccured.password && !validatePassword(form.password)) {
      errorOccured.password =
        "Password must be at least 8 characters long and contain both letters and numbers";
    }

    if (!errorOccured.passwordConfirm && form.password !== passwordConfirm) {
      errorOccured.passwordConfirm = "Passwords do not match";
    }

    setError(errorOccured);
    if (
      errorOccured.name ||
      errorOccured.email ||
      errorOccured.password ||
      errorOccured.passwordConfirm
    ) {
      return;
    }
    setIsSubmitting(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      setError({
        name: "",
        email: "",
        password: error.message,
        passwordConfirm: "",
      });
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setForm({ name: "", email: "", password: "" });
      setPasswordConfirm("");
      router.push("/login");
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
            title="Name"
            placeholder={"Ex: John Doe"}
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-7"
            keyboardType="name"
          />
          {error.name ? (
            <TextProximaNovaReg className="text-red-500">
              {error.name}
            </TextProximaNovaReg>
          ) : null}

          <FormField
            title="Email Address"
            placeholder={"Ex: johndoe@gmail.com"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-4"
            keyboardType="email"
          />
          {error.email ? (
            <TextProximaNovaReg className="text-red-500">
              {error.email}
            </TextProximaNovaReg>
          ) : null}

          <FormField
            title="Password"
            placeholder={"Must consist of letters and numbers"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
          />
          {error.password ? (
            <TextProximaNovaReg className="text-red-500">
              {error.password}
            </TextProximaNovaReg>
          ) : null}

          <FormField
            title="Confirm Password"
            placeholder={"Must consist of letters and numbers"}
            value={passwordConfirm}
            handleChangeText={(e) => setPasswordConfirm(e)}
            otherStyles="mt-4"
          />
          {error.passwordConfirm ? (
            <TextProximaNovaReg className="text-red-500">
              {error.passwordConfirm}
            </TextProximaNovaReg>
          ) : null}

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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
