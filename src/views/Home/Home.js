import SearchInput from "../../components/SearchInput";
import { useForm } from "react-hook-form";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { searchApiCall } from "../../utility/apiCalls/apiCallFunctions";

const Home = () => {
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
    };

    useEffect(() => {
        if (debouncedTerm !== undefined && debouncedTerm !== "") {
            setIsSearching(true); // Set isSearching to true before API call
            searchApiCall({
                paramsData: {
                    term: debouncedTerm,
                },
            }).then((response) => {
                setSearchResults(response?.tracks?.hits);
            }).catch((error) => {

                setSearchResults(null);
            }).finally(() => {
                setIsSearching(false); // Set isSearching to false after API call completes
            });
        } else {
            setSearchResults(null);
        }
    }, [debouncedTerm]);

    useEffect(() => {
        setIsCloseIcon(searchVal !== undefined && searchVal !== "");
    }, [searchVal]);

    return (
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
            {isSearching ? <Box>Loading...</Box> :
                searchResults && searchResults.length > 0 && (
                    <Box>{searchResults[0]?.track?.hub?.type}</Box>
                )
            }
        </Box>
    );
};

export default Home;
