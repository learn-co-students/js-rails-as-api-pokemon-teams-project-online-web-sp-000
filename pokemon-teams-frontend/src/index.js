
document.addEventListener('DOMContentLoaded', () => {
    getTrainers()
  })
  
  const main = () => {
    return document.querySelector('main')
  }
  
  const getTrainers = () => {
    fetch('http://localhost:3000/trainers')
    .then(r => r.json())
    .then(data => renderTrainers(data))
  }
  
  const renderTrainers = (trainersData) => {
    trainersData.forEach(trainer => renderTrainerCard(trainer))
  }
  
  const renderTrainerCard = (trainerObj) => {
    let trainerCard = document.createElement('div')
    trainerCard.className = "card"
    trainerCard.dataset.id = trainerObj.id
    trainerCard.innerHTML = `
      <p>${trainerObj.name}</p>
      <button data-trainer-id=${trainerObj.id}>Add Pokemon</button>
    `
    trainerCard.lastElementChild.addEventListener('click', handleAddPokemon)
    main().appendChild(trainerCard)
    let pokemonsList = document.createElement('ul')
    trainerCard.appendChild(pokemonsList)
    trainerObj.pokemons.forEach(pokemon =>
      renderPokemon(pokemon, pokemonsList)
    )
  }
  
  const renderPokemon = (pokemon, list, e) => {
    let pokemonCard = document.createElement('li')
    pokemonCard.id = `pokemon-${pokemon.id}`
    pokemonCard.innerText = `${pokemon.nickname} (${pokemon.species})`
    let releaseBtn = document.createElement('button')
    releaseBtn.className = "release"
    releaseBtn.dataset.pokemonId = pokemon.id
    releaseBtn.innerText = "Release"
    releaseBtn.addEventListener('click', handleReleasePokemon)
    pokemonCard.appendChild(releaseBtn)
    if(!list){
      list = e.target.parentElement.lastElementChild
    }
    list.appendChild(pokemonCard)
  }
  
  const handleReleasePokemon = (e) => {
    fetch(POKEMONS_URL+`/${e.target.dataset.pokemonId}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(pokemon => removePokemon(pokemon.id))
  }
  
  const removePokemon = (id) => {
    let cardToRemove = document.getElementById(`pokemon-${id}`)
    cardToRemove.parentElement.removeChild(cardToRemove)
  }
  
  const handleAddPokemon = (e) => {
    console.log("adding pokemon...")
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        trainer_id: e.target.dataset.trainerId
      })
    }
    fetch(POKEMONS_URL, configObj)
    .then(r => r.json())
    .then(data => addPokemonToDom(data, e))
  }
  
  const addPokemonToDom = (data, e) => {
    if(data.message){
      alert(data.message)
    } else {
      renderPokemon(data, undefined, e)
    }
  }