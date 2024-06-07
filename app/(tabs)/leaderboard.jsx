import { View, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import RankingCard from "../../components/Leaderboard/RankingCard";
import ProfileCard from "../../components/Leaderboard/ProfileCard";
import SearchBar from "../../components/SearchBar";
import { supabase } from "../../lib/supabase";

const Leaderboard = () => {
  const [searchText, setSearchText] = useState("");

  const [ranks, setRanks] = useState();

  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.from("profiles").select();

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUsers(
          data.map((user, index) => ({
            ...user,
            rank: index + 1,
          }))
        );
        setRanks(
          data.map((user, index) => ({
            ...user,
            rank: index + 1,
          }))
        );
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
    <SafeAreaView>
      <View className="self-center px-4 w-[95%] h-full">
        <View className="mt-[34px] flex-1">
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
