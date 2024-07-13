import {
    FormControl,
    FormErrorMessage,
    FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputRightElement } from "@chakra-ui/input";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, IconButton, InputGroup } from "@chakra-ui/react";

const SearchInput = ({
    id,
    label,
    name,
    rules,
    register,
    type = "text",
    errors,
    placeHolderText = "",
    onChangeCallBack,
    showCancel,
    clearOnClick
}) => {
    const { ref: inputRef, onChange, ...rest } = register(name, rules);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        if (onChangeCallBack) {
            onChangeCallBack(e);
        }
        onChange(e);
    };

    return (
        <FormControl id={id} isInvalid={!!errors[name]} width={"30%"}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            {type === "password" ? (
                <InputGroup>
                    <Input
                        type={showPassword ? "text" : "password"}
                        ref={inputRef}
                        autoComplete="off"
                        isInvalid={!!errors[name]}
                        _active={!!errors[name] ? { borderColor: "red.400" } : ""}
                        onChange={handleChange}
                        {...rest}
                    />
                    <InputRightElement width="4.5rem">
                        <IconButton
                            h="1.75rem"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            bgColor={"transparent"}
                            placeholder={placeHolderText}
                            _hover={{ bgColor: "transparent" }}
                        />
                    </InputRightElement>
                </InputGroup>
            ) : (
                <InputGroup>
                    <Input
                        type={type}
                        ref={inputRef}
                        onChange={handleChange}
                        autoComplete="off"
                        isInvalid={!!errors[name]}
                        _active={!!errors[name] ? { borderColor: "red.400" } : ""}
                        placeholder={placeHolderText}
                        {...rest}
                    />
                    {showCancel && (
                        <InputRightElement width="4.5rem">
                            <IconButton
                                h="1.75rem"
                                size="sm"
                                onClick={clearOnClick}
                                icon={<CloseIcon />}
                                bgColor={"transparent"}
                                _hover={{ bgColor: "transparent" }}
                            />
                        </InputRightElement>
                    )}
                </InputGroup>
            )}
            <Box maxW={"330px"}>
                <FormErrorMessage>
                    {errors[name] && errors[name]?.message}
                </FormErrorMessage>
            </Box>
        </FormControl>
    );
};

export default SearchInput;
