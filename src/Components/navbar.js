import React, {useState} from "react";
import './navbar.css';
import { useNavigate } from 'react-router-dom';
const Navbar = ({expValue, level}) => {

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const navigate = useNavigate();
    const testData = [
        { bgcolor: "#4a5899", completed: expValue }, //color of filling of experience bar
      ];

    // toggle burger menu change
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

    return(
        <div> {/* Removed the height style */}
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
                <div className="experienceBar">
                    <p><b>Level:</b> {level} / <b>Exp:</b> {expValue}/100</p>
                    <progress id="exp" max="100" value={expValue}/>
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
                <button className="leaderboard-btn" onClick={() => {
            navigate("/leaderboard");
          }}>Leaderboard</button>
            </div>
        </div>
    );
};

export default Navbar;