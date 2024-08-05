import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

const FavouriteMusicCard = ({ data }) => {
  const { hub, images, subtitle, title } = data;
  const { coverart } = images;
  const { actions } = hub;
  const audioLink = actions?.[1]?.uri;

  return (
    <>
      <Card
        shadow="md"
        height="100%"
        overflow="hidden"
        position="relative"
        transition="transform 0.3s ease"
        _hover={{
          transform: "translateY(-5px)",
          shadow: "lg",
          "& .playButton": {
            opacity: 1,
            transform: { lg: "scale(1.3)" },
            transition: "opacity 0.3s ease, transform 0.3s ease",
            boxShadow: "none",
          },
        }}
        boxShadow={"lg"}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
      >
        <Flex
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Image
            src={coverart}
            alt="Music"
            width={{
              base: "100%",
              md: "10%",
            }}
            height="auto"
            loading="lazy"
          />
          <CardBody position="relative" p={4}>
            <Heading size="sm" textTransform="uppercase" fontWeight="bold">
              {title}
            </Heading>
            <Text mt={2} fontSize="sm">
              {subtitle}
            </Text>
          </CardBody>
        </Flex>
      </Card>
    </>
  );
};

export default FavouriteMusicCard;
