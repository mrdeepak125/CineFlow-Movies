import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const TopHorror = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(
        `/discover/${endpoint}?with_genres=27&with_original_language=hi`
    );

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Horror</span>
                {/* <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                /> */}
            </ContentWrapper>
            <Carousel
                data={data?.results}
                endpoint={endpoint}
                loading={loading}
            />
        </div>
    );
};

export default TopHorror;
