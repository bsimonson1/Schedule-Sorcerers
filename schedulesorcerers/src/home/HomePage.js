import React, { useState } from 'react';
//import Calendar from 'react-calendar';
import './HomePage.css';

import Schedule from './Schedule';

const HomePage = () => {
    /*const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };
    */

    return (
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
