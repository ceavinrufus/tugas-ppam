import { Text, View, Image, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import RankingCard from "../../components/Leaderboard/RankingCard";
import ProfileCard from "../../components/Leaderboard/ProfileCard";
import { user } from "../../mocks/user";
import { globalRank } from "../../mocks/leaderboard";

const Leaderboard = () => {
  return (
    <SafeAreaView>
      <View className="self-center px-4 w-[95%] h-full">
        <View className="flex-1 flex-col my-6">
          {/* User Leaderboard Card */}
          <ProfileCard user={user} />
          {/* Ranking */}
          <ScrollView>
            {globalRank.map((user, index) => (
              <RankingCard key={index} rank={index + 1} user={user} />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Leaderboard;
