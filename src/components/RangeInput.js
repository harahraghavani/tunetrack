import React from 'react'
import { Input } from '@chakra-ui/react'

const RangeInput = ({ value, max = 1, min, onChangeCallBack, step = "0.01" }) => {
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
        />
    )
}

export default RangeInput