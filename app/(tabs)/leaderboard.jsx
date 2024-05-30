import { TextInput, View, Image, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import RankingCard from "../../components/Leaderboard/RankingCard";
import ProfileCard from "../../components/Leaderboard/ProfileCard";
import { user } from "../../mocks/user";
import { globalRank } from "../../mocks/leaderboard";
import { FontAwesome } from "@expo/vector-icons";

const Leaderboard = () => {
  const [searchText, setSearchText] = useState("");
  const [defaultRank, setDefaultRank] = useState(
    globalRank.map((person, index) => ({
      ...person,
      rank: index + 1,
    }))
  );
  const [rank, setRank] = useState(defaultRank);

  const handleChangeText = (text) => {
    setSearchText(text);
    setRank(
      defaultRank.filter((person) =>
        person.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <SafeAreaView>
      <View className="self-center px-4 w-[95%] h-full">
        <View className="flex-1 flex-col my-6">
          {/* User Leaderboard Card */}
          <ProfileCard user={user} />
          <View className="w-full h-11 px-4 bg-[#E8E8E8] border border-lightgrey rounded-lg focus:border-yellow flex-row items-center">
            <FontAwesome name="search" size={16} color="black" />
            <TextInput
              className="flex-1 font-ProximaNovaReg ml-2"
              value={searchText}
              selectionColor={"black"}
              placeholder={"Search for users"}
              placeholderTextColor={"#807E78"}
              onChangeText={(text) => handleChangeText(text)}
            />
          </View>
          {/* Ranking */}
          <ScrollView style={{ marginTop: 16 }}>
            {rank.map((user, index) => (
              <RankingCard key={index} rank={user.rank} user={user} />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Leaderboard;
