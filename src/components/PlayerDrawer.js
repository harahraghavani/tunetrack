import {
  Box,
  Flex,
  Text,
  Image,
  GridItem,
  useColorMode,
  SimpleGrid,
} from "@chakra-ui/react";
import { useMusicStates } from "../hooks/music/useMusicStates";
import RangeInput from "./RangeInput";
import {
  IoIosVolumeHigh,
  IoIosVolumeLow,
  IoIosVolumeOff,
} from "react-icons/io";
import { Audio } from "react-loader-spinner";
import PlayerControls from "./PlayerControls";
import { keyframes } from "@chakra-ui/react";

const PlayerDrawer = ({ data, drawerRef }) => {
  const { colorMode } = useColorMode();
  //   const gradientAnimation = keyframes`
  //   0% { background-position: 0% 50%; }
  //   50% { background-position: 100% 50%; }
  //   100% { background-position: 0% 50%; }
  // `;
  // Define smoother gradient animation
  const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 50%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 50%; }
  100% { background-position: 0% 50%; }
`;
  // Define a dark blue gradient palette
  const darkBlueGradient = "linear-gradient(270deg, #001f3f, #00557f, #003f7f, #002f5f, #001f4f)";

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
      transition="transform 0.3s ease"
      borderTopEndRadius={"15px"}
      borderTopLeftRadius={"15px"}
      ref={drawerRef}
      backgroundSize="200% 200%"
      backgroundImage={
        isPlaying
          ? darkBlueGradient
          : colorMode === "light"
            ? "gray.100"
            : "gray.700"
      }
      animation={isPlaying ? `${gradientAnimation} 5s ease infinite` : ""}
      color={colorMode === "light" ? isPlaying ? "white" : "black" : "white"}
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
        gap={{
          base: 8,
          md: 4
        }}
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
                height="6px"
              />
            </Box>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default PlayerDrawer;
