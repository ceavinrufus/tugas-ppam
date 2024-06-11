import { View, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import RankingCard from "../../../components/Leaderboard/RankingCard";
import ProfileCard from "../../../components/Leaderboard/ProfileCard";
import SearchBar from "../../../components/SearchBar";
import { supabase } from "../../../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";

const Leaderboard = () => {
  const [searchText, setSearchText] = useState("");
  const [ranks, setRanks] = useState();
  const [users, setUsers] = useState();

  const sortUsers = (a, b) => {
    // Compare by number of sessions in stats
    const sessionsComparison = b.stats.sessions - a.stats.sessions;
    if (sessionsComparison !== 0) {
      return sessionsComparison;
    }

    // If sessions are equal, compare by number of badges
    return b.badges.length - a.badges.length;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.from("profiles").select();

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        const usersWithBadgesAndStats = await Promise.all(
          data.map(async (user) => {
            // Fetch badges for the user
            const { data: badgesData, error: badgesError } = await supabase
              .from("badges")
              .select()
              .eq("user_id", user.id);

            if (badgesError) {
              console.error("Error fetching badges data:", badgesError);
            }

            // Fetch stats for the user
            const { data: statsData, error: statsError } = await supabase
              .from("user_stats")
              .select()
              .eq("user_id", user.id);

            if (statsError) {
              console.error("Error fetching stats data:", statsError);
            }

            // Combine user data with badges and stats
            return {
              ...user,
              badges: badgesData || [],
              stats: statsData[0] || null, // Assuming there's only one stats entry per user
            };
          })
        );
        const sortedUsers = usersWithBadgesAndStats
          .sort(sortUsers)
          .map((user, index) => ({
            ...user,
            rank: index + 1,
          }));
        setUsers(sortedUsers);
        setRanks(sortedUsers);
      }
    };

    fetchUser();
  }, []);

  const handleChangeText = (text) => {
    setSearchText(text);
    setRanks(
      users.filter((user) =>
        user.full_name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <View className="self-center px-4 w-[95%] h-full">
        <View className="flex-1">
          <Text className="font-RalewayBold text-2xl text-primary mb-4">
            User Leaderboard
          </Text>
          {/* User Leaderboard Card */}
          <ProfileCard />
          <SearchBar
            value={searchText}
            placeholder={"Search for users"}
            onChangeText={(text) => handleChangeText(text)}
          />
          {/* Ranking */}
          <ScrollView style={{ marginVertical: 16 }}>
            {ranks &&
              ranks.map((user, index) => (
                <RankingCard key={index} rank={user.rank} user={user} />
              ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Leaderboard;
