import {
  Box,
  Card,
  CardBody,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { useMusicStates } from "../hooks/music/useMusicStates";
import { IoAddCircleOutline } from "react-icons/io5";
import { useFirebase } from "../hooks/firebase/useFirebase";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const MusicCard = ({ data }) => {
  const toast = useToast()
  const { states, firebaseMethods } = useFirebase();
  const { addSongToFavouriteList, removeSongFromFavouriteList } =
    firebaseMethods;
  const { favouriteList, loader, isAdd } = states;

  // Check for the presence of the song in the favourite list
  const isFavourite = favouriteList.some((ele) => ele.key === data.key);

  const {
    audioRef,
    isPlaying,
    handlePlayMusic,
    handlePauseMusic,
    setSelectedMusic,
    setSelectedMusicData,
    selectedMusic,
    isFavouritePage
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

  const handleRemoveFromFavouriteList = async () => {
    if (isFavouritePage && isPlaying) {
      toast({
        title: "Please pause the music before proceeding",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      })
    } else {
      await removeSongFromFavouriteList(data.key)
      setSelectedMusic(null)
      setSelectedMusicData(null)
      if (isFavouritePage) {
        window.location.reload()
      }
    }
  }

  const displayIcon = () => {
    return isFavourite ? (
      <FaCheckCircle
        color="green"
        onClick={() => {
          handleRemoveFromFavouriteList()
        }}
      />
    ) : (
      <IoAddCircleOutline
        onClick={async () => {
          await addSongToFavouriteList({ data });
        }}
      />
    );
  };

  return (
    <>
      <Card
        shadow="base"
        rounded="lg"
        height="100%"
        overflow="hidden"
        position="relative"
        transition="transform 0.3s ease"
        _hover={{
          boxShadow: "md",
          "& .playButton": {
            opacity: 1,
            transform: { lg: "scale(1.3)" },
            transition: "opacity 0.3s ease, transform 0.3s ease",
            boxShadow: "none",
          },
          "& .image-container": {
            filter: { md: "blur(7px) brightness(0.9)" },
            transition: { md: "filter 0.3s ease" }, // Smooth transition for blur and darkening
          },
        }}
      >
        <Box position="relative" className="image-container">
          <img
            src={coverart}
            alt="Music"
            width="100%"
            height="auto"
            loading="lazy"
            className="music-image"
            style={{
              transition: "transform 0.3s ease, filter 0.3s ease", // Add smooth transition for image effects
            }}
          />
        </Box>
        <Box
          className="playButton"
          position="absolute"
          right="50%"
          bottom="50%"
          left="50%"
          top="30%"
          opacity={{ base: 1, lg: 0 }}
          transition="opacity 0.3s ease, transform 0.3s ease"
          display={{
            base: "none",
            md: "flex",
          }}
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
            color={"white"}
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
        <CardBody position="relative" p={4}>
          <Box
            display={{
              base: "flex",
              md: "block",
            }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Heading size="sm" textTransform="uppercase" fontWeight="bold">
                {title}
              </Heading>
              <Text mt={2} fontSize="sm">
                {subtitle}
              </Text>
            </Box>
            <Box
              display={{
                base: "block",
                md: "none",
              }}
            >
              <audio ref={audioRef} style={{ display: "none" }}></audio>
              <IconButton
                aria-label={
                  selectedMusic === data.key && isPlaying ? "Pause" : "Play"
                }
                className="responvivePlayButton"
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
                fontSize="28px"
              />
            </Box>
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
          right={0}
          top={0}
          width={"auto"}
          bg={"white"}
          cursor="default"
          borderTopLeftRadius={0}
          borderBottomEndRadius={0}
          borderTopRightRadius={0}
          borderBottomLeftRadius={"10px"}
        >
          <IconButton
            aria-label={"add-to-playlist"}
            className="addButton"
            icon={displayIcon()}
            fontSize="21px"
            color={"black"}
            isDisabled={loader || isAdd === data?.key}
            borderTopLeftRadius={0}
            borderBottomEndRadius={0}
            borderTopRightRadius={0}
            borderBottomLeftRadius={"10px"}
          />
        </Box>
      </Card>
    </>
  );
};

export default MusicCard;
