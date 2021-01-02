const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


async function getapi(url) {
    let roster = document.querySelector('#roster');
    fetch(url).then(response => response.json()).then(object => {
        console.log(object);
        for (const [i,trainer] of object.entries()) {
            let trainerCard = document.createElement('div');
            trainerCard.className = "card";
            trainerCard.setAttribute('data-id' , i+1); 
            trainerCard.innerHTML = trainer.name;
            let addPokemonButton = document.createElement('button');
            addPokemonButton.innerHTML = "Add Pokemon";
            addPokemonButton.addEventListener("click", addPokemon);
            addPokemonButton.setAttribute('data-id' , i+1); 
            trainerCard.appendChild(addPokemonButton);

            let teamList = document.createElement('ul');
            trainerCard.appendChild(teamList);

            for (const p of object[i].pokemon) {
                console.log(p);
                let pokemonMember = document.createElement('li');
                pokemonMember.innerHTML = `${p.nickname} (${p.species})`;
                pokemonMember.setAttribute('data-pokemon-id', p.id);
                let releasePokemonButton = document.createElement('button');
                releasePokemonButton.innerHTML = "Release";
                releasePokemonButton.setAttribute('data-id' , p.id);
                releasePokemonButton.setAttribute('class' , 'release'); 
                // releasePokemonButton.addEventListener("click", function(e)
                // {
                //   alert("REMOVE: " + e.target.pokemonMember.innerHTML);
                // });
                releasePokemonButton.addEventListener("click", releasePokemon);
                pokemonMember.appendChild(releasePokemonButton);
                teamList.appendChild(pokemonMember);
            }
            roster.appendChild(trainerCard);
          }
        });
}

function listTrainers() {
    getapi(TRAINERS_URL);
}

function releasePokemon(e) {
    console.log(`Goodbyeeee ${e.target.dataset.id}`);
    let boot = e.target.dataset.id;
    // remove_pokemon(boot);
    // On Click - delete pokemon.id from database
    ajax({
        type: "DELETE",
        // url: "{{ URL::route('someroute') }}"
        url: "{{ URL::to('trainer/remove_pokemon') }}"

    });
    async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
 
    const success = await employees.delete(id);
 
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
 
    // $.post(pokemon_path(boot),
    // {
    //     name: "Donald Duck",
    //     city: "Duckburg"
    // },
    // function(data, status){
    //     alert("Data: " + data + "\nStatus: " + status);
    // });
}
function addPokemon() {
    console.log('Morning!');
}
listTrainers();

//     document.getElementById("trainers").innerHTML += tab; 

//     {/* <div class="card" data-id="1"><p>Prince</p>
//             <button data-trainer-id="1">Add Pokemon</button>
//             <ul>
//             <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//             <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//             <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//             <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//             <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//             </ul>
//         </div>

