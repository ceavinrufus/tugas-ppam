import { View, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import TextProximaNovaReg from "../TextProximaNovaReg";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import Identity from "../Identity";

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
