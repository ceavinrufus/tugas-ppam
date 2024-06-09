import React, { createContext, useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";

// Buat context
export const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

// Buat provider
export const MusicProvider = ({ children }) => {
  const songs = [
    {
      id: 1,
      title: "Coverless book ( Lofi )",
      duration: 4 * 60 + 24,
      copyright: "Amir Firouzfard",
      file: require("../assets/songs/Coverless-book-Lofi.mp3"),
    },
    {
      id: 2,
      title: "Lofi Study",
      duration: 2 * 60 + 27,
      copyright: "FASSounds",
      file: require("../assets/songs/Lofi-Study.mp3"),
    },
    {
      id: 3,
      title: "Lofi Relax - Travel by Lofium",
      duration: 5 * 60 + 6,
      copyright: "Lofium",
      file: require("../assets/songs/Lofi-Relax-Travel-by-Lofium.mp3"),
    },
    // {
    //   id: 1,
    //   title: "Clock",
    //   duration: 3,
    //   copyright: "Sound Effect",
    //   file: require("../assets/songs/Clock-Close-Mic.mp3"),
    // },
    // {
    //   id: 2,
    //   title: "Clock",
    //   duration: 3,
    //   copyright: "Sound Effect",
    //   file: require("../assets/songs/Clock-Close-Mic.mp3"),
    // },
    // {
    //   id: 3,
    //   title: "Clock",
    //   duration: 3,
    //   copyright: "Sound Effect",
    //   file: require("../assets/songs/Clock-Close-Mic.mp3"),
    // },
  ];

  const [playing, setPlaying] = useState(songs[0]);
  const [sound, setSound] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [playingDuration, setPlayingDuration] = useState(0);

  async function playSound(song) {
    // console.log("Playing Sound " + song.id);
    const { sound: newSound } = await Audio.Sound.createAsync(song.file);
    const status = await newSound.getStatusAsync();

    setPlayingDuration(status.durationMillis / 1000);
    setSound(newSound);
    setPlaying(song);
    setIsPlaying(true);

    await newSound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          // console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function resumeSound() {
    try {
      await sound.playAsync();
      setIsPlaying(true);
    } catch {
      playSound(playing);
    }
  }

  function nextSong() {
    const currentIndex = playing.id - 1;
    const nextIndex = (currentIndex + 1) % songs.length;
    playSound(songs[nextIndex]);
  }

  function prevSong() {
    const currentIndex = playing.id - 1;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSound(songs[prevIndex]);
  }

  function toggleShuffle() {
    setIsShuffle(!isShuffle);
  }

  function toggleRepeatLoop() {
    if (isRepeat) {
      setIsRepeat(false);
      setIsLoop(true);
    } else if (isLoop) {
      setIsLoop(false);
    } else {
      setIsRepeat(true);
    }
  }

  function handleSongEnd() {
    const currentIndex = songs.findIndex((song) => song.id === playing.id);
    if (isRepeat) {
      playSound(playing);
    } else if (isLoop) {
      nextSong();
    } else {
      if (currentIndex === songs.length - 1) {
        setIsPlaying(false);
        sound.unloadAsync();
      } else {
        nextSong();
      }
    }
  }

  useEffect(() => {
    let intervalId;
    if (isPlaying && sound) {
      intervalId = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setElapsedTime(status.positionMillis / 1000);
          if (status.positionMillis >= status.durationMillis) {
            handleSongEnd();
          }
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, sound, playing]);

  return (
    <MusicContext.Provider
      value={{
        playing,
        playSound,
        pauseSound,
        resumeSound,
        nextSong,
        prevSong,
        toggleShuffle,
        toggleRepeatLoop,
        playingDuration,
        sound,
        elapsedTime,
        isPlaying,
        isShuffle,
        isRepeat,
        isLoop,
        songs,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
