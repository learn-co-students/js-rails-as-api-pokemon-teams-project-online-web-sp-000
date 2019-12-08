const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

getTrainers() {
    return fetch(TRAINERS_URL).then(res => res.json()
    )
}

getPokemons() {
    return fetch(POKEMONS_URL).then(res => res.json()
    )
}