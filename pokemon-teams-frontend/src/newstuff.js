From Kenlyn Terai to Everyone:  03:56 PM
fetch("http://localhost:3000/pokemons", configObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(pokemon) {
        if (pokemon.message) {
            alert(pokemon.message)
        } else {
            let element = `<li id=${pokemon.id}>${pokemon.nickname} (${pokemon.species}) <button class="release" onClick=releasePokemon(event) data-pokemon-id="${pokemon.id}">Release</button></li>`
            let trainerCard = document.querySelectorAll(`[data-id="${pokemon.trainer_id}"]`)[0]
            trainerCard.getElementsByTagName("ul")[0].innerHTML += element
        }
    })
    .catch(function(error) {
        alert("Bad things! Ragnarők!");
        console.log(error.message);
    });
