import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../assets/NoData.json";
import * as NoListData from "../assets/NoDataSecond.json";
import * as NoListDataWhite from "../assets/NoDataWhite.json";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";

const NoData = ({ isSearch = false }) => {
  const { colorMode } = useColorMode();

  const defaultOptions = {
    loop: true,
    autoplay: true,

    animationData: isSearch
      ? animationData
      : colorMode === "light"
      ? NoListData
      : NoListDataWhite,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const lottieSize = useBreakpointValue({ base: 150, md: 250 });

  return (
    <Box m={8}>
      <Card border="1px solid">
        <CardBody>
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Lottie
              options={defaultOptions}
              height={lottieSize}
              width={lottieSize}
              isClickToPauseDisabled={true}
            />
            <Heading
              size={{
                base: "xs",
                sm: "sm",
              }}
              mt={3}
              textTransform="uppercase"
              fontWeight="bold"
            >
              {isSearch ? "Please Enter Something" : "No Data Found!"}
            </Heading>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default NoData;
