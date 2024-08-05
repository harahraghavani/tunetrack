import { Box, Flex, Heading, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import React from "react";

const TableComponent = ({ data }) => {
  const { hub, images, subtitle, title } = data;
  const { coverart } = images;
  const { actions } = hub;
  const audioLink = actions?.[1]?.uri;

  return (
    <Tbody>
      <Tr cursor="pointer" _hover={{ bg: "gray.100" }}>
        <Td>
          <Flex alignItems="center" gap={2}>
            <img
              src={coverart}
              alt="Music"
              width="40px"
              height="auto"
              loading="lazy"
            />
            <Box>
              <Heading
                size="xs"
                textTransform="uppercase"
                fontWeight="bold"
                mb={{ base: 2, md: 0 }}
              >
                {title}
              </Heading>
              <Text
                display={{ base: "block", md: "none" }}
                size="xs"
                isTruncated
                wordBreak="break-word"
              >
                {subtitle}
              </Text>
            </Box>
          </Flex>
        </Td>
        <Td display={{ base: "none", md: "block" }}>{subtitle}</Td>
      </Tr>
    </Tbody>
  );
};

export default TableComponent;
