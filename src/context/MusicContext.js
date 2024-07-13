import { createContext, useRef, useState } from "react";

const MusicContext = createContext()

const MusicStateProvider = ({ children }) => {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isPause, setIsPause] = useState(false)
    const [volume, setVolume] = useState(1)

    const values = {
        isPlaying,
        setIsPlaying,
        isPause,
        setIsPause,
        volume,
        setVolume
    }

    return (
        <MusicContext.Provider value={values}>
            {children}
        </MusicContext.Provider>
    )
}

export { MusicContext, MusicStateProvider }