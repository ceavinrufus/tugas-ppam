import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import SearchBar from "../../components/SearchBar";
import SpaceCard from "../../components/Space/SpaceCard";
import TabButtons from "../../components/TabButtons";
import { useSpace } from "../../context/SpaceContext";
import { useAuth } from "../../context/AuthContext";

const Spaces = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const { spaces, setSpaces } = useSpace();
  const [searchedSpaces, setSearchedSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const { user } = useAuth();

  const buttons = [
    { title: "Explore Spaces" },
    { title: "Joined Spaces" },
    { title: "My Spaces" },
  ];

  useEffect(() => {
    const generateTabContent = async () => {
      if (selectedTab === 0) {
        setFilteredSpaces(spaces);
        setSearchedSpaces(spaces);
      } else if (selectedTab === 1 && user.id) {
        setFilteredSpaces(
          spaces.filter((space) => space.members.includes(user.id))
        );
        setSearchedSpaces(
          spaces.filter((space) => space.members.includes(user.id))
        );
      } else if (selectedTab === 2 && user.id) {
        setFilteredSpaces(
          spaces.filter((space) => space.created_by?.includes(user.id))
        );
        setSearchedSpaces(
          spaces.filter((space) => space.created_by?.includes(user.id))
        );
      }
    };
    generateTabContent();
  }, [selectedTab, spaces]);

  useEffect(() => {
    const fetchSpaces = async () => {
      const { data, error } = await supabase.from("spaces").select();

      if (error) {
        console.error("Error fetching spaces:", error);
      } else {
        setSpaces(data);
        setFilteredSpaces(data);
        setSearchedSpaces(data);
      }
    };

    fetchSpaces();
  }, []);

  const handleChangeText = (text) => {
    setSearchText(text);
    setSearchedSpaces(
      filteredSpaces.filter((space) =>
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
            {searchedSpaces &&
              searchedSpaces.map((space) => (
                <SpaceCard
                  canEdit={selectedTab == 2}
                  key={space.id}
                  space={space}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Spaces;
