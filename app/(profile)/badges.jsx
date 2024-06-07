import { ScrollView, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../../components/CustomButton";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import Badge from "../../components/Profile/Badge";

const Badges = () => {
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

  if (!badges | !stats) return;
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="justify-center self-center h-full px-4 w-[95%]">
          <Text className="text-2xl font-RalewayBold text-primary">
            Overview
          </Text>
          <LinearGradient
            className="mt-2 rounded-lg border-[#FACC2D] border"
            colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
            locations={[0, 0, 0, 1]}
            style={{ flex: 1, padding: 20 }}
          >
            <View className="flex-row gap-2 flex-1">
              <LinearGradient
                className="mt-2 rounded-lg border-[#FACC2D] border justify-center items-center"
                colors={["#FACC2D", "#FCE07F"]}
                locations={[0, 1]}
                style={{ flex: 1, padding: 10 }}
              >
                <Text className="text-2xl font-ProximaNovaBold text-primary">
                  {stats.sessions}
                </Text>
                <Text className="text-1xl font-ProximaNovaMedium color-black">
                  total sessions
                </Text>
              </LinearGradient>
              <LinearGradient
                className="mt-2 rounded-lg border-[#FACC2D] border justify-center items-center"
                colors={["#FACC2D", "#FCE07F"]}
                locations={[0, 1]}
                style={{ flex: 1, padding: 10 }}
              >
                <Text className="text-2xl font-ProximaNovaBold text-primary">
                  {badges.length}
                </Text>
                <Text className="text-1xl font-ProximaNovaMedium color-black">
                  {badges.length != 1 ? "badges" : "badge"}
                </Text>
              </LinearGradient>
            </View>
            <View className="flex-row gap-2 mt-1 flex-1">
              <LinearGradient
                className="mt-2 rounded-lg border-[#FACC2D] border justify-center items-center"
                colors={["#FACC2D", "#FCE07F"]}
                locations={[0, 1]}
                style={{ flex: 1, padding: 10 }}
              >
                <Text className="text-2xl font-ProximaNovaBold text-primary">
                  {stats.days_streak ? stats.days_streak : 0}
                </Text>
                <Text className="text-1xl font-ProximaNovaMedium color-black">
                  {stats.days_streak != 1 ? "days" : "day"} streak
                </Text>
              </LinearGradient>
              <LinearGradient
                className="mt-2 rounded-lg border-[#FACC2D] border justify-center items-center"
                colors={["#FACC2D", "#FCE07F"]}
                locations={[0, 1]}
                style={{ flex: 1, padding: 10 }}
              >
                <Text className="text-2xl font-ProximaNovaBold text-primary">
                  {stats.highest_rank ? stats.highest_rank : 0}
                </Text>
                <Text className="text-1xl font-ProximaNovaMedium color-black">
                  highest rank
                </Text>
              </LinearGradient>
            </View>
          </LinearGradient>
          <Text className="mt-7 text-2xl font-RalewayBold text-primary">
            Badges
          </Text>
          {badges &&
            badges.map((badge, index) => (
              <Badge key={index} badge={badge} stats={stats} />
            ))}
          {badges.length > 3 && (
            <View className="mt-4">
              <CustomButton
                title={"View All Badges"}
                handlePress={() => {
                  router.push("/profile");
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Badges;
