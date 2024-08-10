import { useFirebase } from "../../hooks/firebase/useFirebase";
import { Box, Button, Flex } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa6"
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Auth = () => {
  const { firebaseMethods, states } = useFirebase();

  // destructuring the states
  const { signUpWithGoogle } = firebaseMethods;
  const { isLoading } = states;

  const [init, setInit] = useState(false);

  const particlesOptions = {
    background: {
      color: {
        value: "#000000",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: false,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 100,
        enable: true,
        opacity: 0.7,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.7,
      },
      shape: {
        type: ["circle", "triangle", "image"],
      },
      size: {
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: false,
  }

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <Flex h="100svh" alignItems="center" justifyContent="center" position="relative">
      <Box position="absolute" top={0} left={0} width="100%" height="100%" zIndex={0}>
        {init && <Particles
          id="tsparticles"
          particlesLoaded={() => { }}
          options={particlesOptions}
        />
        }
      </Box>
      <Button
        size={"md"}
        leftIcon={<FaGoogle />}
        color="white"
        variant="solid"
        onClick={signUpWithGoogle}
        isLoading={isLoading}
        isDisabled={isLoading}
        loadingText="Authenticating..."
        backgroundColor="rgba(255, 255, 255, 0.1)" // Light transparent background
        backdropFilter="blur(70px)" // Glass effect
        border="1px solid rgba(255, 255, 255, 0.2)" // Light border for a more glass-like appearance
        _hover={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
        zIndex={1} // Ensure button is above particles
      >
        Continue with Google
      </Button>
    </Flex>
  );
};

export default Auth;
