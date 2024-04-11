import React, { useState } from 'react';

const Event = ({ event }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const date = new Date(event.created);
    
    // Get hours and minutes
    const hours = ("0" + date.getHours()).slice(-2); // Add leading zero if single digit
    const minutes = ("0" + date.getMinutes()).slice(-2); // Add leading zero if single digit

    return (
        <div className='eventcontainer'>
            <li className="event">
                <h2 className='eventtitle'>{event.summary}</h2>
                <p className='eventdate'>Date: {date.toDateString()}</p>
                <p className='eventtime'>Time: {hours}:{minutes}</p>
                <p className='eventlocation'>Event Location: {event.location}</p>
                <button className='showdetails' onClick={() => setDetailsVisible(!detailsVisible)}>
                    {detailsVisible ? 'Hide Details' : 'Show Details'}
                </button>
                {detailsVisible && (
                    <div className='eventdetails' style={{ marginBottom: '-10px' }}>
                        <h2>Event Details</h2>
                        <p>{event.description}</p>
                    </div>
                )}
            </li>
        </div>
    );
};

export default Event;
