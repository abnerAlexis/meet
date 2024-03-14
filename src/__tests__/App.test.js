import { render } from "@testing-library/react";
import App from "../App";

describe('<App /> component', () => {
    let AppDOM;

    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    })

    test('renders a list of events', () => {
        validateElementInDocument('#event-list');
    });

    test('render CitySearch', () => {
        validateElementInDocument('#city-search');
    });

    const validateElementInDocument = (locator) => {
        expect(AppDOM.querySelector(locator)).toBeInTheDocument();
    }
});