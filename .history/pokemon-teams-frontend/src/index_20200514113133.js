const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainers() {
    fetch(TRAINERS_URL, {
  method: "GET",
//   body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  },
//   credentials: "same-origin",
//   mode: "no-cors",
//   mode: "cors",
//   mode: "same-origin",
}).then(function(response) {
//   response.status     //=> number 100–599
//   response.statusText //=> String
//   response.headers    //=> Headers
//   response.url        //=> String
  console.log(response)
//   return response.text()
}, function(error) {
  error.message //=> String
})

}
getTrainers();