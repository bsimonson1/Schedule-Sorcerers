import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/navbar'; 
import './HomePage.css';

import Schedule from './Schedule';

const HomePage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const exp = queryParams.get('exp');
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [totalExp, setTotalExp] = useState(exp || 0); 
    const [level, setLevel] = useState(0);
    const [setDate] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExperience = async () => {
          try {
            // Retrieve email and password from local storage
            const storedEmail = localStorage.getItem('email');
            // No need to store or retrieve password in the client
            const response = await fetch(`http://localhost:5001/grab?email=${storedEmail}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include', // Ensure that cookies are sent with the request
            });
            if (response.ok) {
              const data = await response.json();
              setTotalExp(data.experience);
            } else {
              setError('Failed to fetch experience');
            }
          } catch (error) {
            console.error('Error:', error);
            setError('Failed to fetch experience');
          }
        };
      
        fetchExperience();
      }, []);

    useEffect(() => {
        setTotalExp(exp || 0);
    }, [exp]);

    const onChange = (newDate) => {
        setDate(newDate);
    };

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const calcLevel = (exp) => {
        //replace with real equation later
        setLevel(Math.floor(exp/100));
    }

    const updateExp = (expValue) => {
        calcLevel(expValue);
        setTotalExp(expValue%100); //replace with real function later
    };
    
    const mainContentStyle = {
        marginLeft: isNavbarOpen ? '250px' : '0', 
    };

    return (
        <div className="container">
            <Navbar 
                isOpen={isNavbarOpen} 
                toggleNavbar={toggleNavbar} 
                expValue={totalExp} 
                level={level}
            />
            <div className="homepage-container">
                <div className='calendar-container'>
                    {error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <Schedule changeExpValue={updateExp}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
