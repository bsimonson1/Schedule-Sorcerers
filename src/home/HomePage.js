import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Navbar from '../Components/navbar'; 
import './HomePage.css';

import Schedule from './Schedule';

const HomePage = () => {
    const [date, setDate] = useState(new Date());
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    fetchExperience();
    const onChange = (newDate) => {
        setDate(newDate);
    };

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    
    const mainContentStyle = {
        marginLeft: isNavbarOpen ? '250px' : '0', 
    };

    return (
        <div className="container">
            <Navbar isOpen={isNavbarOpen} toggleNavbar={toggleNavbar} />
         
            <div className="homepage-container">
                <div className='calendar-container'>
                    <Schedule/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
