Feature: Specify Number of Displayed Events

  Scenario: Default Number of Events Displayed
    Given the user has not specified any filtering criteria
    When the user views the event list
    Then the default number of displayed events should be 32

  Scenario: Change Number of Displayed Events
    Given the user is viewing events
    When the user selects a different number of events to display
    Then the displayed number of events should update accordingly
