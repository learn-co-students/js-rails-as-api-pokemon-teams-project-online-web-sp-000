
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`

    function fetchTrainers(){
        fetch('http://localhost:3000/trainers').then(function(response){
            return response.json();
        }).then(function(json){
            renderTrainers(json)
        });
    }

    function renderTrainers(json){
        
        const main = document.querySelector('main');
        json.data.forEach(trainer => {
            
            const div = document.createElement('div');
            const p = document.createElement('p');
            const btn = document.createElement('button');
            const ul = document.createElement('ul');
            
            btn.setAttribute('data-trainer-id', `${trainer.id}`)
            btn.innerText = 'Add Pokemon'
            div.setAttribute('class', 'card')
            div.setAttribute('data-id', `${trainer.id}`)
            p.innerText = trainer.attributes.name
            
            trainer.attributes.pokemons.forEach(pokemon => {
                const li = document.createElement('li');
                const releaseButton = document.createElement('button')
                releaseButton.setAttribute('class', 'release')
                releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`)
                li.innerText = `${pokemon.nickname} (${pokemon.species})`
                
                li.appendChild(releaseButton);
                ul.appendChild(li);
            })
            
            div.appendChild(p);
            div.appendChild(btn);
            div.appendChild(ul);

            main.appendChild(div);

           
        });
        activateAddButton()
    }

   


document.addEventListener('DOMContentLoaded', function(){
    fetchTrainers()
    
})

function activateAddButton(){
    xhttp = new XMLHttpRequest()
    let addButtons = document.querySelectorAll('[data-trainer-id]');
    for (let i = 0; i < addButtons.length; i++){
        let addButton = addButtons[i]
        addButton.addEventListener('click', function(){
            xhttp.open('POST', 'http://localhost:3000/pokemons', true)
            xhttp.send()
        })

    }
}
