import { render, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";

describe('<App /> component', () => {
    let AppDOM;

    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    })

    test('renders a list of events', () => {
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
    });

    test('render CitySearch', () => {
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });

    test('renders NumberOfEvents', () => {
        let numberOfEvents = AppDOM.querySelector('#number-of-events');
        expect(numberOfEvents).toBeInTheDocument();
    });
});

describe('<App /> integration', () => {
    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
    
        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
    
        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);
    
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   
    
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
          event => event.location === 'Berlin, Germany'
        );
    
        expect(allRenderedEventItems.length).toBe(berlinEvents.length);
        allRenderedEventItems.forEach(event => {
          expect(event.textContent).toContain("Berlin, Germany");
        });
        
      });

      test('renders list of events in number entered by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
        const valueOfNOE = within(NumberOfEventsDOM).queryByRole('numberofevents');

        await user.type(valueOfNOE, '{backspace}{backspace}5');

        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
        expect(allRenderedEventItems.length).toBe(5); 
      })
});