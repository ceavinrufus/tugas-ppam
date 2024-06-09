import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatTime } from "../../utils/timeHelper";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMusic } from "../../context/MusicContext";

const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = 125; // Ketinggian header, sesuaikan dengan kebutuhan
const TABS_HEIGHT = 64; // Ketinggian tabs, sesuaikan dengan kebutuhan

export default function MusicControl() {
  const {
    playing,
    playingDuration,
    elapsedTime,
    isPlaying,
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

  const [isMinimized, setIsMinimized] = useState(true);
  const pan = React.useRef(
    new Animated.ValueXY({ x: width - 60, y: (height / 2 - 30) * -1 })
  ).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        pan.flattenOffset();

        const nearestEdgeX = pan.x._value > width / 2 ? width - 60 : 0;

        Animated.spring(pan.x, {
          toValue: nearestEdgeX,
          useNativeDriver: false,
        }).start();

        if (pan.y._value - HEADER_HEIGHT * -1 > 0) {
          Animated.spring(pan.y, {
            toValue: HEADER_HEIGHT * -1,
            useNativeDriver: false,
          }).start();
        } else if (pan.y._value - (height * -1 + TABS_HEIGHT) < 0) {
          Animated.spring(pan.y, {
            toValue: height * -1 + TABS_HEIGHT,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View className="absolute bottom-2 w-full px-5">
      {isMinimized ? (
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            pan.getLayout(),
            {
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "#FACC2D",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            },
          ]}
        >
          <TouchableOpacity onPress={() => setIsMinimized(false)}>
            <MaterialIcons name="music-note" size={32} color="#190482" />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <LinearGradient
          className="rounded-2xl border border-yellow p-5"
          colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
          locations={[0, 0, 0, 1]}
        >
          <TouchableOpacity
            className="absolute top-2 right-2"
            onPress={() => setIsMinimized(true)}
          >
            <MaterialIcons name="close" size={24} color="#190482" />
          </TouchableOpacity>
          <View className="items-center relative">
            <Text className="font-ProximaNovaBold py-1 text-center">
              {playing ? `Playing: ${playing.title}` : "No song selected"}
            </Text>

            <View className="flex-row items-center my-2">
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
                  name={
                    isPlaying ? "pause-circle-filled" : "play-circle-filled"
                  }
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
      )}
    </View>
  );
}
