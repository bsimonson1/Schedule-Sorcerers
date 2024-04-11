import React, { useState } from 'react';
import './EventModal.css'

const DeleteEventModal = ({ dialogRef, openModal, closeModal, onDelete, onComplete, eventName }) => {
    return (
        <div className='modal-container'>
            {openModal && (
                <dialog open className='modal'ref={dialogRef}>
                    <button className='close' onClick={closeModal}>x</button>
                    <h3>{eventName}</h3>
                    <div className='modal-body-container'>
                        <p>Priority: </p>
                        <p>Exp. Points: </p>
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