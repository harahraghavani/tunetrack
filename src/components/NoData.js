import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from "../assets/NoData.json"
import { Box, Card, CardBody, Flex, Heading } from '@chakra-ui/react';

const NoData = ({ isSearch = false }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Box m="50px">
            <Card border="1px solid">
                <CardBody>
                    <Flex direction="column" justifyContent="center" alignItems="center">
                        <Lottie options={defaultOptions} height={250}
                            width={250} />
                        <Heading size="sm" textTransform="uppercase" fontWeight="bold">
                            {isSearch ? "Please Enter Something" : "No Data Found!"}
                        </Heading>
                    </Flex>
                </CardBody>
            </Card>
        </Box>
    )
}

export default NoData