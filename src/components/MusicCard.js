import {
  Box,
  Card,
  CardBody,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { useMusicStates } from "../hooks/music/useMusicStates";
import { IoAddCircleOutline } from "react-icons/io5";

const MusicCard = ({ data }) => {
  const {
    audioRef,
    isPlaying,
    handlePlayMusic,
    handlePauseMusic,
    setSelectedMusic,
    setSelectedMusicData,
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
      setSelectedMusicData(data);
      handlePlayMusic(audioLink); // Start playing the new track
    }
  };

  return (
    <>
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
            boxShadow: "none",
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
            boxShadow="none"
            cursor="pointer"
          >
            <audio ref={audioRef} style={{ display: "none" }}></audio>
            <IconButton
              aria-label={
                selectedMusic === data.key && isPlaying ? "Pause" : "Play"
              }
              className="playButton"
              _hover={{ bg: "transparent", boxShadow: "none" }}
              icon={
                selectedMusic === data.key && isPlaying ? (
                  <FaRegCirclePause />
                ) : (
                  <FaRegCirclePlay />
                )
              }
              onClick={togglePlayback}
              bg="transparent"
              fontSize="24px"
            />
          </Box>
        </CardBody>
        <Box
          className="addButton"
          position="absolute"
          opacity={{ base: 1 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          boxShadow="none"
          cursor="pointer"
          right="5px"
          top="5px"
          bg={"white"}
        >
          <IconButton
            aria-label={"add-to-playlist"}
            className="addButton"
            icon={<IoAddCircleOutline />}
            onClick={() => {}}
            fontSize="25px"
            color={"black"}
          />
        </Box>
      </Card>
    </>
  );
};

export default MusicCard;
