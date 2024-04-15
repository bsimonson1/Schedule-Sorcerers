import React, { useState, useEffect } from "react";
import './navbar.css';
import ProgressBar from '../Components/ProgressBar';

const Navbar = () => {
    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const testData = [
        { bgcolor: "#4a5899", completed: expValue }, //color of filling of experience bar
      ];

    const [experience, setExperience] = useState(0);
   
    // toggle burger menu change
        // const fetchExperience = async () => {
        //     try {
        //         const response = await fetch('/grab_exp', {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //         });
        //         if (response.ok) {
        //             const data = await response.json();
        //             setExperience(data.experience);
        //         } else {
        //             console.error('Failed to fetch experience:', response.status);
        //         }
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // };

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
                    <p><b>Level:</b> {level} / <b>Exp:</b> {expValue}/100</p>
                    <progress id="exp" max="100" value={expValue}/>
                    {/*testData.map((item, idx) => (
                    <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                    ))*/}
                </div>
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