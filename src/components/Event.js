import React, { useState } from 'react';

const Event = ({ event }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const date = event.created

    return (
        <li className="event">
            <h2>{event.summary}</h2>
            <p className='eventdate'>Date: {date.split('T')[0]}</p>
            <p className='eventtime'>Time: {date.split('T')[1]}</p>
            <p>{event.location}</p>
            <button className='showdetails' onClick={() => setDetailsVisible(!detailsVisible)}>
                {detailsVisible ? 'Hide Details' : 'Show Details'}
            </button>
            {detailsVisible && (
                <div className='eventdetails'>
                    <h2>Event Details</h2>
                    <p>{event.description}</p>
                </div>
            )}
        </li>
    );
};

export default Event;
