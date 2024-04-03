Feature: Show/Hide Event Details

 Scenario: Events are collapsed by default
    Given the user launches the application
    When the user navigates to the events section
    Then by default all event entries should be collapsed 

  Scenario: User shows event details
    Given the user is viewing a list of events
    When the user clicks on an event
    Then the details of the event should be displayed

  Scenario: Collapse an event to hide details
    Given the user is viewing the details of an event
    When the user clicks on a hide button
    Then the event details should be hidden from view