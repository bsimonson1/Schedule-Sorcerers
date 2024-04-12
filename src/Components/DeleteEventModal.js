import React, { useState } from 'react';
import './EventModal.css'

const DeleteEventModal = ({ dialogRef, openModal, closeModal, onDelete, onComplete, eventName, eventPriority, eventExp }) => {
    return (
        <div className='modal-container'>
            {openModal && (
                <dialog open className='modal'ref={dialogRef}>
                    <button className='close' onClick={closeModal}>x</button>
                    <h3>{eventName}</h3>
                    <div className='modal-body-container'>
                        <p>Priority: {eventPriority}</p>
                        <p>Exp. Points: {eventExp}</p>
                        <div className='button-group'>
                            <button onClick={onDelete}>Delete</button>
                            <button onClick={onComplete}>Mark Completed</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default DeleteEventModal;