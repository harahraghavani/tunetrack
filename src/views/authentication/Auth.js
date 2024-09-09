import { useFirebase } from "../../hooks/firebase/useFirebase";
import { Box, Button, Flex } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { TS_PARTICLES_OPTIONS } from "../../appConstants/constant";

const Auth = () => {
  const { firebaseMethods, states } = useFirebase();

  // destructuring the states
  const { signUpWithGoogle } = firebaseMethods;
  const { isLoading } = states;

  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <Flex
      h="100svh"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={0}
      >
        {init && (
          <Particles
            id="tsparticles"
            particlesLoaded={() => {}}
            options={TS_PARTICLES_OPTIONS}
          />
        )}
      </Box>
      <Button
        size={"md"}
        leftIcon={<FaGoogle />}
        color="white"
        variant="outline"
        onClick={signUpWithGoogle}
        isLoading={isLoading}
        isDisabled={isLoading}
        loadingText="Authenticating..."
        backgroundColor="rgba(255, 255, 255, 0.2)" // Light transparent background
        backdropFilter="blur(100px)" // Adjusted blur value
        border="1px solid rgba(255, 255, 255, 0.3)" // Light border for a more glass-like appearance
        _hover={{
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly darker on hover for a more interactive feel
          backdropFilter: "blur(15px)", // Increased blur on hover
        }}
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // Soft shadow for a floating effect
        borderRadius="lg" // Rounded corners
        zIndex={1} // Ensure button is above particles
      >
        Continue with Google
      </Button>
    </Flex>
  );
};

export default Auth;
