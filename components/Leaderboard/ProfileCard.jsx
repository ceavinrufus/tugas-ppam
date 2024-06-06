import { View, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import TextProximaNovaReg from "../TextProximaNovaReg";
import { supabase } from "../../lib/supabase";

function StatCard({ otherClassName, children }) {
  return (
    <LinearGradient
      colors={["#FACC2D", "#FCE07F", "#FFFFFF"]}
      locations={[0, 1, 1]}
      className={`flex flex-col py-2 rounded-md items-center ${otherClassName}`}
    >
      {children}
    </LinearGradient>
  );
}

export default function ProfileCard() {
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

        {/* Todo: Blom dibikin dinamis */}
        <View className="flex flex-row justify-between mt-2">
          <StatCard otherClassName={"px-5"}>
            <TextProximaNovaReg className="text-xs ">
              Daily Rank
            </TextProximaNovaReg>
            <Text className="text-xl font-ProximaNovaBold">1</Text>
          </StatCard>
          <StatCard otherClassName={"px-4"}>
            <TextProximaNovaReg className="text-xs">
              Weekly Rank
            </TextProximaNovaReg>
            <Text className="text-xl font-ProximaNovaBold">27</Text>
          </StatCard>
          <StatCard otherClassName={"px-3"}>
            <TextProximaNovaReg className="text-xs">
              Monthly Rank
            </TextProximaNovaReg>
            <Text className="text-xl font-ProximaNovaBold">38</Text>
          </StatCard>
        </View>
      </View>
    </LinearGradient>
  );
}
