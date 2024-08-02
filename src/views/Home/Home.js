import SearchInput from "../../components/SearchInput";
import { useForm } from "react-hook-form";
import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { searchApiCall } from "../../utility/apiCalls/apiCallFunctions";
import Spinner from "../../components/Spinner";
import MusicCard from "../../components/MusicCard";
import PlayerDrawer from "../../components/PlayerDrawer";
import { useMusicStates } from "../../hooks/music/useMusicStates";

const Home = () => {
  const { selectedMusicData, setSelectedMusicData } = useMusicStates();
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [isCloseIcon, setIsCloseIcon] = useState(false);
  const searchVal = watch("searchData");
  const [debouncedTerm] = useDebounce(searchVal, 1000);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchData = (e) => {
    const value = e?.target?.value;
    setIsCloseIcon(value !== "");
  };

  const clearOnClick = () => {
    setValue("searchData", "");
    setSearchResults(null);
    setSelectedMusicData(null);
  };

  useEffect(() => {
    if (debouncedTerm !== undefined && debouncedTerm !== "") {
      setIsSearching(true);
      searchApiCall({
        paramsData: {
          term: debouncedTerm,
        },
      })
        .then((response) => {
          setSearchResults(response?.tracks?.hits);
        })
        .catch((error) => {
          setSearchResults(null);
        })
        .finally(() => {
          setIsSearching(false);
        });
    } else {
      setSearchResults(null);
    }
  }, [debouncedTerm]);

  useEffect(() => {
    setIsCloseIcon(searchVal !== undefined && searchVal !== "");
    if (searchVal !== undefined || searchVal !== "") {
      setSelectedMusicData(null);
    }
  }, [searchVal]);

  return (
    <>
      <Box minH="calc(100vh - 70px)" position="relative" width="100%">
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="row"
          height="100%"
        >
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
          <Box my="50px">
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
          "No Data Found"
        )}
      </Box>
      {selectedMusicData && <PlayerDrawer data={searchResults} />}
    </>
  );
};

export default Home;
