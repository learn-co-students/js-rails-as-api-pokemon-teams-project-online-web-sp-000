const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(response => {
        // console.log(response)
        return response.json()
        }
    )
.then(trainer => console.log(trainer))
}

getTrainers();

function renderTrainers(){
    
}