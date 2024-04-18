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
    const [totalExp, setTotalExp] = useState(parseInt(exp) || 0); 
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
        setTotalExp(localStorage.getItem('exp'));
    }, [exp]);
    /*
    useEffect(() => {
        setLevel(localStorage.getItem('level'));
    }, [level]);
    */

    const storeExp = async (newExp) => {
        try {
            const response = await fetch('/store', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ experience: newExp })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const calcLevel = (exp) => {
        //replace with real equation later
        let currLevel = level;
        if (exp > 100){
            currLevel = currLevel + Math.floor(exp/100);
            //currLevel++;
        }
        setLevel(currLevel);
        //localStorage.setItem('level', currLevel);
    }

    const updateExp = (expValue) => {
        console.log("exp value " + expValue);
        calcLevel(expValue);
        setTotalExp(expValue%100); //replace with real function later
        localStorage.setItem('exp', expValue%100);
        storeExp(expValue%100);
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
                    <Schedule changeExpValue={updateExp} currExp={totalExp}/>
                    {/*error ? (
                        <p>Error: {error}</p>
                    ) : (
                        
                    )*/}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
