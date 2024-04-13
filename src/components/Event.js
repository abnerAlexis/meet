import React, { useState } from 'react';

const Event = ({ event }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const date = new Date(event.created);
    
   

    return (
        <div className='eventcontainer'>
            <li className="event">
                <h2 className='eventtitle'>{event.summary}</h2>
                <p className='eventtime'>Date: {(date).toUTCString()}</p>
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