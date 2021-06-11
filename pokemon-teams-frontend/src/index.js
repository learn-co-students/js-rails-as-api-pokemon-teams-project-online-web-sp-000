const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementsByTagName("main")[0];

document.addEventListener("DOMContentLoaded", () => {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => renderTrainers(json))
});

function renderTrainers(jsonObj) {
    for (const t of jsonObj) {
        const trainerDiv = document.createElement("div");
        trainerDiv.className = "card";
        trainerDiv.id = t.id;
        main.appendChild(trainerDiv);
        const trainerP = document.createElement("p");
        trainerP.innerHTML = t.name;
        trainerDiv.appendChild(trainerP)
        //add pokemon button
        const addPkmnBtn = document.createElement("button");
        addPkmnBtn.innerHTML = "Add Pokemon";
        addPkmnBtn.addEventListener("click", function (e) {
            addNewPkmn(t.id)
        });
        trainerDiv.appendChild(addPkmnBtn);
        const pkmnUl = document.createElement('ul');
        //display trainers current pokemon
        trainerDiv.appendChild(pkmnUl);
        for (const pkmn of t.pokemons)
        {
            addPkmn(pkmn)
        }
    }
}

function addPkmn(pkmn) {
    const trainerDiv = document.getElementById(pkmn.trainer_id);
    const pkmnUl = trainerDiv.lastChild;
    const pkmnLi = document.createElement("li");
    const releasePkmnBtn = document.createElement("button");
    releasePkmnBtn.className = "release";
    releasePkmnBtn.innerHTML = "Release";
    releasePkmnBtn.addEventListener("click", function(e){
        //remove pokemon from trainer
        let removePkmnObj = { method: "DELETE"}
        fetch (POKEMONS_URL + "/" + pkmn.id, removePkmnObj)
        pkmnUl.removeChild(e.target.parentElement)
    })
    pkmnLi.innerHTML = pkmn.nickname + " (" + pkmn.species +") ";
    pkmnLi.appendChild(releasePkmnBtn);
    pkmnUl.appendChild(pkmnLi);
    trainerDiv.appendChild(pkmnUl);
}

function addNewPkmn(trainer_id) {
    let formData = {
        "trainer_id": trainer_id
    };
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };
    //add new pokemon to appropriate trainer
    fetch(POKEMONS_URL, configObj)
    .then(response => response.json())
    .then(function(jsonPkmn){
        if (jsonPkmn.id) {
            addPkmn(jsonPkmn)
        }
    });
}