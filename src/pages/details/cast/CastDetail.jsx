import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import Carousel from "../../../components/carousel/Carousel";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

const CastDetailsBanner = () => {
    const { person_id } = useParams();
    const { url } = useSelector((state) => state.home);

    // Fetch person details
    const { data: personData, loading: personLoading } = useFetch(`/person/${person_id}`);

    // Fetch movie and TV credits
    const { data: movieCreditsData, loading: movieCreditsLoading } = useFetch(
        `/person/${person_id}/movie_credits`
    );
    const { data: tvCreditsData, loading: tvCreditsLoading } = useFetch(
        `/person/${person_id}/tv_credits`
    );

    const [tab, setTab] = useState("Movies");

    const handleTabChange = (tab) => {
        setTab(tab);
    };

    const getGender = (gender) => {
        switch (gender) {
            case 1:
                return "Female";
            case 2:
                return "Male";
            case 3:
                return "Non-binary";
            default:
                return "Not Specified";
        }
    };

    return (
        <div className="detailsBanner">
            {!personLoading ? (
                <>
                    {!!personData && (
                        <>
                            <div className="backdrop-img">
                                <Img src={url.backdrop + personData.profile_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {personData.profile_path ? (
                                            <Img
                                                className="posterImg"
                                                src={
                                                    url.backdrop?.replace(
                                                        "w1280",
                                                        "w400"
                                                    ) + personData.profile_path
                                                }
                                            />
                                        ) : (
                                            <Img
                                                className="posterImg"
                                                src={PosterFallback}
                                            />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">{personData.name}</div>
                                        <div className="subtitle">
                                            {personData.known_for_department}
                                        </div>

                                        <div className="overview">
                                            <div className="heading">Biography</div>
                                            <div className="description">
                                                {personData.biography || "No biography available."}
                                            </div>
                                        </div>

                                        <div className="info">
                                            {personData.birthday && (
                                                <div className="infoItem">
                                                    <span className="text bold">Date of Birth: </span>
                                                    <span className="text">
                                                        {dayjs(personData.birthday).format(
                                                            "MMM D, YYYY"
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            {personData.place_of_birth && (
                                                <div className="infoItem">
                                                    <span className="text bold">Place of Birth: </span>
                                                    <span className="text">
                                                        {personData.place_of_birth}
                                                    </span>
                                                </div>
                                            )}
                                            {personData.gender !== undefined && (
                                                <div className="infoItem">
                                                    <span className="text bold">Gender: </span>
                                                    <span className="text">
                                                        {getGender(personData.gender)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ContentWrapper>

                            <div className="carouselSection">
                                <ContentWrapper>
                                    <span className="carouselTitle">
                                        {tab === "Movies" ? "Movie Credits" : "TV Credits"}
                                    </span>
                                    <SwitchTabs
                                        data={["Movies", "TV Shows"]}
                                        onTabChange={handleTabChange}
                                    />
                                </ContentWrapper>
                                {tab === "Movies" && movieCreditsData && (
                                    <Carousel
                                        data={movieCreditsData.cast}
                                        loading={movieCreditsLoading}
                                        endpoint="movie"
                                    />
                                )}
                                {tab === "TV Shows" && tvCreditsData && (
                                    <Carousel
                                        data={tvCreditsData.cast}
                                        loading={tvCreditsLoading}
                                        endpoint="tv"
                                    />
                                )}
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default CastDetailsBanner;
