import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";

export const useMusicStates = () => useContext(MusicContext)