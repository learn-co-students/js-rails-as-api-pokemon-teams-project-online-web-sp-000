const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch (TRAINERS_URL).then((res)=>res.json()).then((json)=>{

  json.data.forEach(function(item){
    const div=document.createElement('div')
    const main=document.querySelector('main')
    main.appendChild(div)
    div.className="card"
    div.innerHTML=`<p>${item.attributes.name}</p>`
    const btn=document.createElement('button')
    div.appendChild(btn)
    btn.innerHTML="Add Pokemon"
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
      })
  })
})
