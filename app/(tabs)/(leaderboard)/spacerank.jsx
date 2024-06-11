import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import SpaceRankCard from "../../../components/Leaderboard/SpaceRankCard"; // Adjust the import path as necessary
import { SafeAreaView } from "react-native-safe-area-context";
import { useSpace } from "../../../context/SpaceContext";
import { supabase } from "../../../lib/supabase"; // Adjust the import path as necessary

const SpaceRank = () => {
  const { spaces, setSpaces } = useSpace();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchUserStats = async (members) => {
      const { data, error } = await supabase
        .from("user_stats")
        .select("sessions, days_streak")
        .in("user_id", members);

      if (error) {
        console.error(error);
        return [];
      }
      return data;
    };

    const calculateSpaceScore = (userStats) => {
      return userStats.reduce((score, stats) => {
        return score + stats.sessions * 150 + stats.days_streak * 125;
      }, 0);
    };

    const fetchAndCalculateScores = async () => {
      const spaceScores = await Promise.all(
        spaces.map(async (space) => {
          const userStats = await fetchUserStats(space.members);
          const score = calculateSpaceScore(userStats);
          return { spaceId: space.id, score };
        })
      );

      const sortedSpaces = spaces
        .map((space) => {
          const spaceScore = spaceScores.find((s) => s.spaceId === space.id);
          return { ...space, score: spaceScore ? spaceScore.score : 0 };
        })
        .sort((a, b) => b.score - a.score);

      setScores(spaceScores);
      setSpaces(sortedSpaces);
    };

    fetchAndCalculateScores();
  }, [spaces, setSpaces]);

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <View className="self-center px-4 w-[95%] h-full">
        <View className="flex-1">
          <Text className="font-RalewayBold text-2xl text-primary mb-4">
            Space Leaderboard
          </Text>
          <ScrollView style={{ marginBottom: 16 }}>
            {spaces.map((space, index) => (
              <SpaceRankCard
                key={space.id}
                rank={index + 1}
                space={space}
                score={scores.find((s) => s.spaceId === space.id)?.score || 0}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SpaceRank;
