import React from "react";

import './Main.css';
import Promo from '../Promo/Promo.jsx';
import AboutProject from "../AboutProject/AboutProject";
import Tech from "../Tech/Tech";
import AboutMe from "../AboutMe/AboutMe"
import Portfolio from "../Portfolio/Portfolio";

const Main = () => {
    return (
        <>
            <Promo />
            <AboutProject />
            <Tech />
            <AboutMe />
            <Portfolio />
        </>
    );
};

export default Main;