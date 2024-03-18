import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfElements";

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;

    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />)
    })

    test('renders textBox', () => {
        const textBox = NumberOfEventsComponent.queryByRole('numberofevents'); 
        expect(textBox).toBeInTheDocument();
    });

    test('renders default value to be 32', () => {
        const textBox = NumberOfEventsComponent.queryByRole('numberofevents');
        expect(textBox.value).toBe('32');
    });

    test('renders number of events that is entered by user', async () => {
        const textBox = NumberOfEventsComponent.queryByRole('numberofevents');
        await user.type(textBox, '{backspace}{backspace}10');
        expect(await textBox.value).toBe('10');
    });
});
