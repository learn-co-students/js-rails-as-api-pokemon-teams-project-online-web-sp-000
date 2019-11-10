const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(function(response){
    return response.json();
})
.then(function(json){
    console.log(json);
    let main = document.querySelector('main');
    json.forEach(function(trainer, index){       
        let div = document.createElement('div');
        div.classList.add('card');
        div.setAttribute("data-id", trainer.id);
        main.appendChild(div);
        let p = document.createElement('p');
        p.innerHTML = trainer.name;
        div.appendChild(p);
        let abutton = document.createElement('button');
        abutton.setAttribute("data-trainer-id", trainer.id);
        abutton.innerHTML = "Add Pokemon";
        let ul = document.createElement("ul");
        abutton.addEventListener("click", function(){
            //let name = Faker::Name.first_name;
            //let species = Faker::Games::Pokemon.name;
            let configurationObject = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                body: JSON.stringify({
                    trainer_id: trainer.id,
                    
                })
            }
            fetch(POKEMONS_URL, configurationObject)
            .then(function(response){
                return response.json();
            })
            .then(function(json){
                console.log(json);
                let newli = document.createElement("li");
                newli.innerHTML = `${json.nickname} (${json.species})`;
                ul.appendChild(newli);
                let newbutton = document.createElement("button");
                newbutton.classList.add("release");
                newbutton.setAttribute("data-pokemon-id", json.id);
                newbutton.innerHTML = "Release";
                newli.appendChild(newbutton)
            })
        })
        div.appendChild(abutton);
        
        div.appendChild(ul);
        trainer.pokemons.forEach(function(pokemon, index){
            let li = document.createElement("li");
            li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
            ul.appendChild(li);
            let rbutton = document.createElement("button");
            rbutton.classList.add("release");
            rbutton.setAttribute("data-pokemon-id", pokemon.id);
            rbutton.innerHTML = "Release";
            li.appendChild(rbutton);
            rbutton.addEventListener("click", () => destruction(pokemon))
        })
    })
})

    function destruction(pokemon){
        let objectForDestruction = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: pokemon.id,
                trainer_id: pokemon.trainer_id, 
                nickname: pokemon.name,
                species: pokemon.species
            })
        };
        fetch(`${BASE_URL}/pokemons/${pokemon.id}`, objectForDestruction)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            console.log(json);
            console.log(pokemon.id)
            //debugger
            let destroyedPokemon = document.querySelector("[data-pokemon-id=pokemon.id]");
            
            destroyedPokemon.remove();
        })
    }