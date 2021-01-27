const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



fetch(TRAINERS_URL).then(resp => resp.json()).then(function(json) {

        all = json.data
        for (const trainer in all){
            let div = trainer_card(trainer)      
            document.body.appendChild(div)   
        }
    });




    function trainer_card(trainer){
        trainer_obj = all[trainer].attributes;
        trainer_id = all[trainer].id;
        trainer_name = trainer_obj.name;

//make the div
        let div = document.createElement('div');
        div.classList.add('card');
        div.setAttribute("data-id", trainer_id)


//make the p    
        let p = document.createElement('p')
        p.textContent = trainer_name

//make the new pokemon button        
        let btn = document.createElement('button');
        btn.setAttribute('data-trainer-id', trainer_id);
        btn.textContent = "Add Pokemon"
        btn.addEventListener("click", function(){
            let ul = this.parentElement.querySelector('ul')
            let id = this.getAttribute("data-trainer-id");
            newPokemon(id, ul);
         
           
          

        })
    
//make the ul to hold the poke mon        
//add the pokemons to the ul

        let ul = add_pokemon_to_card(trainer)


        div.appendChild(p);
        div.appendChild(btn);
        div.appendChild(ul);
        return div

    }


function add_pokemon_to_card(trainer){
    
    let ul = document.createElement('ul');
    let pokemons_obj = all[trainer].attributes.pokemons;
    for(const poke of pokemons_obj){
        let li = document.createElement('li')
        li.textContent = `${poke.nickname} (${poke.species})`
        let release_button = document.createElement('button');
        release_button.textContent = "Release";
        release_button.classList.add("release");
        release_button.setAttribute('data-pokemon-id', poke.id)
        release_button.addEventListener("click", release_pokemon)
        li.appendChild(release_button);
        ul.appendChild(li);
    }
    return ul

}


function release_pokemon(){

    let pokemon_id = this.getAttribute("data-pokemon-id");
    let configurationObject = {
        method: "DELETE",
        header: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
            "id" : `${pokemon_id}`,
            "type": "pokemon"
        })
    };

    fetch(`${POKEMONS_URL}/${pokemon_id}`, configurationObject).then(resp => resp.json()).then(json => json).catch(function(error) {console.log(error)});
    this.parentElement.remove(this);
}
    



function newPokemon(id, ul){


   let configurationObject = {
    method: "POST",
    header: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    },
    body: JSON.stringify({
        
    })
    }

    fetch(`${TRAINERS_URL}/${id}/pokemons`, configurationObject).then(resp => resp.json()).then(function (json){
        
      let nickname = json.data.attributes.nickname
      let species = json.data.attributes.species
      let poke_id =json.data.id
      console.log(poke_id)
      
      let li = document.createElement('li');
      
      li.textContent = `${nickname} (${species})`
      let release_button = document.createElement('button');
      release_button.textContent = "Release";
      release_button.classList.add("release");
      release_button.setAttribute('data-pokemon-id', poke_id)
      release_button.addEventListener("click", release_pokemon)
      li.appendChild(release_button);
      ul.appendChild(li);
      
    
    }).catch(error => error)
}
    
      


//                                           /
//                        _,.------....___,.' ',.-.
//                     ,-'          _,.--"        |
//                   ,'         _.-'              .
//                  /   ,     ,'                   `
//                 .   /     /                     ``.
//                 |  |     .                       \.\
//       ____      |___._.  |       __               \ `.
//     .'    `---""       ``"-.--"'`  \               .  \
//    .  ,            __               `              |   .
//    `,'         ,-"'  .               \             |    L
//   ,'          '    _.'                -._          /    |
//  ,`-.    ,".   `--'                      >.      ,'     |
// . .'\'   `-'       __    ,  ,-.         /  `.__.-      ,'
// ||:, .           ,'  ;  /  / \ `        `.    .      .'/
// j|:D  \          `--'  ' ,'_  . .         `.__, \   , /
/// L:_  |                 .  "' :_;                `.'.'
//.    ""'                  """""'                    V
// `.                                 .    `.   _,..  `
//   `,_   .    .                _,-'/    .. `,'   __  `
//    ) \`._        ___....----"'  ,'   .'  \ |   '  \  .
//   /   `. "`-.--"'         _,' ,'     `---' |    `./  |
//  .   _  `""'--.._____..--"   ,             '         |
//  | ." `. `-.                /-.           /          ,
//  | `._.'    `,_            ;  /         ,'          .
// .'          /| `-.        . ,'         ,           ,
// '-.__ __ _,','    '`-..___;-...__   ,.'\ ____.___.'
// `"^--'..'   '-`-^-'"--    `-^-'`.''"""""`.,^.`.--' mh