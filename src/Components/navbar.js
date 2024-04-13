import React, { useState, useEffect } from "react";
import './navbar.css';
import ProgressBar from '../Components/ProgressBar';

const Navbar = () => {
    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [experience, setExperience] = useState(0);
   
    // toggle burger menu change
    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await fetch('/grab_exp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setExperience(data.experience);
                } else {
                    console.error('Failed to fetch experience:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchExperience();
    }, []);

    // const testData = [
    //     { bgcolor: "#6a1b9a", experience: experience||0 }, //color of filling of experience bar
    //   ];
    
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
                    <ProgressBar bgcolor="#6a1b9a" experience={experience} />
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