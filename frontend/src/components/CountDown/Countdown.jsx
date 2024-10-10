import React, { useState, useEffect } from 'react';
import './Countdown.css'; // Import the CSS file for styles

const Countdown = ({ dealTime, createdTime }) => {
    // Calculate the end time in seconds
    const dealDurationInSeconds = dealTime * 3600; // Convert hours to seconds
    const createdTimestamp = new Date(createdTime).getTime() / 1000; // Convert createdTime to seconds
    const endTime = createdTimestamp + dealDurationInSeconds; // Calculate end time

    const [remainingTime, setRemainingTime] = useState(Math.max(0, endTime - Math.floor(Date.now() / 1000))); // Remaining time in seconds

    useEffect(() => {
        if (remainingTime <= 0) return; // Stop the countdown when it reaches 0

        const timerId = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId); // Clear interval on component unmount
    }, [remainingTime]);

    // Function to format the remaining time
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
    
        return (
            <>
                <p className="countdown-part">
                <span className='countdown-title'>Ending in:</span>
                 <span>  {hours}h </span> 
                 <span>   {minutes}m </span>
                 <span>  {secs}s </span>
                </p>
            </>
        ); // Ensure seconds are two digits
    };

    return (
        <div className="countdown-container">
            <p className="countdown-text">
                 <strong>{formatTime(remainingTime > 0 ? remainingTime : 0)}</strong>
            </p>
        </div>
    );
};

export default Countdown;
