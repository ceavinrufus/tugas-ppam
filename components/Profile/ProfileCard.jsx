import { View, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import CustomButton from "../CustomButton";
import { Foundation } from "@expo/vector-icons";
import { router } from "expo-router";
import TextProximaNovaReg from "../TextProximaNovaReg";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

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
        <View className="flex-row justify-start">
          <View className="h-[50px] w-[50px] border-primary border overflow-hidden mr-4 rounded-full">
            {profile.avatar || profile.gender ? (
              <Image
                source={{
                  uri: profile.avatar
                    ? profile.avatar
                    : `https://avatar.iran.liara.run/public/${profile.gender}?username=${profile.nickname}`,
                }}
                resizeMode="cover"
                className="h-[50px] w-[50px]"
              />
            ) : (
              <Image
                source={require("../../assets/img/profpic_placeholder.jpg")}
                resizeMode="cover"
                className="h-full w-full"
              />
            )}
          </View>
          <View className="flex flex-col">
            <Text className="text-[14px] font-ProximaNovaBold text-primary">
              {profile.full_name}
            </Text>
            <View className="flex flex-row py-1 justify-start">
              <View className="items-center justify-center rounded-md flex-row bg-[#FACC2D] py-1 px-2 mr-2">
                <Foundation size={12} name="sheriff-badge" color="black" />
                <TextProximaNovaReg className="ml-1 text-xs">
                  {profile.badges && profile.badges.length}{" "}
                  {profile.badges != 1 ? "badges" : "badge"}
                </TextProximaNovaReg>
              </View>
              <View className="items-center justify-center rounded-md flex-row bg-[#FACC2D] py-1 px-2 mr-2">
                <FontAwesome6 size={10} name="bolt" color="black" />
                <TextProximaNovaReg className="ml-1 text-xs">
                  {profile.sessions}{" "}
                  {profile.sessions != 1 ? "sessions" : "session"}
                </TextProximaNovaReg>
              </View>
            </View>
          </View>
        </View>

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
