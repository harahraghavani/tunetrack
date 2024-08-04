import { Box, Flex, Text, Image, GridItem, useColorMode, SimpleGrid } from "@chakra-ui/react";
import { useMusicStates } from "../hooks/music/useMusicStates";
import RangeInput from "./RangeInput";
import {
  IoIosVolumeHigh,
  IoIosVolumeLow,
  IoIosVolumeOff,
} from "react-icons/io";
import { Audio } from "react-loader-spinner";
import { motion } from "framer-motion";
import PlayerControls from "./PlayerControls";

const PlayerDrawer = ({ data }) => {
  const { colorMode } = useColorMode();
  const {
    isPlaying,
    selectedMusicData,
    volume,
    handleVolumeChange,
    handleMute,
  } = useMusicStates();

  if (!selectedMusicData) return null;

  const { hub, images, subtitle, title } = selectedMusicData;
  const { coverart } = images;
  const { actions } = hub;
  const audioLink = actions?.[1]?.uri;



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
        borderTopEndRadius={"15px"}
        borderTopLeftRadius={"15px"}
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
            <PlayerControls data={data} audioLink={audioLink} />
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
                  isStep={true}
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
