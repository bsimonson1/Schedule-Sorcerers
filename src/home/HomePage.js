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
  
    // useEffect(() => {
    //   const fetchExperience = async () => {
    //     try {
    //       // retrieve email
    //       const storedEmail = localStorage.getItem('email');
    //       // fetch providing the stored sessin email
    //       const response = await fetch(`http://127.0.0.1:5000/grab?email=${storedEmail}`, {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         credentials: 'include', // cookies from the respective user
    //       });
    //       if (response.ok) {
    //         const data = await response.json();
    //         setTotalExp(data.experience);
    //       } else {
    //         setError('Failed to fetch experience');
    //       }
    //     } catch (error) {
    //       console.error('Error:', error);
    //       setError('Failed to fetch experience');
    //     }
    //   };
    
    //   fetchExperience();
    // }, []);

    useEffect(() => {
        setTotalExp(exp || 0);
    }, [exp]);

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
