import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useMusicStates } from "../hooks/music/useMusicStates";
import RangeInput from "./RangeInput";
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useLocation } from "react-router-dom";

const PlayerControls = ({ data, audioLink }) => {
  const location = useLocation();
  const isFirebaseData = location.pathname === "/favourite";
  const {
    currentTime,
    duration,
    handleSeek,
    handlePrevious,
    isPlaying,
    handleNext,
    selectedMusic,
    selectedMusicData,
    handlePauseMusic,
    handlePlayMusic,
    setSelectedMusic,
    setSelectedMusicData,
  } = useMusicStates();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlayback = () => {
    if (selectedMusic === selectedMusicData?.key) {
      // If the current track is playing or paused, toggle its playback state
      if (isPlaying) {
        handlePauseMusic();
      } else {
        handlePlayMusic(); // Continue playing the same track from the paused position
      }
    } else {
      // If a different track is selected, stop current track and play the new one
      setSelectedMusic(selectedMusicData?.key);
      setSelectedMusicData(selectedMusicData);
      handlePlayMusic(audioLink); // Start playing the new track
    }
  };

  return (
    <Box>
      <Flex
        justifyContent={{
          base: "start",
          md: "center",
        }}
        mb={2}
      >
        <IconButton
          aria-label={"Previous"}
          icon={<MdSkipPrevious />}
          _hover={{ bg: "transparent", boxShadow: "none" }}
          bg="transparent"
          boxShadow={"none"}
          fontSize="28px"
          onClick={() => handlePrevious(data, isFirebaseData)}
        />
        <IconButton
          aria-label={isPlaying ? "Pause" : "Play"}
          icon={isPlaying ? <FaRegCirclePause /> : <FaRegCirclePlay />}
          _hover={{ bg: "transparent", boxShadow: "none" }}
          onClick={togglePlayback}
          bg="transparent"
          boxShadow={"none"}
          fontSize="28px"
        />
        <IconButton
          aria-label={"Next"}
          icon={<MdSkipNext />}
          _hover={{ bg: "transparent", boxShadow: "none" }}
          bg="transparent"
          boxShadow={"none"}
          fontSize="28px"
          onClick={() => handleNext(data, isFirebaseData)}
        />
      </Flex>
      <Flex justifyContent="center" alignItems="center" gap={3}>
        <Box>{formatTime(currentTime)}</Box>
        <RangeInput
          min={0}
          max={duration}
          value={currentTime}
          onChangeCallBack={handleSeek}
          height="7px"
        />
        <Box>{formatTime(duration)}</Box>
      </Flex>
    </Box>
  );
};

export default PlayerControls;
