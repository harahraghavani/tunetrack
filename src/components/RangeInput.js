import React from "react";
import { Input, useColorMode } from "@chakra-ui/react";

const RangeInput = ({
  value,
  max = 1,
  min,
  onChangeCallBack,
  isStep = false,
  step = "0.01",
  height,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Input
      type="range"
      value={value}
      min={min}
      max={max}
      onChange={onChangeCallBack}
      height={height ? height : "25px"}
      variant="filled"
      rounded="full"
      step={step}
      backgroundColor={
        colorMode === "light" ? "white" : "rgba(255, 255, 255, 0.06)"
      }
      transition="all 0.3s linear"
      px={isStep ? 0 : "auto"}
      border={isStep ? "none" : ""}
    />
  );
};

export default RangeInput;
