const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
	loadTrainers();

})

function loadTrainers() {
	return fetch(TRAINERS_URL)
	.then(resp => resp.json())
	.then(trainers => {
		trainers.forEach(trainer => addTrainerCard(trainer))
	})
}

function addTrainerCard(trainer) {
	const main = document.querySelector("main"),
	pokemons = trainer.pokemons

	const ul = document.createElement("ul")
	pokemons.forEach(pokemon => ul.append(pokemonToLi(pokemon)))

	const btn = document.createElement("button")
	btn.dataset.trainerId = trainer.id
	btn.innerText = "Add Pokemon"
	btn.addEventListener("click", (e) => {
		addPokemon(e)
	})

	const divCard = document.createElement("div")
	divCard.dataset.id = trainer.id
	divCard.classList.add("card")
	divCard.innerHTML = `<p>${trainer.name}</p>`
	divCard.append(btn, ul)
	main.append(divCard)
}

function pokemonToLi(pokemon) {
	const li = document.createElement("li")
	li.innerText = `${pokemon.nickname} (${pokemon.species})`

	const btn = document.createElement("button")
	btn.dataset.pokemonId = pokemon.id
	btn.classList.add("release")
	btn.innerText = "release"
	btn.addEventListener("click", (e) => {
		removePokemon(e)
	})

	li.append(btn)
	return li
}

function addPokemon(e) {
	e.preventDefault()

	fetch(POKEMONS_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({
			trainer_id: e.target.dataset.trainerId
		})
	})
	.then(resp => resp.json())
	.then(pokemonObj => {
		e.target.nextSibling.append(pokemonToLi(pokemonObj))
	})
	.catch(function(error) {
		alert(error.message);
		console.log(error.message);
	})
}

function removePokemon(e) {
	e.preventDefault()
	const id = e.target.dataset.pokemonId

	fetch(`${POKEMONS_URL}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		}
	})
	.then(e.target.parentElement.remove())
	.catch(function(error) {
		alert(error.message);
		console.log(error.message);
	})
}
