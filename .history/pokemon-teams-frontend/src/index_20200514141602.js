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


/*

 <div class="card" data-id="1">
      <p>Trainer</p>
      <BUTTON data-trainer-id="1">Add Pokemon</BUTTON>
      <ul>
        <li>
          Jacey (Kakuna)
          <button class="release" data-pokemon-id="140">Release</button>
        </li>
        <li>
          Zachariah (Ditto)
          <button class="release" data-pokemon-id="141">Release</button>
        </li>
        <li>
          Mittie (Farfetch'd)
          <button class="release" data-pokemon-id="149">Release</button>
        </li>
        <li>
          Rosetta (Eevee)
          <button class="release" data-pokemon-id="150">Release</button>
        </li>
        <li>
          Rod (Beedrill)
          <button class="release" data-pokemon-id="151">Release</button>
        </li>
      </ul>
    </div>

*/