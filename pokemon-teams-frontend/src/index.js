const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main=document.querySelector('main')

fetch(TRAINERS_URL)
  .then(res=>res.json())
  .then(json=>{
    json.data.forEach(card)
  })

function card(trainer) {
  const div=document.createElement('div')
  const addBtn=document.createElement('button')

  const pokemons=trainer.attributes.pokemons
  main.appendChild(div)
  div.innerHTML=`<p>${trainer.attributes.name}</p>`
  div.className='card'
  div.setAttribute('data-id', trainer.id);
  div.appendChild(addBtn)
  addBtn.innerHTML='Add Pokemon'
  addBtn.setAttribute('data-trainer-id', trainer.id);
  ul=document.createElement('ul')
  div.appendChild(ul)
  pokemons.forEach((i)=>{
    ul.innerHTML+=`<li>${i.nickname} (${i.species}) <button class="release" data-pokemon-id=${i.id}>Release</button></li>`
  })
  addBtn.addEventListener('click',addPokemon)
  document.querySelectorAll('.release').forEach(btn=>{
    btn.addEventListener('click',release)
  })
}

function addPokemon(event) {
  fetch(POKEMONS_URL,{
    method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },

      body :JSON.stringify({
        trainer_id:event.target.getAttribute("data-trainer-id")

      })
  })
    .then(res=>res.json())
    .then(json=>{
      const ulElement=event.target.nextSibling
      if (ulElement.childElementCount<6) {
        const li=document.createElement('li')
        const btn=document.createElement('button')
        ulElement.appendChild(li)
        li.appendChild(btn)
        btn.className='release'
        btn.innerHTML='Release'
        btn.setAttribute('data-pokemon-id', json.id)
        li.innerHTML+=`${json.nickname} (${json.species})`
      }

    })
}

function release(event) {
  const id=event.target.getAttribute('data-pokemon-id')
  fetch(`${POKEMONS_URL}/${id}`, {
    method: 'DELETE',
    headers: {'content-type': 'application/json'},
  }).then(res=>res.json())
    .then(json=>{

      const liElement=event.target.parentElement
      liElement.remove();
    })

}
