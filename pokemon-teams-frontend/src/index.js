const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
	.then(resp => resp.json())
	.then(trainers => renderTrainers(trainers));

function renderTrainers(trainers){
	for (const trainer of trainers) {
		const div = document.createElement("div")
		div.className = "card"
		div.setAttribute('data-id', trainer.id)
		const main = document.getElementsByTagName("main")[0]
		main.appendChild(div)
		const p = document.createElement("p")
		p.innerHTML = trainer.name
		const addBtn = document.createElement("button")
		addBtn.setAttribute("data-trainer-id", trainer.id)
		addBtn.innerHTML = "Add Pokemon"
		const ul = document.createElement("ul")
		div.append(p, addBtn, ul)
		for (const pokemon of trainer.pokemons){
			const li = document.createElement("li")
			const releaseBtn = document.createElement("button")
			releaseBtn.className = "release"
			releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
			releaseBtn.innerHTML = "Release"
			releaseBtn.addEventListener('click', (e) => {
				const id = e.currentTarget.getAttribute("data-pokemon-id")
				const li = e.currentTarget.parentElement
				li.remove()
				fetch(POKEMONS_URL + '/' + id, {
					method: 'delete'
				})
			})
			li.innerHTML = pokemon.nickname + " (" + pokemon.species +") "
			li.append(releaseBtn)
			ul.append(li)		
		}
		addBtn.addEventListener("click", (e) => {
	    	const id = e.currentTarget.getAttribute("data-trainer-id")
			if(e.currentTarget.nextSibling.childElementCount < 6) {
				data = {trainer_id: id}
				fetch(POKEMONS_URL, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
			    		"Accept": "application/json"
					},
					body: JSON.stringify(data)
				})
				.then(resp => resp.json())
				.then(newPokemon => {
					const li = document.createElement("li")
					const releaseBtn = document.createElement("button")
					releaseBtn.className = "release"
					releaseBtn.setAttribute("data-pokemon-id", newPokemon.id)
					releaseBtn.innerHTML = "Release"
					releaseBtn.addEventListener('click', (e) => {
						const id = e.currentTarget.getAttribute("data-pokemon-id")
						const li = e.currentTarget.parentElement
						li.remove()
						fetch(POKEMONS_URL + '/' + id, {
							method: 'delete'
						})
					})
					li.innerHTML = newPokemon.nickname + " (" + newPokemon.species +") "
					li.append(releaseBtn)
					ul.append(li)	
				})
			}
		})
	}
}

function deletePokemon(e){
	const id = e.currentTarget.getAttribute("data-pokemon-id")
	const li = e.currentTarget.parentElement
	li.remove()
	fetch(POKEMONS_URL + '/' + id, {
		method: 'delete'
	})
}
