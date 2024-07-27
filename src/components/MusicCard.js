import { Card } from "@chakra-ui/react";
import React from "react";

const MusicCard = ({ data }) => {
    console.log("data: ", data);
    const { hub, images, subtitle, title, share } = data;

    const { background, coverart, coverarthq } = images;

    const { actions } = hub;

    const audioLink = actions?.[1]?.uri;

    return <Card>Harsh</Card>;
};

export default MusicCard;
