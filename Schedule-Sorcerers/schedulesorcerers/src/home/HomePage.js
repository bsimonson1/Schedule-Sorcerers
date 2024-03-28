import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './HomePage.css';
import 'react-calendar/dist/Calendar.css';

const HomePage = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div>
            <Calendar onChange={onChange} value={date} />
            <p>Selected date: {date.toDateString()}</p>
        </div>
    );
};

export default HomePage;
