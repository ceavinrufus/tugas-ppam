import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { formatTime } from "../../utils/timeHelper";
import { useMusic } from "../../context/MusicContext";

export default function Song({ song }) {
  const { isPlaying, playing, playSound, pauseSound, resumeSound } = useMusic();

  return (
    <View className="flex-row items-center justify-between border-secondary border-2 px-4 rounded-xl h-[60px] mb-2">
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => {
            if (playing.id !== song.id) {
              playSound(song);
            } else {
              isPlaying ? pauseSound() : resumeSound();
            }
          }}
        >
          <MaterialIcons
            name={
              playing.id == song.id && isPlaying
                ? "pause-circle-filled"
                : "play-circle-filled"
            }
            size={32}
            color="#190482"
          />
        </TouchableOpacity>
        <View className="flex-1">
          <View className="w-full">
            <Text className="font-ProximaNovaBold">{song.title}</Text>
          </View>
        </View>
        <Text className="font-ProximaNovaReg">{formatTime(song.duration)}</Text>
      </View>
    </View>
  );
}
