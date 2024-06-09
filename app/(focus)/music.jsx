import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Song from "../../components/Focus/Song";
import { useMusic } from "../../context/MusicContext";

const MusicScreen = () => {
  const { playing, songs, playSound } = useMusic();

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <ScrollView>
        <View View className="justify-center self-center h-full px-4 w-[95%]">
          {songs.map((song, index) => (
            <Song key={index} song={song} playSound={playSound} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MusicScreen;
