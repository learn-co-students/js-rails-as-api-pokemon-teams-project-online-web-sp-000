const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded",function(){
    fetchTrainers()
})

function fetchTrainers(){
    fetch( TRAINERS_URL)
        .then(resp=>resp.json())
        .then(json=>addTrainersToDom(json))
}

function addTrainersToDom(json){
    for (const trainer of json.data){
        let div = document.createElement("div")
        div.setAttribute("class", "card")
        div.setAttribute("data-id", trainer.id)
        
        let p = document.createElement('p')
        p.innerText = trainer.attributes.name

        let button = document.createElement('button')
        button.setAttribute("data-trainer-id",trainer.id)
        button.innerText = "Add Pokemon"
        button.addEventListener("click",function(e){ addPokemon(e)})

        let ul = document.createElement('ul')
        let array = trainer.relationships.pokemons.data
        for (const pokemon of array){
            fetch(`${POKEMONS_URL}/${pokemon.id}`)
            .then(resp=>resp.json())
            .then(json=>addLiTODom(json))
        }

        function addLiTODom(json){
            debugger
            let nickname = json.data.attributes.nickname
            let species = json.data.attributes.species
            let liText = nickname + `(${species})`
            let li = document.createElement('li')
            li.innerText = liText
        
            let button = document.createElement("button")
            button.setAttribute("class", "release")
            button.setAttribute("data-pokemon-id",json.data.id)
            button.innerText = "Release"
            button.addEventListener("click", (e)=>{releasePokemon(e)})
        
            li.append(button)
            ul.append(li)
        }

        function addPokemon(e){
            let trainer_id = e.target.getAttribute("data-trainer-id")
            let obj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({trainer_id: trainer_id})
                };
            
                
                fetch(POKEMONS_URL,obj)
                .then(resp=>resp.json())
                .then(json=>addLiTODom(json))
                .catch((error) => {
                    console.log(error)
            }) 

        }



        div.append(p,button,ul)

        document.body.append(div)
    }
}




function releasePokemon(e){
    
    let id = e.target.getAttribute("data-pokemon-id")
    let obj = {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(id)
    };

    
    fetch(`${POKEMONS_URL}/${id}`,obj)
    .then(resp=>resp.json())
    .then(json=>console.log(json))
    .catch(function(error) {
        alert("Bad things!");
        console.log(error.message);
})
   
    e.target.parentElement.remove()

}

