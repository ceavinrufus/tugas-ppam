import { View, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import RankingCard from "../../components/Leaderboard/RankingCard";
import ProfileCard from "../../components/Leaderboard/ProfileCard";
import { user } from "../../mocks/user";
import { globalRank } from "../../mocks/leaderboard";
import SearchBar from "../../components/SearchBar";

const Leaderboard = () => {
  const [searchText, setSearchText] = useState("");
  const [defaultRanks, setDefaultRanks] = useState(
    globalRank.map((person, index) => ({
      ...person,
      rank: index + 1,
    }))
  );
  const [ranks, setRanks] = useState(defaultRanks);

  const handleChangeText = (text) => {
    setSearchText(text);
    setRanks(
      defaultRanks.filter((person) =>
        person.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <SafeAreaView>
      <View className="self-center px-4 w-[95%] h-full">
        <View className="mt-[34px] flex-1">
          {/* User Leaderboard Card */}
          <ProfileCard user={user} />
          <SearchBar
            value={searchText}
            placeholder={"Search for users"}
            onChangeText={(text) => handleChangeText(text)}
          />
          {/* Ranking */}
          <ScrollView style={{ marginVertical: 16 }}>
            {ranks.map((user, index) => (
              <RankingCard key={index} rank={user.rank} user={user} />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Leaderboard;
