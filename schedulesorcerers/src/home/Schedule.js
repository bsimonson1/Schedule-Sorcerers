import { useState } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Views } from 'react-big-calendar';

import './Schedule.css';
import Calendar from './Calendar';
import ExampleEvents from './ExampleEvents';
import EventModal from './EventModal';


const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState(ExampleEvents);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleDateSelection = ({start, end}) => {
        setSelectedDate({start, end});
        openModal();
    };

    const handleEventConfirmation = (eventName) => {
        setEvents([
          ...events,
          {
            id: events.length + 1,
            title: eventName,
            start: selectedDate.start,
            end: selectedDate.end,
          },
        ]);
        closeModal();
      };

    return (
        <div className="calendar-container">
          <Calendar
            views={[Views.MONTH, Views.DAY]}
            defaultView={[Views.MONTH]}
            selectable={true}
            events={events}
            onSelectSlot={handleDateSelection}
          />
          <EventModal openModal={modalOpen} closeModal={closeModal} onConfirm={handleEventConfirmation }/>
        </div>
      );
};

export default Schedule;