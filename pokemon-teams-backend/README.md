# README

The logic for the pokemons:

- on page load, load all users with the current pokemon_teams_completed
- on add pokemon, fetch => calls new which creates a random pokemon => sends the pokemon back as json and adds to current
- on delete pokemon, fetch => delete call deletes

1. When a user loads the page, they should see all trainers, with their current team of Pokemon.

2. Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.

3. Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.


#=> Example Request
GET /trainers

#=> Example Response
[
  {
    "id":1,
    "name":"Prince",
    "pokemons":[
      {
        "id":140,
        "nickname":"Jacey",
        "species":"Kakuna",
        "trainer_id":1
      },
      {
        "id":141,
        "nickname":"Zachariah",
        "species":"Ditto",
        "trainer_id":1
      },
      // ...
    ]
  }
  // ...
]


#=> Example Request
DELETE /pokemons/:pokemon_id

#=> Example Response
{
  "id":147,
  "nickname":"Gunnar",
  "species":"Weepinbell",
  "trainer_id":1
}
