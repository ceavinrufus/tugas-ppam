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
  ];

  const [playing, setPlaying] = useState(songs[0]);
  const [sound, setSound] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [playingDuration, setPlayingDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadDelay, setIsLoadDelay] = useState(false); // State untuk delay loading

  async function playSound(song) {
    setIsLoading(true);
    setIsLoadDelay(false); // Reset load delay state
    const loadDelayTimeout = setTimeout(() => {
      setIsLoadDelay(true); // Tampilkan loading setelah 0.5 detik
    }, 500);

    setPlaying(song);
    setPlayingDuration(0);
    setElapsedTime(0);
    setSound(null);
    const { sound: newSound } = await Audio.Sound.createAsync(song.file);
    const status = await newSound.getStatusAsync();

    setPlayingDuration(status.durationMillis / 1000);
    setSound(newSound);
    setIsPlaying(true);
    setIsLoading(false);

    clearTimeout(loadDelayTimeout); // Batalkan timer jika pemutaran dimulai sebelum 0.5 detik
    await newSound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
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
    const currentIndex = songs.findIndex((song) => song.id === playing.id);
    let nextIndex;

    if (isShuffle) {
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === currentIndex);
    } else {
      nextIndex = (currentIndex + 1) % songs.length;
    }

    playSound(songs[nextIndex]);
  }

  function prevSong() {
    const currentIndex = songs.findIndex((song) => song.id === playing.id);
    let prevIndex;

    if (isShuffle) {
      do {
        prevIndex = Math.floor(Math.random() * songs.length);
      } while (prevIndex === currentIndex);
    } else {
      prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    }

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
        isLoading: isLoading && isLoadDelay, // Hanya set isLoading jika isLoadDelay true
        songs,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
