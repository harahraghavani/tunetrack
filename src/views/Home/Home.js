// React and Third party imports
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useDebounce } from "use-debounce";

// components
import SearchInput from "../../components/SearchInput";
import Spinner from "../../components/Spinner";
import MusicCard from "../../components/MusicCard";
import PlayerDrawer from "../../components/PlayerDrawer";
import NoData from "../../components/NoData";
import NavBar from "../../components/NavBar";

// utility, hooks and redux
import { searchApiCall } from "../../utility/apiCalls/apiCallFunctions";
import { useMusicStates } from "../../hooks/music/useMusicStates";
import {
  setSearchResults,
  setSearchVal,
} from "../../redux/reducer/MusicDataReducer";
import { useFirebase } from "../../hooks/firebase/useFirebase";

const Home = () => {
  const { states } = useFirebase();
  const { loader } = states;

  // redux
  const dispatch = useDispatch();
  const { searchVal, searchResults } = useSelector((state) => state.musicData);

  // useMusicState custom hook
  const {
    selectedMusicData,
    setSelectedMusicData,
    setPreviousVolume,
    setVolume,
    audioRef,
    selectedMusic,
    handleNext,
    drawerRef,
    height,
    setHeight,
  } = useMusicStates();

  // react hook form
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

  // states
  const [isCloseIcon, setIsCloseIcon] = useState(false);
  const [debouncedTerm] = useDebounce(searchVal, 1000);
  const [isSearching, setIsSearching] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // function to handle search
  const handleSearchData = (e) => {
    const value = e?.target?.value;
    setIsCloseIcon(value !== "");
    if (value !== "") {
      dispatch(setSearchVal(value));
      setIsChanging(true);
    } else {
      setIsChanging(false);
      dispatch(setSearchVal(null));
      dispatch(setSearchResults(null));
    }
  };

  const clearOnClick = () => {
    setValue("searchData", "");
    dispatch(setSearchVal(null));
    dispatch(setSearchResults(null));
    setSelectedMusicData(null);
    setVolume(1);
    setPreviousVolume(1);
    setIsChanging(false);
  };

  const searchAPICallData = () => {
    if (!searchResults || isChanging) {
      if (debouncedTerm !== null && debouncedTerm !== "") {
        setIsSearching(true);
        searchApiCall({
          paramsData: {
            term: debouncedTerm,
          },
        })
          .then((response) => {
            dispatch(setSearchResults(response?.tracks?.hits));
          })
          .catch((error) => {
            dispatch(setSearchResults(null));
          })
          .finally(() => {
            setIsSearching(false);
          });
      } else {
        dispatch(setSearchResults(null));
      }
    }
  };

  useEffect(() => {
    searchAPICallData();
  }, [debouncedTerm]);

  useEffect(() => {
    setIsCloseIcon(searchVal !== null && searchVal !== "");
    if (searchVal !== null || searchVal !== "") {
      setSelectedMusicData(null);
      setVolume(1);
      setPreviousVolume(1);
      setValue("searchData", searchVal);
    }
  }, [searchVal]);

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => {
        if (searchResults.length > 0) {
          handleNext(searchResults);
        }
      };

      audioRef?.current?.addEventListener("ended", handleEnded);

      return () => {
        audioRef?.current?.removeEventListener("ended", handleEnded);
      };
    }
  }, [audioRef.current, selectedMusic, searchResults, handleNext]);

  useEffect(() => {
    if (drawerRef?.current) {
      setHeight(drawerRef?.current?.offsetHeight);
    }
  }, [drawerRef?.current]);

  return (
    <>
      <NavBar />
      <Box minH="calc(100vh - 70px)" position="relative" width="100%" pt="70px">
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          mx={{ base: 8, md: 8 }}
        >
          <Box width={{ base: "100%", sm: "50%", md: "50%", lg: "30%" }}>
            <SearchInput
              id="searchData"
              name="searchData"
              register={register}
              errors={errors}
              rules={{}}
              placeHolderText="Search to get results"
              showCancel={isCloseIcon}
              clearOnClick={clearOnClick}
              onChangeCallBack={(e) => handleSearchData(e)}
            />
          </Box>
        </Flex>
        {isSearching ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            height={"calc(100vh - 123px)"}
          >
            <Spinner />
          </Flex>
        ) : searchResults && searchResults?.length > 0 ? (
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
              {searchResults?.map((data) => {
                const musicData = data?.track;
                return (
                  <GridItem height={"100%"} key={musicData?.key}>
                    <MusicCard data={musicData} />
                  </GridItem>
                );
              })}
            </SimpleGrid>
          </Box>
        ) : (
          <NoData isSearch={true} />
        )}
      </Box>
      {selectedMusicData && (
        <PlayerDrawer data={searchResults} drawerRef={drawerRef} />
      )}
    </>
  );
};

export default Home;
