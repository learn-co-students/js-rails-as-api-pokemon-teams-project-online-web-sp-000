const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  loadTrainers();
})

function loadTrainers() {
    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(function(trainers) {
            for (trainer of trainers) {
                const main = document.querySelector("main")
                const div = document.createElement("div");
                const p = document.createElement("p");
                const addBtn = document.createElement("button");
                const ul = document.createElement("ul")

                div.className = "card";
                div.setAttribute('data-id' , trainer.id);

                p.innerText = trainer.name;
                div.appendChild(p);

                addBtn.innerText = "Add Pokemon";
                addBtn.setAttribute('data-trainer-id', trainer.id)
                addBtn.addEventListener("click", addPokemon)
                div.appendChild(addBtn);

                for (pokemon of trainer.pokemons) {
                    const li = document.createElement("li");
                    const deleteBtn = document.createElement("button");

                    li.innerText = `${pokemon.nickname} (${pokemon.species})`;

                    deleteBtn.innerText = "Release";
                    deleteBtn.className = "release";
                    deleteBtn.setAttribute('data-pokemon-id', pokemon.id);
                    deleteBtn.addEventListener("click", deletePokemon);
                    li.appendChild(deleteBtn);
                    ul.appendChild(li);
                }

                div.appendChild(ul)
                main.appendChild(div);
        };
    })
}

function addPokemon(e) {
    const trainerId = e.target.getAttribute('data-trainer-id');

    let formData = {
        trainer_id: trainerId
    };

    // let configObject = {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(formData)
    // };
   
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        //   "Accept": "application/json"
        },
        body: JSON.stringify()
      })
        .then(response => console.log(response.json()))
        .then(function(object) {
            // const newPokemon = newPokemons[0];
            console.log(object)
            // getTrainer(trainerId)
        });
}

// function getTrainer(trainerId) {

// }

function deletePokemon(e) {

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