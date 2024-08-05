import React from "react";
import NavBar from "../../components/NavBar";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { useFirebase } from "../../hooks/firebase/useFirebase";
import NoData from "../../components/NoData";
import Spinner from "../../components/Spinner";
import TableComponent from "../../components/TableComponent";
import FavouriteMusicCard from "../../components/FavouriteMusicCard";

const Favourite = () => {
  const { states } = useFirebase();
  const { favouriteList, loader } = states;

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
          <Box mt="50px" mb={"50px"} transition={"all 0.3s ease"}>
            <SimpleGrid
              justifyContent="center"
              alignItems="center"
              mx="30px"
              gap={6}
            >
              {favouriteList?.map((data) => {
                return <FavouriteMusicCard data={data} />;
              })}
            </SimpleGrid>
          </Box>
        ) : (
          <NoData />
        )}
      </Box>
    </>
  );
};

export default Favourite;
