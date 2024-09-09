import NavBar from "../../components/NavBar";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  useColorMode,
} from "@chakra-ui/react";
import { useFirebase } from "../../hooks/firebase/useFirebase";
import NoData from "../../components/NoData";
import MusicCard from "../../components/MusicCard";
import { useMusicStates } from "../../hooks/music/useMusicStates";
import PlayerDrawer from "../../components/PlayerDrawer";
import { useEffect } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import RotatingLinesLoader from "../../components/RotatingLinesLoader";

const Favourite = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { states, firebaseMethods } = useFirebase();
  const { getFavouriteListData } = firebaseMethods;
  const { favouriteList, loader } = states;
  const location = useLocation();
  const isFirebaseData = location.pathname === "/favourite";
  const {
    drawerRef,
    height,
    selectedMusicData,
    setHeight,
    isPlaying,
    setIsPlaying,
    setSelectedMusicData,
    setSelectedMusic,
    audioRef,
    selectedMusic,
    handleNext,
  } = useMusicStates();

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => {
        if (favouriteList.length > 0) {
          handleNext(favouriteList, isFirebaseData);
        }
      };

      audioRef?.current?.addEventListener("ended", handleEnded);

      return () => {
        audioRef?.current?.removeEventListener("ended", handleEnded);
      };
    }
  }, [audioRef.current, selectedMusic, favouriteList, handleNext]);

  useEffect(() => {
    if (drawerRef?.current) {
      setHeight(drawerRef?.current?.offsetHeight);
    }
  }, [drawerRef?.current]);

  useEffect(() => {
    getFavouriteListData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar />
      <Box minH="calc(100vh - 70px)" position="relative" width="100%" pt="70px">
        {loader ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            height={"calc(100vh - 123px)"}
          >
            <RotatingLinesLoader />
          </Flex>
        ) : (
          <>
            <Box mx="30px" mt="20px">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                px="20px"
                py="10px"
                boxShadow="inner"
                borderRadius="8px"
                border={
                  colorMode === "light"
                    ? "1px solid rgba(0, 0, 0, 0.4)"
                    : "1px solid rgba(255,255,255, 0.4)"
                }
              >
                <Heading size="sm" textTransform="uppercase" fontWeight="bold">
                  Favourites
                </Heading>
                <Button
                  leftIcon={<TiArrowBackOutline size={22} />}
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    setSelectedMusic(null);
                    setSelectedMusicData(null);
                    navigate("/");
                  }}
                  bg="transparent"
                  _hover={{ bg: "transparent", boxShadow: "none" }}
                >
                  Back
                </Button>
              </Flex>
            </Box>
            {favouriteList && favouriteList?.length > 0 ? (
              <Box
                mt="50px"
                mb={height === 0 ? "50px" : height + 50}
                transition={"all 0.3s ease"}
                className="favourite-list"
              >
                <SimpleGrid
                  justifyContent="center"
                  alignItems="center"
                  mx="30px"
                  columns={{
                    base: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                    "2xl": 5,
                  }}
                  gap={8}
                >
                  {favouriteList?.map((data) => {
                    return (
                      <GridItem height={"100%"} key={data?.key}>
                        <MusicCard data={data} />
                      </GridItem>
                    );
                  })}
                </SimpleGrid>
              </Box>
            ) : (
              <NoData />
            )}
          </>
        )}
      </Box>
      {selectedMusicData && (
        <PlayerDrawer data={favouriteList} drawerRef={drawerRef} />
      )}
    </>
  );
};

export default Favourite;
