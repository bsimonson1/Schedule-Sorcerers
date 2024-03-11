import React, { useState } from 'react';
//import Calendar from 'react-calendar';
import './HomePage.css';
//import './Calendar.css';

import Calendar from './Calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Views } from 'react-big-calendar';
import ExampleEvents from './ExampleEvents';

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
                <Calendar
                //i'm limiting the view to only month to make it easier for now
                views={[Views.MONTH]}
                defaultView={[Views.MONTH]}
                selectable={true}
                events={ExampleEvents}
                />
            </div>
        </div>
    );
};

export default HomePage;
