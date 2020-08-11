const BASE_URL = "http://localhost:3001"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let trainers = []
let species = []
const trainersMain = document.getElementById('main')
const form = document.getElementById('pokemon-form')
form.style.display = "none";

function fetchTrainers() {
  return fetch(TRAINERS_URL)
  .then(resp => resp.json())
}

function displayTrainers(json){
  // console.log(Object.keys(json.data[0]))
  // console.log(json.data[0].attributes.name)
  // console.log(json)
  trainers = json.data
  species = json.included
  //build card
  //build paragraph
  //build list of pokemnos
    //build release button for pokemon and append
  for (const object of json.data) {
    let  card = cardDiv()
    let trainerName = object.attributes.name
    let  cardTrainer =  trainer(trainerName, object.id)
    let pokemons = getPokemons(object.attributes.pokemons)
  
    card.appendChild(cardTrainer)
    card.appendChild(pokemonButton(card))
    card.appendChild(pokemons)
    trainersMain.appendChild(card)
  }
}

function cardDiv(){
  let  card = document.createElement('div')
  card.className = 'card'
  let cardId = Math.random().toString(36).substring(7)
  card.id = cardId
  return card
}

function trainer(trainerName, id){    
  let  cardParagraph = document.createElement('p')
  cardParagraph.id = id
  cardParagraph.innerHTML = trainerName
  return cardParagraph
}

function pokemonButton(card) {
  let addPokemonButton = document.createElement('button')
  let pokemonButtonnId = Math.random().toString(36).substring(7)
  addPokemonButton.id = pokemonButtonnId
  addPokemonButton.innerHTML = 'Add Pokemon'
    
    let message = pokemonButtonSpan()
    addPokemonButton.appendChild(message)
    card.addEventListener("mouseover", () => {
      if (card.children[2].childElementCount >= 5){
        message.style.display = 'block'
        addPokemonButton.disabled = true
      } 
    })
    
    card.addEventListener("mouseout", () => {
      if (card.children[2].childElementCount >= 5){
        addPokemonButton.disabled = false
        message.style.display = 'none'      
      } 
    })

    addPokemonButton.onclick = function(){
      dropDownMenuTrainers(card)
      dropDownMenuSpecies()
      form.style.display = 'block'
      var trainersDropdown = document.getElementById('trainers')
      trainersDropdown.disabled = false
    }
  return addPokemonButton
}

function pokemonButtonSpan(){
  let message = document.createElement('span')
  message.style = 'margin-left: 5px; padding-left: 2px;'
  message.innerHTML = 'You have reached max amount of pokemons, please release one and add one!'
  message.style.display = 'none'

  return message
}

function getPokemons(pokemons) {
  let  ulCard = pokemonUl()
  // let ulCardId = Math.random().toString(36).substring(7)
  // ulCard.id = ulCardId

  for(const poke of pokemons){
    ulCard.appendChild(pokemonLi(poke.species, poke.nickname, poke.id))
  }
  return ulCard
}

function pokemonUl() {
  let  ulCard = document.createElement('ul')
  let ulCardId = Math.random().toString(36).substring(7)
  ulCard.id = ulCardId
  return ulCard
}

function pokemonLi(specie, nickname, id) {
  let  liPokemon = document.createElement('li')
  liPokemon.id = id
  liPokemon.innerHTML = `${specie} (${nickname})`

  liPokemon.appendChild(releaseButton())
  return liPokemon
}

function releaseButton() {
  let  releaseButton = document.createElement('button')
  let releaseButtonId = Math.random().toString(36).substring(7)
  releaseButton.id = releaseButtonId
  releaseButton.className = 'release'
  releaseButton.innerHTML = 'Release'

  releaseButton.onclick =  function() {
    var id  = this.parentNode.closest('li').id
    this.parentNode.remove()
    deletePokemnon(id)
  }

  return releaseButton
}

function deletePokemnon(id) {
  objectUrl = `${POKEMONS_URL}/${id}`

  let params = {
      id: id
    }

    let configObj = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(params)
    }

    fetch(objectUrl, configObj)
    .then(function(response) {
      response.json()
    })
    .catch(function(error){
      alert(error)
    })     
}

function dropDownMenuTrainers(card){
  let trainerId = document.getElementById('buttonId')
  const trainerSelect = document.getElementById('trainers')
    for (const trainer of trainers){
      let dropDownOption = document.createElement('option')
      let dropDownOptionId = Math.random().toString(36).substring(7);
      dropDownOption.id = dropDownOptionId
      dropDownOption.value = trainer.id
        if(card.firstChild.id == trainer.id){
          dropDownOption.selected = true
        }
      dropDownOption.innerHTML = trainer.attributes.name
      trainerSelect.appendChild(dropDownOption)
    }
  return trainerSelect
}

function dropDownMenuSpecies(){
  const specieSelect = document.getElementById('species')
    for (const poke of species){
      let dropDownOption = document.createElement('option')
      let dropDownOptionId = Math.random().toString(36).substring(7);
      dropDownOption.id = dropDownOptionId
      dropDownOption.value = poke.id
      dropDownOption.innerHTML = poke.attributes.species
      specieSelect.appendChild(dropDownOption)
    }
  return specieSelect
}

let cancelPokemon = document.getElementById('cancel')
cancelPokemon.addEventListener("click", function(event) {
  form.style.display = "none";
})

form.addEventListener("submit", function(event){
  event.preventDefault()
  addPokemonToList()
})

let trainerTextBox = document.getElementById('new-trainer')
trainerTextBox.addEventListener("change", function(event) {
  var trainersDropdown = document.getElementById('trainers')
  trainersDropdown.value = ''
  trainersDropdown.disabled = true
})

let specieTextBox = document.getElementById('new-specie')
specieTextBox.addEventListener('change', () => {
  var speciessDropdown = document.getElementById('species')
  speciessDropdown.disabled = true
})


function addPokemonToList(){
  let dropdownSpecies = document.getElementById("species")
  let dropdownTrainers= document.getElementById('trainers')

  let pokemonNickname = document.getElementById("pokemon-nickname").value
  let newTrainer = document.getElementById("new-trainer").value
  let newSpecie = document.getElementById("new-specie").value

  let trainerId = dropdownTrainers.value
  let specieValue = dropdownSpecies.value
  
  if (!trainerId && !specieValue){
    updateDOM(specie, pokemonNickname, trainerId, newTrainer)
    let params = {
      species: newSpecie,
      nickname: pokemonNickname,
      name: newTrainer 
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(params)
    }
    
    form.style.display = "none";
  
    fetch(POKEMONS_URL, configObj)
    .then(function(response) {
      return response.json()
    })
    .catch(function(error){
      console.dir(error)
    })
  } else if(!specieValue){
    updateDOM(specie, pokemonNickname, trainerId, newTrainer)
    let params = {
      species: newSpecie,
      nickname: pokemonNickname,
      trainer_id: trainerId
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(params)
    }
    
    form.style.display = "none";
    fetch(POKEMONS_URL, configObj)
    .then(function(response) {
      return response.json()
    })
    .catch(function(error){
      console.dir(error)
    })
  } else if(!trainerId){
    let specie = dropdownSpecies.options[dropdownSpecies.selectedIndex].text
    updateDOM(specie, pokemonNickname, trainerId, newTrainer)

    let params = {
      species: specie,
      nickname: pokemonNickname,
      name: newTrainer 
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(params)
    }
  
    form.style.display = "none";
    fetch(POKEMONS_URL, configObj)
    .then(function(response) {
      return response.json()
    })
    .catch(function(error){
      console.dir(error)
    })
  }
  // } else {
  //   let specie = dropdownSpecies.options[dropdownSpecies.selectedIndex].text
  //   updateDOM(specie, pokemonNickname, trainerId, newTrainer)
  //   let params = {
  //     species: specie,
  //     nickname: pokemonNickname,
  //     trainer_id: trainerId
  //   }

  //   let configObj = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify(params)
  //   }

  //   // form.style.display = "none";
  //   fetch(POKEMONS_URL, configObj)
  //   .then(function(response) {
  //     return response.json()
  //   })
  //   .catch(function(error){
  //     console.dir(error)
  //   })
  // } 
}

function updateDOM(specie, nickName, trainerId, trainerName){
  if (trainerId){
    let trainer = document.getElementById(trainerId)
    // if(!species.includes(specie)){
      // species.push(specie)
    // } else {
      trainer.closest('div').getElementsByTagName('ul')[0].appendChild(pokemonLi(specie, nickName))
    // }
  } else{
    let card = cardDiv()
    let  cardTrainer =  trainer(trainerName)
    card.appendChild(cardTrainer)
    card.appendChild(pokemonButton(card))
    let  ulCard = pokemonUl()
    ulCard.appendChild(pokemonLi(specie, nickName, trainerId))
    card.appendChild(ulCard)
    trainersMain.appendChild(card)
  }
}


document.addEventListener('DOMContentLoaded', function() {
  // displayTrainers(fetchTrainers() .then)
  fetchTrainers() 
  .then(json => displayTrainers(json))
  
})





