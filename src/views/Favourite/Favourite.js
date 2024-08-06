import NavBar from "../../components/NavBar";
import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useFirebase } from "../../hooks/firebase/useFirebase";
import NoData from "../../components/NoData";
import Spinner from "../../components/Spinner";
import MusicCard from "../../components/MusicCard";
import { useMusicStates } from "../../hooks/music/useMusicStates";
import PlayerDrawer from "../../components/PlayerDrawer";
import { useEffect } from "react";

const Favourite = () => {
  const { states } = useFirebase();
  const { favouriteList, loader } = states;
  const { drawerRef, height, selectedMusicData, setHeight } = useMusicStates();

  useEffect(() => {
    if (drawerRef?.current) {
      setHeight(drawerRef?.current?.offsetHeight);
    }
  }, [drawerRef?.current]);

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
            <Spinner />
          </Flex>
        ) : favouriteList && favouriteList?.length > 0 ? (
          <Box
            mt="50px"
            mb={height === 0 ? "50px" : height + 40}
            transition={"all 0.3s ease"}
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
              gap={6}
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
      </Box>
      {selectedMusicData && (
        <PlayerDrawer data={favouriteList} drawerRef={drawerRef} />
      )}
    </>
  );
};

export default Favourite;
