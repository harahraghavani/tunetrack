import React from 'react'
import { Input, useColorMode } from '@chakra-ui/react'

const RangeInput = ({ value, max = 1, min, onChangeCallBack, step = "0.01" }) => {
    const { colorMode } = useColorMode()
    return (
        <Input
            type="range"
            value={value}
            min={min}
            max={max}
            onChange={onChangeCallBack}
            height="25px"
            variant="filled"
            rounded="full"
            step={step}
            backgroundColor={colorMode === "light" ? "white" : "rgba(255, 255, 255, 0.06)"}
        />
    )
}

export default RangeInput