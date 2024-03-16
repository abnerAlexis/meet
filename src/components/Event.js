import React, { useState } from 'react';

const Event = ({ event }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    // Parse start and end date times
    const startDateTime = new Date(event.start.dateTime);
    const endDateTime = new Date(event.end.dateTime);

    // Format date
    const formattedDate = startDateTime.toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    // Format start time
    const formattedStartTime = startDateTime.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Format end time
    const formattedEndTime = endDateTime.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <li className="event">
            <h2>{event.summary}</h2>
            <p>Date: {formattedDate}</p>
            <p>Start Time: {formattedStartTime}</p>
            <p>End Time: {formattedEndTime}</p>
            <p>{event.location}</p>
            <button onClick={() => setDetailsVisible(!detailsVisible)}>
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