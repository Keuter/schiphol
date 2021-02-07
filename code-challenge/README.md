# Code Challenge

This repository contains 4 challenges of which we would like you to solve three. **You may choose** between skipping either challenge-3 or challenge-4. See this as an opportunity to show us your way of working, with the same quality as you would deliver on the job.

## How to send us your solution

Please don’t make solutions to the code challenge publicly available online.

We would prefer to receive a link to a private repository.

## Typescript

The first three are plain typescript challenges that you can find here:  
`src/app/challenge-1.ts`
`src/app/challenge-2.ts`
`src/app/challenge-3.ts` (or choose challenge-4 instead)

You can run these challenges like this: `npm run challenge-1`, `npm run challenge-2`, `npm run challenge-3`

## Angular

The fourth challenge involves developing a small user story in Angular+. 

The assignment is to create an interface where you can search by flightNumber through gate changes. A gate change is when a flight is directed to a different gate than originally planned. The gate changes, arrival and departure times can change at any time, so API requests should not be cached.  


If you clone this repository, install the node_modules and run `npm run start`.   
You can see the application on http://localhost:4200

You can find the API documentation for this challenge in the `swagger.json` in this repository.
The API can be started with the command `npm run start:api`.  
It will be available on `http://localhost:3000`.  


A brief overview of the endpoints that are available:

-   `/arrivals`
-   `/departures`
-   `/gate-changes`
-   `/gate-changes/:search`

Acceptance criteria for the user story:

Scenario: Searching for gate changes
Given I am on the Code Challenge page  
When I start typing in the input field  
And I have type more than 1 character  
Then a list of maximum 5 gate changes should be shown  


Scenario: Showing arrival / destination for gate changes  
Given I am on the Code Challenge page  
When I start typing in the input field  
And I have type more than 1 character  
Then a list of gate changes should be shown  
And every gate change should include the destination / origin of the flight  


Scenario: Sorting the gate changes  
Given I am on the Code Challenge page  
When I start typing in the input field  
And I have type more than 1 character  
Then a list of gate changes should be shown  
And the list should be sorted based on arrival / departure time of the flight  


Scenario: Clearing gate changes  
Given I am on the Code Challenge page  
When I start clear the input field  
Then no gate changes should be shown  
