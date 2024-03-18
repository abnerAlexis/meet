import { render } from "@testing-library/react";
import App from "../App";

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