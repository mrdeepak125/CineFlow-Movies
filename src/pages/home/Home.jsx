import React from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import TopThrillers from "./topTrilar/TopThrillers";
import TopSciFi from "./topScifi/TopSciFi";
import TopHorror from "./TopHorror/TopHorror";
import TopKids from "./topKids/topKids";
import { Analytics } from "@vercel/analytics/react";
import Footer from "../../components/footer/Footer";

const Home = () => {
    return (
        <div className="homePage">
            <Analytics />
            <HeroBanner />
            <Trending />
            <Popular />
            <TopThrillers />
            <TopHorror />
            <TopSciFi />
            <TopKids />
            <TopRated />
            <Footer />
        </div>
    );
};

export default Home;
