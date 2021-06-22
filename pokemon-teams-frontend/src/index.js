const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const PPP = `${BASE_URL}/pokemons/:id`
//DON'T USE FAST JSON FOR THIS PROJECT!!!


 fetch(TRAINERS_URL)
.then(response => response.json())
.then(makeProject) 

function makeProject(object){
    const pokes = [];
    const trainerNames = object.map(t => {return t.name});
    object.forEach(t => {t.pokemons.map(p => {pokes.push(p)})});
    object.forEach(trainer => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        div.setAttribute("class", "card");
        div.setAttribute("data_id", `${trainer.id}`);
        const button = document.createElement('button');
        button.innerHTML = "Add Pokemon";
        const main = document.querySelector('main');
        p.innerText = trainer.name;
        div.appendChild(p)
        div.appendChild(button);
        const results = [];
        pokes.filter(po => {if (po.trainer_id === trainer.id){results.push(po)} });
        const uList = document.createElement('ul');
        results.forEach(mon => {
            const list = document.createElement('li');
            const buttonTwo = document.createElement('button');
            buttonTwo.innerText = "Release";
            buttonTwo.setAttribute("class", "release");
            buttonTwo.setAttribute("data-pokemon-id", `${mon.id}`)
            list.innerText = `${mon.nickname} (${mon.species})`;
            list.appendChild(buttonTwo);
            uList.appendChild(list);
            div.appendChild(uList);

                    buttonTwo.addEventListener('click', buttonGone);
                    function buttonGone(event){
                    event.target.parentNode.innerText = "";
                    //fetch(POKEMONS_URL + '/' + event.target.dataset.pokemonId, {method: 'DELETE'})
                    }

                    /*const configObject = {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                            //Accept: "application/json"
                        },
                        
                    }

                    buttonTwo.addEventListener('click', buttonGone);
                    function buttonGone(event){
                        fetch(POKEMONS_URL, configObject)
                        .then(response => response.json())
                        .then(json => console.log(json))
                        //.catch(err => console.log(err))
                    }*/

        })
        main.appendChild(div);


                    button.addEventListener('click', colorChange);
                    function colorChange(event){
                    event.target.style.background = "blue";
                    }

    })


}


