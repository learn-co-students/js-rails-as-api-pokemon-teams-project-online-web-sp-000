const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
	renderCards()
});

function renderCards() {
	fetch(TRAINERS_URL).then(resp => resp.json()).then(trainers => {
		trainers.forEach(trainer => renderTrainer(trainer));
	})
}

function renderTrainer(trainer) {
	const body = document.getElementsByTagName('main')[0];
	const card = document.createElement("div");

	const name = document.createElement("p");
	name.innerText = trainer.name
	card.appendChild(name);

	const btn = document.createElement("button");
	btn.innerText = 'Add Pokemon'
	btn.addEventListener('click', e => addPokemon(e))
	btn.setAttribute('data-trainer-id', trainer.id)
	card.appendChild(btn);
	
	card.className = 'card';
	card.setAttribute('data-id', trainer.id)
	
	appendPokemons(card, trainer)

	body.appendChild(card);
}

function appendPokemons(card, trainer) {
	const ul = document.createElement("ul");
	trainer.pokemons.forEach(pok => {
		appendLi(pok, ul)
	});
	card.appendChild(ul);
}

function addPokemon(e) {
	const id = e.target.getAttribute('data-trainer-id')
	const obj_data = { 
		id_trainer: id
	};

	const configObj = {
	  method: "POST",
	  headers: {
	    "Content-Type": "application/json",
	    'accept': "application/json"
	  },
	  body: JSON.stringify(obj_data)
	};

	fetch(POKEMONS_URL, configObj)
		.then(response => {return response.json()})
		.then(json => {debugger})
}

function appendPokemon(json) {
	
}

function appendLi(pok, ul) {
	const li = document.createElement("li");
	li.innerText = `${pok.nickname} (${pok.species})`

	const btn = document.createElement("button");
	btn.setAttribute('data-pokemon-id', pok.id);
	btn.innerText = 'Release Pokemon';
	btn.className = 'release';
	
	li.appendChild(btn);

	ul.appendChild(li);
}


// <div class="card" data-id="1"><p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>