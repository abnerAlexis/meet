import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert, WarningAlert, ErrorAlert } from './components/Alert';
import './App.css';
import CityEventsChart from './components/CityEventsChart';


const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities"
      ? allEvents
      : allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("The application is currently offline.");
    }

    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App event-body">
      <h1 className='app-title'>Meet App</h1>
      <div className='alerts-container'>
        {
          errorAlert.length ?
            <ErrorAlert text={errorAlert}/> :
            null
        }
      </div>

      <div className='alerts-container'>
        {
          warningAlert.length ?
            <WarningAlert text={warningAlert}/> :
            null
        }
      </div>

      <div className='alerts-container'>
        {
          infoAlert.length ?
            <InfoAlert text={infoAlert}/> :
            null
        }
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />

      <NumberOfEvents
        setCrntNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
      <CityEventsChart 
        allLocations={ allLocations }
        events={ events }
      />
      <EventList events={events} />
    </div>
  );
}

export default App;