import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './App.css';


const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [errorMessage, setErrorMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities"
      ? allEvents
      : allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App event-body">
      <h1 className='app-title'>Meet App</h1>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
      />
      <div className='message-box'>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>

      <NumberOfEvents
        setCrntNOE={setCurrentNOE}
        setErrorMsg={setErrorMessage}
      />
      <EventList events={events} />
    </div>
  );
}

export default App;