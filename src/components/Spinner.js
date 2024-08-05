import { useColorMode } from "@chakra-ui/react";
import { Audio } from "react-loader-spinner";

const Spinner = () => {
  const { colorMode } = useColorMode();
  return (
    <Audio
      height="100"
      width="100"
      color={colorMode === "light" ? "#000000" : "#FFFFFF"}
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="wrapper-class"
      visible={true}
    />
  );
};

export default Spinner;
