import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Navbar from '../Components/navbar'; // Adjust the import path if necessary
import './HomePage.css';

import Schedule from './Schedule';

const HomePage = () => {
    const [date, setDate] = useState(new Date());
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const onChange = (newDate) => {
        setDate(newDate);
    };

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    // Calculate the left margin for the main content based on the navbar state
    const mainContentStyle = {
        marginLeft: isNavbarOpen ? '250px' : '0', // Adjust '250px' to match the width of your navbar
    };

    return (
        <div className="container">
            <Navbar isOpen={isNavbarOpen} toggleNavbar={toggleNavbar} />
         
            <div className="homepage-container" style={mainContentStyle}>
                <div className="top-bar">put menu, exp, etc. here</div>
                <div className='calendar-container'>
                    <Schedule/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
