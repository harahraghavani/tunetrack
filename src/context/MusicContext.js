import { createContext, useEffect, useRef, useState } from "react";

const MusicContext = createContext();

const MusicStateProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusicData, setSelectedMusicData] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const drawerRef = useRef(null);
  const [height, setHeight] = useState(0);

  const handlePlayMusic = (audioLink) => {
    if (audioRef.current) {
      // Check if a new song is selected
      if (audioLink && selectedMusic !== audioLink) {
        // Set new source for the new song
        audioRef.current.src = audioLink;

        // Add event listener for canplaythrough
        const onCanPlayThrough = () => {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true); // Set state to playing once audio starts
            })
            .catch((error) => {});
        };

        // Remove any existing listener to avoid duplicates
        audioRef.current.removeEventListener(
          "canplaythrough",
          onCanPlayThrough
        );

        // Load the new source to ensure it's ready for playback
        audioRef.current.addEventListener("canplaythrough", onCanPlayThrough);
        audioRef.current.load();
      } else {
        // Just play if the song is already loaded
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {});
      }
    }
  };

  // Function to handle pausing music
  const handlePauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio
      setIsPlaying(false); // Set state to paused
    }
  };

  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };

  const getCurrentTrack = (tracks) => {
    if (isShuffled && shuffledIndices.length) {
      return tracks[shuffledIndices[currentTrackIndex]];
    }
    return tracks[currentTrackIndex];
  };

  const handleNext = (tracks, isFirebaseData = false) => {
    const getIndex = isFirebaseData
      ? tracks?.findIndex((trackObj) => trackObj?.key === selectedMusic)
      : tracks?.findIndex(
          (trackObj) => trackObj["track"]?.key === selectedMusic
        );

    if (isShuffled && shuffledIndices.length) {
      const nextIndex = (currentTrackIndex + 1) % shuffledIndices.length;
      setCurrentTrackIndex(nextIndex);
      const nextTrack = tracks[shuffledIndices[nextIndex]];
      const finalTrackData = nextTrack?.track;
      setSelectedMusic(finalTrackData.key);
      setSelectedMusicData(finalTrackData);
      handlePlayMusic(finalTrackData.hub.actions[1].uri);
    } else {
      const nextIndex = (getIndex + 1) % tracks.length;
      setCurrentTrackIndex(nextIndex);
      const nextTrack = tracks[nextIndex];
      const finalTrackData = isFirebaseData ? nextTrack : nextTrack?.track;
      setSelectedMusic(finalTrackData?.key);
      setSelectedMusicData(finalTrackData);
      handlePlayMusic(finalTrackData?.hub?.actions[1].uri);
    }
  };

  const handlePrevious = (tracks, isFirebaseData = false) => {
    const getIndex = isFirebaseData
      ? tracks?.findIndex((trackObj) => trackObj?.key === selectedMusic)
      : tracks?.findIndex(
          (trackObj) => trackObj["track"]?.key === selectedMusic
        );
    if (isShuffled && shuffledIndices.length) {
      const prevIndex =
        (currentTrackIndex - 1 + shuffledIndices.length) %
        shuffledIndices.length;
      setCurrentTrackIndex(prevIndex);
      const prevTrack = tracks[shuffledIndices[prevIndex]];
      const finalTrackData = prevTrack?.track;
      setSelectedMusic(finalTrackData.key);
      setSelectedMusicData(finalTrackData);
      handlePlayMusic(finalTrackData.hub.actions[1].uri);
    } else {
      const prevIndex = (getIndex - 1 + tracks.length) % tracks.length;
      setCurrentTrackIndex(prevIndex);
      const prevTrack = tracks[prevIndex];
      const finalTrackData = isFirebaseData ? prevTrack : prevTrack?.track;
      setSelectedMusic(finalTrackData.key);
      setSelectedMusicData(finalTrackData);
      handlePlayMusic(finalTrackData.hub.actions[1].uri);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMute = () => {
    if (volume === 0) {
      setVolume(previousVolume);
      if (audioRef.current) {
        audioRef.current.volume = previousVolume;
      }
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (event) => {
    const newTime = event.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  useEffect(() => {
    if (audioRef?.current) {
      const handleTimeUpdate = () => {
        setCurrentTime(audioRef?.current?.currentTime);
      };

      const handleLoadedMetadata = () => {
        setDuration(audioRef?.current?.duration);
      };

      audioRef?.current?.addEventListener("timeupdate", handleTimeUpdate);
      audioRef?.current?.addEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      return () => {
        audioRef?.current?.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef?.current?.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [audioRef?.current]);

  const values = {
    isPlaying,
    setIsPlaying,
    audioRef,
    selectedMusic,
    setSelectedMusic,
    selectedMusicData,
    setSelectedMusicData,
    handlePlayMusic,
    handlePauseMusic,
    isShuffled,
    setIsShuffled,
    isLooped,
    setIsLooped,
    shuffledIndices,
    setShuffledIndices,
    currentTrackIndex,
    setCurrentTrackIndex,
    handleNext,
    handlePrevious,
    getCurrentTrack,
    volume,
    setVolume,
    handleVolumeChange,
    previousVolume,
    setPreviousVolume,
    handleMute,
    currentTime,
    duration,
    handleTimeUpdate,
    handleSeek,
    drawerRef,
    height,
    setHeight,
  };

  return (
    <MusicContext.Provider value={values}>{children}</MusicContext.Provider>
  );
};

export { MusicContext, MusicStateProvider };
