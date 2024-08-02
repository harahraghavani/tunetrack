import {
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useMusicStates } from "../hooks/music/useMusicStates";

const PlayerDrawer = ({ data }) => {
  const { colorMode } = useColorMode();
  const {
    isPlaying,
    handlePlayMusic,
    handlePauseMusic,
    selectedMusicData,
    handlePrevious,
    handleNext,
    selectedMusic,
    setSelectedMusic,
    setSelectedMusicData,
  } = useMusicStates();
  if (!selectedMusicData) return null;

  const { hub, images, subtitle, title } = selectedMusicData;
  const { coverart } = images;
  const { actions } = hub;
  const audioLink = actions?.[1]?.uri;

  const togglePlayback = () => {
    if (selectedMusic === selectedMusicData.key) {
      // If the current track is playing or paused, toggle its playback state
      if (isPlaying) {
        handlePauseMusic();
      } else {
        handlePlayMusic(); // Continue playing the same track from the paused position
      }
    } else {
      // If a different track is selected, stop current track and play the new one
      setSelectedMusic(selectedMusicData.key);
      setSelectedMusicData(selectedMusicData);
      handlePlayMusic(audioLink); // Start playing the new track
    }
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      width="100%"
      p={4}
      zIndex={99999}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor={colorMode === "light" ? "gray.50" : "gray.700"}
      transition={"all 0.3s ease"}
    >
      <Flex alignItems="center">
        <Image src={coverart} alt={title} boxSize="50px" mr={4} />
        <Box>
          <Text fontSize="md" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm">{subtitle}</Text>
        </Box>
      </Flex>
      <Flex>
        <IconButton
          aria-label={"Previous"}
          icon={<MdSkipPrevious />}
          _hover={{ bg: "transparent", boxShadow: "none" }}
          bg="transparent"
          boxShadow={"none"}
          fontSize="28px"
          onClick={() => handlePrevious(data)}
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
          onClick={() => handleNext(data)}
        />
      </Flex>
    </Box>
  );
};

export default PlayerDrawer;
