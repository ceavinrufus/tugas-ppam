import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import TextProximaNovaReg from "./TextProximaNovaReg";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function Identity({ profile }) {
  const { user } = useAuth();
  const [badges, setBadges] = useState();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("user_stats")
        .select()
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setStats(data[0]);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBadges = async () => {
      const { data, error } = await supabase
        .from("badges")
        .select()
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setBadges(data);
      }
    };

    fetchBadges();
  }, []);

  return (
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
            source={require("../assets/img/profpic_placeholder.jpg")}
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
              {badges && badges.length}{" "}
              {badges?.length != 1 ? "badges" : "badge"}
            </TextProximaNovaReg>
          </View>
          <View className="items-center justify-center rounded-md flex-row bg-[#FACC2D] py-1 px-2 mr-2">
            <FontAwesome6 size={10} name="bolt" color="black" />
            <TextProximaNovaReg className="ml-1 text-xs">
              {stats.sessions} {stats?.sessions != 1 ? "sessions" : "session"}
            </TextProximaNovaReg>
          </View>
        </View>
      </View>
    </View>
  );
}
