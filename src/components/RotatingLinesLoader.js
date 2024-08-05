import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { RotatingLines } from "react-loader-spinner";

const RotatingLinesLoader = () => {
  const { colorMode } = useColorMode();

  return (
    <RotatingLines
      visible={true}
      height="96"
      width="96"
      color={colorMode === "light" ? "#000000" : "#FFFFFF"}
      strokeWidth="5"
      strokeColor={colorMode === "light" ? "#000000" : "#FFFFFF"}
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default RotatingLinesLoader;
