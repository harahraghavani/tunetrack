export const RESPONSE_TYPE_GET = "GET";
export const RESPONSE_TYPE_POST = "POST";
export const USER_ACCESS_TOKEN = "tune_track_user_access_token";
export const USER_DATA = "tune_track_user_data";

export const TS_PARTICLES_OPTIONS = {
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
      opacity: 0.6,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: true,
      speed: 10,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 500,
    },
    opacity: {
      value: 0.1,
    },
    shape: {
      type: ["circle", "triangle", "image"],
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: false,
};
