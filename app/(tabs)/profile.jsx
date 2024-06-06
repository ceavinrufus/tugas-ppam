import { Alert, ScrollView, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import ProfileCard from "../../components/Profile/ProfileCard";
import Menu from "../../components/Profile/Menu";
import { supabase } from "../../lib/supabase";

const Profile = () => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      let data, error;
      ({
        data: { user },
      } = await supabase.auth.getUser());

      ({ data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id));

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setProfile(data[0]);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="self-center px-4 w-[95%] h-full">
          {profile && <ProfileCard profile={profile} />}
          <Text className="text-2xl font-RalewayBold color-[#190482] mb-1">
            Account Settings
          </Text>
          <Menu />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
