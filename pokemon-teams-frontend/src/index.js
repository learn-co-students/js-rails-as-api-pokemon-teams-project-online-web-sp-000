const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
	return fetch(TRAINERS_URL)
		.then(resp => resp.json())
		.then(function(object) {
			// console.log(object);
			for (trainer of object) {
				// console.log(trainer.name);
				let card = document.createElement("div");
				card.classList.add("card");
				card.setAttribute("data-id", trainer.id);
				
				let main = document.getElementsByTagName("main")[0];
				main.appendChild(card);

				let trainerName = document.createElement("p");
				trainerName.textContent = trainer.name;
				card.appendChild(trainerName);
				
				let addPokeButton = document.createElement("button");
				addPokeButton.setAttribute("data-trainer-id", trainer.id)
				addPokeButton.textContent = "Add Pokemon"
				addPokeButton.addEventListener("click", addPokemon)
				card.appendChild(addPokeButton)				

				let ul = document.createElement("ul")
				card.appendChild(ul)

				for (pokemon of trainer.pokemons) {
					listPokemon(pokemon, ul)
				}
			};
		});
});

function listPokemon(pokemon, ul) {
		let li = document.createElement("li");
		li.textContent = `${pokemon.nickname} (${pokemon.species})`;
		ul.appendChild(li);

		let releaseButton = document.createElement("button");
		releaseButton.classList.add("release");
		releaseButton.setAttribute("data-pokemon-id", pokemon.id);
		releaseButton.textContent = "Release"
		releaseButton.addEventListener("click", releasePokemon)

		li.appendChild(releaseButton)
};

function releasePokemon(e) {
	let configObj = {
		method: "DELETE",
		headers: {
			"Content_Type": "application/json",
			Accept: "application/json"
		}
	}
	// console.log(e.target.getAttribute("data-pokemon-id"))
	return fetch(`${POKEMONS_URL}/${e.target.getAttribute("data-pokemon-id")}`, configObj)
		.then(resp => resp.json())
		.then(function(object) {
			console.log(e.target.parentElement.parentElement)
			e.target.parentElement.remove()
		});
};

function addPokemon(e) {
	let trainerId = e.target.getAttribute("data-trainer-id") 
	
	let configObj = {
		method: "POST",
		headers: {
			"Content_Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			"trainer_id": trainerId
		})
	}

	return fetch(POKEMONS_URL, configObj)
		.then(resp => resp.json())
		.then(function(pokemon_object) {
			// console.log(e.target.parentElement.getElementsByTagName("ul")[0])
			let ul = e.target.parentElement.getElementsByTagName("ul")[0];
			listPokemon(pokemon_object, ul);
		})
		.catch(function(error) {
			alert(error.message);
		})
};
