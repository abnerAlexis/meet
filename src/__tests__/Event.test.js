import { render} from "@testing-library/react";
import Event from "../components/Event";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

describe('<Event /> component', () => {
    let EventComponent;
    let allEvents;

    beforeEach(async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event event={allEvents[0]}/>);
    });

    test('renders event summary', () => {
        const eventTitle = EventComponent.queryByText(allEvents[0].summary);
        expect(eventTitle).toBeInTheDocument();
    });

    test('renders event location', () => {
        const eventLocation = EventComponent.container.getElementsByClassName('eventlocation')[0];
        expect(eventLocation).toBeInTheDocument();
    });    

    test('renders event details button with the "Show Details"', () => {
        const eventDetails = EventComponent.queryByText('Show Details');
        expect(eventDetails).toBeInTheDocument();
    });

    test('by default event details section should be hidden', () => {
        const details = EventComponent.container.querySelector(".eventdetails");
        expect(details).not.toBeInTheDocument();
    })

    test('shows details section when the user clicks "Show Details" button', async() => {
        const user = userEvent.setup();
        const eventDetails = EventComponent.queryByText('Show Details');

        await user.click(EventComponent.container.querySelector(".showdetails"));
        expect(eventDetails).toBeInTheDocument();
    })

    test('hides details section when the user clicks "Hide Details" button', async() => {
        const user = userEvent.setup();
        const eventDetails = EventComponent.queryByText('Hide Details');

        await user.click(EventComponent.container.querySelector(".showdetails"));
        expect(eventDetails).not.toBeInTheDocument();
    });  

    test('renders event time in UTC format', () => {
        const renderedTime = EventComponent.container.querySelector('.eventtime').textContent.trim();
        const receivedTime = renderedTime.split(', ')[1];
        const expectedTime = new Date(allEvents[0].created).toUTCString().split(', ')[1];
        expect(receivedTime).toEqual(expectedTime);
    });
    
})