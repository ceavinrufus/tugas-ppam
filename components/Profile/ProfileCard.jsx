import { View, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../CustomButton";
import { router } from "expo-router";
import TextProximaNovaReg from "../TextProximaNovaReg";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import Identity from "../Identity";

export default function ProfileCard() {
  const [profile, setProfile] = useState();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id);

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setProfile(data[0]);
      }
    };

    fetchUser();
  }, []);

  if (!profile) return;
  return (
    <LinearGradient
      className="rounded-lg border-[#FACC2D] border mb-4"
      colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
      locations={[0, 0, 0, 1]}
      style={"my-5 rounded-md border border-yellow w-full"}
    >
      <View className="flex flex-col border rounded-lg border-[#FACC2D] p-3">
        <Identity profile={profile} />

        <TextProximaNovaReg
          className={`text-xs mt-1 ${
            profile.bio ? "font-ProximaNovaReg" : "font-ProximaNovaItalic"
          }`}
        >
          {profile.bio ? profile.bio : "You haven't created your bio yet"}
        </TextProximaNovaReg>

        <View className="flex-row justify-between mt-1 flex-1">
          <CustomButton
            title={"Edit Profile"}
            handlePress={() => {
              router.push("/edit");
            }}
            containerStyles="mt-1 h-[30px] w-[49%] rounded-md bg-[#FACC2D]"
            textStyles={"font-ProximaNovaMedium text-xs color-[#222222]"}
          />
          <CustomButton
            title={"See Badges"}
            handlePress={() => {
              router.push("/badges");
            }}
            containerStyles="mt-1 h-[30px] w-[49%] rounded-md bg-[#FACC2D]"
            textStyles={"font-ProximaNovaMedium text-xs color-[#222222]"}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
