import { render } from "@testing-library/react";
import Event from "../components/Event";
import { getEvents } from "../api";

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
        const eventLocation = EventComponent.queryByText(allEvents[0].location);
        expect(eventLocation).toBeInTheDocument();
    });
})