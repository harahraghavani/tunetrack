import { Box, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { useMusicStates } from "../hooks/music/useMusicStates"; // Assuming the hook is stored here.

const MusicCard = ({ data }) => {
  const {
    audioRef,
    isPlaying,
    handlePlayMusic,
    handlePauseMusic,
    setSelectedMusic,
    selectedMusic,
  } = useMusicStates();

  const { hub, images, subtitle, title } = data;
  const { coverart } = images;
  const { actions } = hub;
  const audioLink = actions?.[1]?.uri;

  const togglePlayback = () => {
    if (selectedMusic === data.key) {
      // If the current track is playing or paused, toggle its playback state
      if (isPlaying) {
        handlePauseMusic();
      } else {
        handlePlayMusic(); // Continue playing the same track from the paused position
      }
    } else {
      // If a different track is selected, stop current track and play the new one
      setSelectedMusic(data.key);
      handlePlayMusic(audioLink); // Start playing the new track
    }
  };

  return (
    <Card
      shadow="md"
      rounded="md"
      height="100%"
      overflow="hidden"
      position="relative"
      transition="transform 0.3s ease"
      _hover={{
        "& .playButton": {
          opacity: 1,
          transform: { lg: "scale(1.3)" },
          transition: "opacity 0.3s ease, transform 0.3s ease",
        },
      }}
    >
      <img
        src={coverart}
        alt="Music"
        width="100%"
        height="auto"
        loading="lazy"
      />
      <CardBody position="relative" p={4}>
        <Heading size="sm" textTransform="uppercase" fontWeight="bold">
          {title}
        </Heading>
        <Text mt={2} fontSize="sm">
          {subtitle}
        </Text>
        <Box
          className="playButton"
          position="absolute"
          right="25px"
          bottom="25px"
          opacity={{ base: 1, lg: 0 }}
          transition="opacity 0.3s ease, transform 0.3s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="full"
          boxShadow="md"
          cursor="pointer"
        >
          <audio ref={audioRef} style={{ display: "none" }}></audio>
          {selectedMusic === data.key && isPlaying ? (
            <FaRegCirclePause size={25} onClick={togglePlayback} />
          ) : (
            <FaRegCirclePlay size={25} onClick={togglePlayback} />
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

export default MusicCard;
