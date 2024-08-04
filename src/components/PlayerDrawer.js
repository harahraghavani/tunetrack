import {
  Box,
  Flex,
  Text,
  Image,
  GridItem,
  IconButton,
  useColorMode,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useMusicStates } from "../hooks/music/useMusicStates";
import RangeInput from "./RangeInput";
import {
  IoIosVolumeHigh,
  IoIosVolumeLow,
  IoIosVolumeOff,
} from "react-icons/io";
import { Audio } from "react-loader-spinner";
import { motion } from "framer-motion";

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
    volume,
    handleVolumeChange,
    handleMute,
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
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Box
        position="fixed"
        bottom={0}
        width="100%"
        p={4}
        zIndex={99999}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor={colorMode === "light" ? "gray.100" : "gray.700"}
        transition={"all 0.3s ease"}
        borderTopEndRadius={"25px"}
        borderTopLeftRadius={"25px"}
      >
        <SimpleGrid
          justifyContent="center"
          alignItems="center"
          mx="30px"
          columns={{
            base: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            "2xl": 3,
          }}
          gap={4}
          width={"100%"}
        >
          <GridItem>
            <Flex alignItems="center">
              <Image src={coverart} alt={title} boxSize="50px" mr={4} />
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  {title}
                </Text>
                <Text fontSize="sm">{subtitle}</Text>
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
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
          </GridItem>
          <GridItem>
            <Flex justifyContent="center" alignItems="center" gap={2}>
              <Box>
                {isPlaying && (
                  <Audio
                    height="25"
                    width="25"
                    color={colorMode === "light" ? "#000000" : "#FFFFFF"}
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="wrapper-class"
                    visible={true}
                  />
                )}
              </Box>
              <Box>
                {volume <= 0 && (
                  <IoIosVolumeOff
                    cursor={"pointer"}
                    size={25}
                    onClick={handleMute}
                  />
                )}
                {volume > 0 && volume < 0.5 && (
                  <IoIosVolumeLow
                    cursor={"pointer"}
                    size={25}
                    onClick={handleMute}
                  />
                )}
                {volume >= 0.5 && (
                  <IoIosVolumeHigh
                    size={25}
                    cursor={"pointer"}
                    onClick={handleMute}
                  />
                )}
              </Box>
              <Box width={{ base: "100%", sm: "100%", md: "80%", lg: "50%" }}>
                <RangeInput
                  max={1}
                  min={0}
                  value={volume}
                  onChangeCallBack={(e) => {
                    handleVolumeChange(e);
                  }}
                />
              </Box>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </Box>
    </motion.div >
  );
};

export default PlayerDrawer;
