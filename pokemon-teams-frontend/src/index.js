const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch (TRAINERS_URL).then((res)=>res.json()).then((json)=>{

  json.data.forEach(function(item){
    const div=document.createElement('div')
    const main=document.querySelector('main')
    main.appendChild(div)
    div.className="card"
    div.setAttribute("data-id",item.id)
    div.innerHTML=`<p>${item.attributes.name}</p>`
    const btn=document.createElement('button')
    div.appendChild(btn)
    btn.innerHTML="Add Pokemon"
    btn.setAttribute("data-trainer-id",item.id)
    btn.addEventListener('click',(e)=>{
    let trainerId=div.getAttribute("data-id")

      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: trainerId})
      }

      fetch(POKEMONS_URL, configObj).then((res)=>(res.json()))

      location.reload();
    })


    const ul=document.createElement('ul')
    div.appendChild(ul)
      item.attributes.pokemons.forEach(function (i) {
        const li=document.createElement('li')
        ul.appendChild(li)
        li.innerHTML=i.nickname
        release_btn=document.createElement('button')
        li.appendChild(release_btn)
        release_btn.className="release"
        release_btn.innerHTML="Release"
        release_btn.setAttribute("data-pokemon-id",i.id)
        release_btn.addEventListener('click',(e)=> {
          pokemon_id=e.target.getAttribute("data-pokemon-id")
          let configObj = {
            method: "delete"
          }

          fetch(POKEMONS_URL+`/${pokemon_id}`, configObj).then((res)=>(res.json()))

        })

      })
  })

})
