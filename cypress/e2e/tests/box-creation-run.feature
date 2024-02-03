Feature: The user can create a box and run it

  Scenario: The user logins and creates a box
    Given the user is on the login page
    When the user logs in as "rusau.test@gmail.com" and "123456"
    And the user creates a box
    Then the user is on the box page

  Scenario: The author adds participants in the box
    Given the author is on the box page
    When the author adds the following users
      | nameSelector                                  | emailSelector                                 | name   | email                  |
      | :nth-child(1) > .frm-wrapper > #input-table-0 | :nth-child(2) > .frm-wrapper > #input-table-0 | rusau1 | rusau.test+1@gmail.com |
      | :nth-child(3) > .frm-wrapper > #input-table-1 | :nth-child(4) > .frm-wrapper > #input-table-1 | rusau2 | rusau.test+2@gmail.com |
      | :nth-child(5) > .frm-wrapper > #input-table-2 | :nth-child(6) > .frm-wrapper > #input-table-2 | rusau3 | rusau.test+3@gmail.com |
    Then the participant's list includes three users as "rusau1" and "rusau2" and "rusau3"

  Scenario: The author conducts a draw
    Given the author is on the box page
    When the author conducts the draw
    Then the draws's list displays

  Scenario: Users approve a participation
    Given the user is on the login page
    When users log in as "<email>" and "<password>"
    And the user approves the participation
    Then the notice for the participant displays
    Examples:
      | email                  | password |
      | rusau.test+1@gmail.com | 123456   |
      | rusau.test+2@gmail.com | 123456   |
      | rusau.test+3@gmail.com | 123456   |




