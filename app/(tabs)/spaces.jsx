import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";

import { spaces as defaultSpaces } from "../../mocks/spaces";
import SearchBar from "../../components/SearchBar";
import SpaceCard from "../../components/Space/SpaceCard";

const Spaces = () => {
  const [searchText, setSearchText] = useState("");
  const [spaces, setSpaces] = useState(defaultSpaces);

  const handleChangeText = (text) => {
    setSearchText(text);
    setSpaces(
      defaultSpaces.filter((space) =>
        space.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <SafeAreaView>
      <View className="self-center px-4 w-[95%] h-full">
        <View className="flex-1 flex-col my-6">
          <Text className="font-RalewayBold text-2xl text-primary mb-4">
            Explore Space
          </Text>
          <SearchBar
            value={searchText}
            placeholder={"Search for spaces"}
            onChangeText={(text) => handleChangeText(text)}
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
