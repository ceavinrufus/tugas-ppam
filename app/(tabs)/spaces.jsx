import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { supabase } from "../../lib/supabase";

import SearchBar from "../../components/SearchBar";
import SpaceCard from "../../components/Space/SpaceCard";
import TabButtons from "../../components/TabButtons";

const Spaces = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [defaultSpaces, setDefaultSpaces] = useState([]);

  const buttons = [
    { title: "Explore Spaces" },
    { title: "Joined Spaces" },
    { title: "My Spaces" },
  ];

  useEffect(() => {
    fetchSpaces();
  }, [selectedTab]);

  const fetchSpaces = async () => {
    let data, error;
    ({
      data: { user },
    } = await supabase.auth.getUser());

    if (selectedTab === 0) {
      ({ data, error } = await supabase.from("spaces").select());
    } else if (selectedTab === 1 && user.id) {
      ({ data, error } = await supabase
        .from("space_members")
        .select("space_id")
        .eq("user_id", user.id));
      const spaceFilter = data.map((obj) => obj.space_id);
      ({ data, error } = await supabase
        .from("spaces")
        .select()
        .in("id", spaceFilter));
    } else if (selectedTab === 2 && user.id) {
      ({ data, error } = await supabase
        .from("spaces")
        .select()
        .eq("created_by", user.id));
    }

    if (error) {
      console.error("Error fetching spaces:", error);
    } else {
      setSpaces(data);
      setDefaultSpaces(data);
    }
  };
  const handleChangeText = (text) => {
    setSearchText(text);
    setSpaces(
      defaultSpaces.filter((space) =>
        space.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <SafeAreaView>
      <View className="self-center px-4 w-[95%] h-full">
        <View className="flex-1 flex-col my-6">
          <TabButtons buttons={buttons} setSelectedTab={handleTabChange} />
          <Text className="font-RalewayBold text-2xl text-primary my-4">
            {buttons[selectedTab].title}
          </Text>
          <SearchBar
            value={searchText}
            placeholder={"Search for spaces"}
            onChangeText={handleChangeText}
          />
          <ScrollView style={{ marginTop: 16 }}>
            {spaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Spaces;
