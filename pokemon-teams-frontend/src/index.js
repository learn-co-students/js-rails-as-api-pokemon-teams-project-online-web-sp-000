const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        grabTrainerAndPokemons(data)
    })
    
    function grabTrainerAndPokemons(array){
    
        array.forEach(element => {
    
            let separate = document.getElementsByTagName('main')[0]
            
            let div = document.createElement('div')
    
            let header = document.createElement('h3')
    
            let list = document.createElement('ul')

            let add = document.createElement('p')
    
            let btn = document.createElement('BUTTON')
            btn.innerText = "Add a pokemon"
            btn.id = "add-pokemon"
            btn.dataset.id = element.id 

            add.appendChild(btn)
            div.appendChild(add)
            
        
            div.appendChild(header) 

            header.innerText = `${element.name}`
            header.id = element.id

            separate.appendChild(div)


            btn.addEventListener('click', function(e){
                if (list.children.length < 6){
                    addPokemon(element);
                }
                else {
                    alert("Max number of pokemon reached");
                }
            })
            
        
        element.pokemons.forEach(element => {
           
            let item = document.createElement('li')
            list.appendChild(item)
            
            item.innerText = `${element.nickname}(${element.species}) `   

            let btn2 = document.createElement('BUTTON')
            btn2.innerText = "Release Pokemon"
            btn2.style.backgroundColor = 'red'
            btn2.id = "release"
            item.appendChild(btn2)
            div.appendChild(list)

            btn2.addEventListener('click', function(event){
                removePokemon(element, item);
                
            })

            })

        })
    }

function addPokemon(element){
    let id = element.id 

    let formData = {
        trainer_id : id 
    }

   fetch(POKEMONS_URL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
          
           let list = document.getElementById(`${json.trainer_id}`)

           let newItem = document.createElement('li')
           newItem.innerText = `${json.nickname}(${json.species}) `

           
           let btn2 = document.createElement('BUTTON')
            btn2.innerText = "Release Pokemon"
            btn2.style.backgroundColor = 'red'
            btn2.id = "release"


            list.nextSibling.appendChild(newItem)
            newItem.appendChild(btn2)

            btn2.addEventListener('click', function(e){
                removePokemon(json, newItem)
            })
        })
}


function removePokemon(pokemon, element){

    return fetch(POKEMONS_URL + '/' + `${pokemon.id}`,
     {
         method: 'DELETE',
         headers: {
             'Content-Type': 'application/json',
             Accept: 'application/json'
             
        }
    })
    .then(response => response.json())
    .then(response => {
      element.remove();
      
    })

}


