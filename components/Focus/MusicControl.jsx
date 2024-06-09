import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { formatTime } from "../../utils/timeHelper";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMusic } from "../../context/MusicContext";

export default function MusicControl() {
  const {
    playing,
    playingDuration,
    sound,
    elapsedTime,
    isPlaying,
    playSound,
    pauseSound,
    resumeSound,
    nextSong,
    prevSong,
    isShuffle,
    toggleShuffle,
    isRepeat,
    isLoop,
    toggleRepeatLoop,
  } = useMusic();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 10,
        width: "100%",
        paddingHorizontal: 20,
      }}
    >
      <LinearGradient
        style={{
          borderRadius: 10,
          borderColor: "#FACC2D",
          borderWidth: 1,
          padding: 20,
        }}
        colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
        locations={[0, 0, 0, 1]}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "ProximaNovaBold",
              backgroundColor: "linear-gradient(to bottom, #FCE07F, yellow)",
              padding: 5,
              textAlign: "center",
            }}
          >
            {playing ? `Playing: ${playing.title}` : "No song selected"}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <TouchableOpacity onPress={toggleShuffle}>
              <MaterialCommunityIcons
                name={isShuffle ? "shuffle" : "shuffle-disabled"}
                size={32}
                color="#190482"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={prevSong}>
              <MaterialIcons name="skip-previous" size={32} color="#190482" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => (isPlaying ? pauseSound() : resumeSound())}
            >
              <MaterialIcons
                name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
                size={32}
                color="#190482"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={nextSong}>
              <MaterialIcons name="skip-next" size={32} color="#190482" />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleRepeatLoop}>
              <MaterialCommunityIcons
                name={
                  isRepeat ? "repeat" : isLoop ? "repeat-once" : "repeat-off"
                }
                size={32}
                color="#190482"
              />
            </TouchableOpacity>
          </View>

          <View className="w-full flex-row items-center justify-between">
            <Text className="font-ProximaNovaMedium w-[48px]">
              {formatTime(elapsedTime)}
            </Text>
            <View className="h-2 bg-gray-300 rounded-full flex-grow overflow-hidden">
              <View
                style={{
                  width: `${
                    playingDuration !== 0
                      ? (elapsedTime / playingDuration) * 100
                      : 0
                  }%`,
                }}
                className="h-full bg-primary rounded-full"
              />
            </View>
            <Text className="font-ProximaNovaMedium w-[48px] text-right">
              {formatTime(playingDuration)}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
