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

    return (
        <div className="container">
            <Navbar isOpen={isNavbarOpen} toggleNavbar={toggleNavbar} />
            <div className="main-content">
                <Calendar onChange={onChange} value={date} />
                <p>Selected date: {date.toDateString()}</p>
        <div className="homepage-container">
            <div className="top-bar">put menu, exp, etc. here</div>
            {/*<Calendar onChange={onChange} value={date} />*/}
            {/*<p>Selected date: {date.toDateString()}</p>*/}
            <div className='calendar-container'>
                <Schedule/>
            </div>
        </div>
    );
};

export default HomePage;
