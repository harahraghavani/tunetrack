import { createContext, useRef, useState } from "react";

const MusicContext = createContext()

const MusicStateProvider = ({ children }) => {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isPause, setIsPause] = useState(false)
    const [volume, setVolume] = useState(1);
    const [selectedMusic, setSelectedMusic] = useState(null)

    const values = {
        isPlaying,
        setIsPlaying,
        isPause,
        setIsPause,
        volume,
        setVolume,
        audioRef,
        selectedMusic,
        setSelectedMusic
    }

    return (
        <MusicContext.Provider value={values}>
            {children}
        </MusicContext.Provider>
    )
}

export { MusicContext, MusicStateProvider }
