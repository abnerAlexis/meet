import React, { useState } from "react";

const NumberOfEvents = () => {
    const [numberOfEvents, setNumberOfEvents] = useState(32);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        let value = parseInt(event.target.value) | '';
        if (isNaN(value) || value <= 0) {
            setErrorMessage("Please enter a valid positive number 1-32.");
            setNumberOfEvents(32)
        } else if (value > 32) {
            setErrorMessage("The maximum number of events is 32.");
            value = '32';
            setNumberOfEvents(32)
        } else {
            setErrorMessage('');
        }
        setNumberOfEvents(value);
    }

    return (
        <div id="number-of-events">
            <label htmlFor="numberofevents">Number of Events: </label>
            <input 
                id="numberofevents"
                type="number" // Use type number for numerical input
                role="numberofevents"
                value={numberOfEvents}
                onChange={handleChange}
            />
            {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        </div>
    );
};

export default NumberOfEvents;
