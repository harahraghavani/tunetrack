import { Box, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { CiLight, CiDark, CiHeart } from "react-icons/ci";
import React, { useEffect, useRef, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useFirebase } from "../hooks/firebase/useFirebase";
import { useNavigate } from "react-router-dom";
import { useMusicStates } from "../hooks/music/useMusicStates";

const NavBar = () => {
  const { firebaseMethods } = useFirebase();
  const { logoutUser } = firebaseMethods;
  const { colorMode, toggleColorMode } = useColorMode();
  const navbarRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navigate = useNavigate();
  const { isPlaying, setIsPlaying, setSelectedMusicData } = useMusicStates();

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        navbarRef.current.style.top = "0";
        if (currentScrollPos > 0) {
          navbarRef.current.style.boxShadow =
            "rgba(57, 63, 72, 0.4) 0px 2px 5px";
          navbarRef.current.style.backgroundColor =
            colorMode === "light" ? "#FFFFFF" : "#1A202C";
        } else {
          navbarRef.current.style.boxShadow = "none";
          navbarRef.current.style.backgroundColor = "transparent";
          setHasScrolled(false);
        }
      } else {
        navbarRef.current.style.top = "-70px";
        setHasScrolled(true);
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [colorMode]);

  useEffect(() => {
    if (hasScrolled) {
      navbarRef.current.style.boxShadow = "rgba(57, 63, 72, 0.4) 0px 2px 5px";
      navbarRef.current.style.backgroundColor =
        colorMode === "light" ? "#FFFFFF" : "#1A202C";
    }
  }, [hasScrolled, colorMode]);

  return (
    <Box
      w="100%"
      position="fixed"
      ref={navbarRef}
      transition={"all 0.3s ease"}
      zIndex={999}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"} p={"20px"}>
        <Heading
          as="h4"
          size="md"
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          TuneTrack
        </Heading>
        <Flex gap={4} alignItems={"center"}>
          <Box onClick={toggleColorMode} cursor={"pointer"}>
            {colorMode === "light" ? (
              <CiDark size={35} />
            ) : (
              <CiLight size={35} />
            )}
          </Box>
          <Box cursor={"pointer"}>
            <CiHeart
              size={35}
              onClick={() => {
                setIsPlaying(!isPlaying);
                setSelectedMusicData(null);
                navigate("/favourite");
              }}
            />
          </Box>
          <Box cursor={"pointer"}>
            <IoIosLogOut size={35} onClick={logoutUser} />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
