# Introduction
Take a look at the following REST endpoints:

A https://tempo-exercises.herokuapp.com/rest/v1/users
B https://tempo-exercises.herokuapp.com/rest/v1/teams

Append the IDs of users and teams to get further information about each entity, e.g.

C https://tempo-exercises.herokuapp.com/rest/v1/users/a-valid-user-id/
D https://tempo-exercises.herokuapp.com/rest/v1/teams/a-valid-team-id/

This is the Teams REST service and it has a list of users, each user can be part of zero or more teams. Each team one user as a team lead.

# Requirements
* Build a UI showing an overview of all the teams, and allow the current user to navigate between teams to see each team's members. 
* Implement a search mechanism for users and teams

A: /users 
[
    {
        "userId": "f9f3b418-4139-48f1-ad71-8c8e80725dc2",
        "teamId": "599a5fb4-b1ff-424f-9ab6-1dc76b5a512a"
    },
    {
        "userId": "6d7e0109-8cbb-4db2-80a0-e7962a4fff78",
        "teamId": "05eebc25-8078-4a27-ad8d-9789c56d40ef"
    },
    {
        "userId": "dc519c6a-164f-48d9-bdc8-aa5ac3b0b218",
        "teamId": "05eebc25-8078-4a27-ad8d-9789c56d40ef"
    }
]

B: /teams
[
    {
        "id": "6a97c4ce-0705-45ed-876c-80b7e4a4962c",
        "name": "The New Republic",
        "teamLead": "85149632-cc00-4547-8f3b-ee89b6a6f9f7"
    },
    {
        "id": "14cc2713-1639-42bd-91ed-b13a64e06b88",
        "name": "The Resistance",
        "teamLead": "329bd12e-7404-48c6-a84c-6a35cd487e13"
    },
    {
        "id": "7f012b67-7909-4566-83c4-e54b68fea6a5",
        "name": "The First Order",
        "teamLead": "18b718b5-1059-41b3-b271-683cbf2a30fe"
    },
    {
        "id": "67e8e691-ddb3-4c96-bebd-e5228017a324",
        "name": "Mandalorians",
        "teamLead": "51fc99b5-451c-4ae1-9ec3-d412e13832f3"
    }
]

C: /users/:userId

{
    "id": "f9f3b418-4139-48f1-ad71-8c8e80725dc2",
    "name": {
        "first": "Crawford",
        "last": "Leffler"
    },
    "team": "599a5fb4-b1ff-424f-9ab6-1dc76b5a512a"
}

D: /teams/:teamsId

{
    "id": "6a97c4ce-0705-45ed-876c-80b7e4a4962c",
    "name": "The New Republic",
    "teamLead": "85149632-cc00-4547-8f3b-ee89b6a6f9f7"
}