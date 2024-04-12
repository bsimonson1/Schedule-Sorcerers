import React, { useState } from 'react';
import './EventModal.css'

const AddEventModal = ({ dialogRef, openModal, closeModal, onConfirm }) => {
    const [eventName, setEventName] = useState('');
    const [priority, setPriority] = useState(1);
    const [invalidEventName, invalidateEventName] = React.useState(false);
    
    const handlePriority = (e) => {
        const value = parseFloat(e.target.value);
        setPriority(value);
    };

    const handleConfirm = (e) => {
        if (eventName){
            onConfirm({eventName, priority});
            setEventName('');
            invalidateEventName(false);
            closeModal();
        } else {
            invalidateEventName(true);
        }
    };

    const handleCancel = () => {
        setEventName('');
        invalidateEventName(false);
        closeModal();
    }

    return (
        <div className='modal-container'>
            {openModal && (
                <dialog open className='modal'ref={dialogRef}>
                        <h3>Add Event</h3>
                        <div className='modal-body-container'>
                            <div className='form-group'>
                                <label htmlFor="eventName">Event Name:</label>
                                <input 
                                    type="text" 
                                    id="eventName" value={eventName} 
                                    onChange={(e) => setEventName(e.target.value)}
                                />
                                <label htmlFor="priority">Priority:</label>
                                <select value={priority} onChange={e => handlePriority(e)}>
                                    <option value='2'>High</option>
                                    <option value='1' >Medium</option>
                                    <option value='0.5'>Low</option>
                                </select>
                            </div>
                            {invalidEventName && <p1 className="error-message">Please input an event name.</p1>}
                            <div className='button-group'>
                                <button onClick={handleConfirm}>Confirm</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                </dialog>
            )}
        </div>
    );
};

export default AddEventModal;