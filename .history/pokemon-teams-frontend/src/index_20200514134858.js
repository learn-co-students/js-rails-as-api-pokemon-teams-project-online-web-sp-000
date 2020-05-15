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
}).then(function(response){
//   response.status     //=> number 100–599
//   response.statusText //=> String
//   response.headers    //=> Headers
//   response.url        //=> String
  console.log(response)
  return response.json()
// }, function(error) {
  // error.message //=> String
})
// .then(function(trainer) {
//   console.log(trainer)
// }
.then(trainer => {console.log(trainer)} )

}
getTrainers();

