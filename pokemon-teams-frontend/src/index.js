const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", () => {
    console.log("dom has loaded");
    getTrainers();
  });

  function getTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => renderTeams(json));
  }

  function renderTeams(json) {
      const pokemonTeamsContainer = document.querySelector('main')
      let trainerAndTeam = json.map(function(json) {
          return `
        <div class="card" data-id=${json.id}><p>${json.name}</p>
            <button data-trainer-id=${json.id}>Add Pokemon</button>
            <ul>
                <li>${json.pokemons[2]}<button class="release" data-pokemon-id="140">Release</button></li>
                <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
                <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
                <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
                <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
            </ul>
        </div>
        `
      })
          console.log(trainerAndTeam)
      }

  