import App from '../App';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('Events are collapsed by default', ({ given, when, then }) => {
    let AppComponent;
    given('the user launches the application', () => {
      AppComponent = render(<App />);
    });

    when('the user navigates to the events section', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems).toBeInTheDocument;
      });
    });

    then('by default all event entries should be collapsed', () => {
      const EventDOM = AppComponent.container.firstChild;
      const eventDetails = EventDOM.querySelector('.showdetails');
      expect(eventDetails).toBeNull();
    });
  });

  test('user shows event details', ({ given, when, then }) => {
    let AppComponent;
    given('the user is viewing a list of events', async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        const eventList = within(AppComponent.container.firstChild).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });


    when('the user clicks on an event', () => {
      const button = AppComponent.container.querySelector('button');
      const user = userEvent.setup();
      user.click(button);
    });

    then('the details of the event should be displayed', async () => {
      const EventDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const button = EventDOM.querySelector('button');
        expect(button.textContent).toBe('Hide Details');
      });
    });
  });

  test('Collapse an event to hide details', ({ given, when, then }) => {
    let AppComponent;
    let button;

    given('the user is viewing the details of an event', async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        const eventList = within(AppComponent.container.firstChild).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });

      const button = AppComponent.container.querySelector('button.showdetails'); // Adjust this selector based on your actual button
      const user = userEvent.setup();
      user.click(button);
    });

    when('the user clicks on a hide button', () => {
      button = AppComponent.container.querySelector('button.showdetails');
      const user = userEvent.setup();
      user.click(button);
    });

    then('the event details should be hidden from view', async () => {
      const EventDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        button = EventDOM.querySelector('button.showdetails');
        expect(button.textContent).toBe('Show Details');
      });
    });
  });
});
