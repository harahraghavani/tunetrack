import { createContext, useRef, useState } from "react";

const MusicContext = createContext();

const MusicStateProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);

  // Function to handle playing music
  const handlePlayMusic = (audioLink) => {
    if (audioRef.current) {
      // Check if a new song is selected
      if (audioLink && selectedMusic !== audioLink) {
        // Set new source for the new song
        audioRef.current.src = audioLink;
        // Load the new source to ensure it's ready for playback
        audioRef.current.load();
      }

      // Play audio from the current position
      audioRef.current.play().then(() => {
        setIsPlaying(true); // Set state to playing once audio starts
      });
    }
  };

  // Function to handle pausing music
  const handlePauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio
      setIsPlaying(false); // Set state to paused
    }
  };

  const values = {
    isPlaying,
    setIsPlaying,
    audioRef,
    selectedMusic,
    setSelectedMusic,
    handlePlayMusic,
    handlePauseMusic,
  };

  return (
    <MusicContext.Provider value={values}>{children}</MusicContext.Provider>
  );
};

export { MusicContext, MusicStateProvider };
