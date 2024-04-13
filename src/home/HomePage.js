import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Navbar from '../Components/navbar'; 
import './HomePage.css';

import Schedule from './Schedule';

const HomePage = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [totalExp, setTotalExp] = useState(0);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const updateExp = (expValue) => {
        setTotalExp(expValue);
        //alert(totalExp);
    };
    
    const mainContentStyle = {
        marginLeft: isNavbarOpen ? '250px' : '0', 
    };

    return (
        <div className="container">
            <Navbar isOpen={isNavbarOpen} toggleNavbar={toggleNavbar} expValue={totalExp}/>
         
            <div className="homepage-container">
                <div className='calendar-container'>
                    <Schedule changeExpValue={updateExp}/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
