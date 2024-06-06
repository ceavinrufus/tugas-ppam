import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { supabase } from "../../lib/supabase";

import SearchBar from "../../components/SearchBar";
import SpaceCard from "../../components/Space/SpaceCard";
import TabButtons from "../../components/TabButtons";
import { useSpace } from "../../context/SpaceContext";

const Spaces = () => {
  const [triggerResetTab, setTriggerResetTab] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const { spaces, setSpaces } = useSpace();
  const [searchedSpaces, setSearchedSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);

  const buttons = [
    { title: "Explore Spaces" },
    { title: "Joined Spaces" },
    { title: "My Spaces" },
  ];

  useEffect(() => {
    setTriggerResetTab(!triggerResetTab);
  }, [spaces]);

  useEffect(() => {
    const fetchSpaces = async () => {
      let data, error;
      ({
        data: { user },
      } = await supabase.auth.getUser());

      ({ data, error } = await supabase.from("spaces").select());

      if (error) {
        ({
          data: { user },
        } = await supabase.auth.getUser());
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

  const handleTabChange = async (index) => {
    setSelectedTab(index);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (index === 0) {
      setFilteredSpaces(spaces);
      setSearchedSpaces(spaces);
    } else if (index === 1 && user.id) {
      setFilteredSpaces(
        spaces.filter((space) => space.members.includes(user.id))
      );
      setSearchedSpaces(
        spaces.filter((space) => space.members.includes(user.id))
      );
    } else if (index === 2 && user.id) {
      setFilteredSpaces(
        spaces.filter((space) => space.created_by.includes(user.id))
      );
      setFilteredSpaces(
        spaces.filter((space) => space.created_by.includes(user.id))
      );
    }
  };

  return (
    <SafeAreaView>
      <View className="self-center px-4 w-[95%] h-full">
        <View className="flex-1 flex-col my-6">
          <TabButtons
            triggerReset={triggerResetTab}
            buttons={buttons}
            setSelectedTab={handleTabChange}
          />
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
                <SpaceCard key={space.id} space={space} />
              ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Spaces;
