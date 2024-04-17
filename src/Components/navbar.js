import React, { useState, useEffect } from "react";
import './navbar.css';
import ProgressBar from '../Components/ProgressBar';

const Navbar = () => {
    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const level = 0;
    const [experience, setExperience] = useState(0);

    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu visible");
        }
        else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu hidden");
        }
        setIsMenuClicked(!isMenuClicked);
    };

    return (
        <div>
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
                <div className="experienceBar">
                    <p><b>Level:</b> {level} / <b>Exp:</b> {experience}/100</p>
                    <progress id="exp" max="100" value={experience}/>
                    <ProgressBar bgcolor="#6a1b9a" completed={experience} />
                </div>
            </nav>

            <div className={menu_class}>
                <div className="sidebar-top-section">
                    <div className="username-settings">
                        <div className="username">Username</div>
                        <div className ="cogWheel"></div>
                    </div>
                </div>
                <button className="add-calendar-btn">Add Calendar</button>
                <button className="leaderboard-btn">Leaderboard</button>
            </div>
        </div>
    );
};

export default Navbar;
