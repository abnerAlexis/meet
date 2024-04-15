import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppComponent;
    let AppDOM;

    test('Default Number of Events Displayed', ({ given, when, then }) => {
        given('the user has not specified any filtering criteria', () => {
            AppComponent = render(<App />);
        });

        when('the user views the event list', async () => {
            AppDOM = AppComponent.container.firstChild;  //console.log(AppComponent);
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems).toBeInTheDocument;
            });
        });

        then('the default number of displayed events should be 32', async () => {
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('Change Number of Displayed Events', ({ given, when, then }) => {
        given('the user is viewing events', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;  //console.log(AppComponent);
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        when('the user selects a different number of events to display', async () => {
            const input = AppDOM.querySelector('#noe');
            const user = userEvent.setup();
            await user.type(input, '{backspace}{backspace}10');
        });

        then('the displayed number of events should update accordingly', async () => {
            AppDOM = AppComponent.container.firstChild;
            const EventListItems = within(AppDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(10);
        });
    });
});
