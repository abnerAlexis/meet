import React from 'react';

const NumberOfEvents = ({ setCrntNOE, setErrorMsg }) => {
    const handleChange = (event) => {
        let value = parseInt(event.target.value);

        let errorMessage;

        if (!value || isNaN(value) || value <= 0 || value > 32) {
            errorMessage = "Please enter a valid number, greater than 0 and less than 33";

            setErrorMsg(errorMessage);
            setCrntNOE(32);
        } else {
            setErrorMsg("");
            setCrntNOE(value);
        }
    };

    return (
        <div id="number-of-events">
            <label className='noe-label' htmlFor="noe">Number of Events: </label>
            <input
                id="noe"
                type="number"
                defaultValue={32}
                min={'1'}
                max={'32'}
                role="numberofevents"
                onChange={handleChange}
            />
        </div>
    );
};

export default NumberOfEvents;
