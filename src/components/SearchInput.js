import {
    FormControl,
    FormErrorMessage,
    FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputRightElement } from "@chakra-ui/input";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, IconButton, InputGroup } from "@chakra-ui/react";

const SearchInput = ({
    id,
    label,
    name,
    rules,
    register,
    type = "text",
    errors,
    placeHolderText = ""
}) => {
    const { ref: inputRef, ...rest } = register(name, rules);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl id={id} isInvalid={!!errors[name]}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            {type === "password" ? (
                <InputGroup>
                    <Input
                        type={showPassword ? "text" : "password"}
                        ref={inputRef}
                        autoComplete="off"
                        isInvalid={!!errors[name]}
                        _active={!!errors[name] ? { borderColor: "red.400" } : ""}
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
                <Input
                    type={type}
                    ref={inputRef}
                    autoComplete="off"
                    isInvalid={!!errors[name]}
                    _active={!!errors[name] ? { borderColor: "red.400" } : ""}
                    placeholder={placeHolderText}
                    {...rest}
                />
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
