const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {


    
    function getTrainers() {
        fetch(`${TRAINERS_URL}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("main").innerHTML = ""
            for(const el of data) {
                //debugger
                document.getElementById("main").innerHTML += 
                "<div class=\"card\" data-id=\"" + el.id + "\">" + 
                    "<p>" + el.name + "</p>" +
                        "<button class=\"addButton\" data-trainer-id=\"" + el.id + "\">Add Pokemon</button>" +
                        "<ul class=\"" + el.id + "\">" + "</ul>" +
                "</div>"
                let ul = document.getElementsByClassName(el.id)[0]
                //debugger;
                for(const pokemon of el.pokemons) {
                    let li = document.createElement("li")
                    li.innerHTML = pokemon.nickname + "(" + pokemon.species + ")" + "<button class=\"release\" data-pokemon-id=\"" + pokemon.id + "\">Release</button>"
                    ul.appendChild(li)
                    //
                    
                }


            }
            let releaseButtons = document.getElementsByClassName("release")
            
            for (const releaseButton of releaseButtons) {
                releaseButton.addEventListener("click", function() {
                    //debugger
                    let configObj = {
                        method: "DELETE"
                    }
                    fetch(`${POKEMONS_URL}/${this.getAttribute("data-pokemon-id")}`, configObj)
                    .then(resp => resp.text).then(data => console.log(data))

                    //debugger
                    this.parentNode.parentNode.removeChild(this.parentNode)
                })
            }

            let addButtons = document.getElementsByClassName("addButton")

            for (const addButton of addButtons) {
                addButton.addEventListener("click", function() {
                    let configObj = {
                        method: "POST",
                        header: {
                            'Content-Type': 'application/json'
                        }
                        
                    }
                    fetch(`${TRAINERS_URL}/${this.getAttribute("data-trainer-id")}/pokemons`, configObj)
                    .then(resp => resp.json())
                    .then(function(data) {
                        //debugger
                        let ul = document.getElementsByClassName(data.trainer_id)[0]
                        let li = document.createElement("li")
                        li.innerHTML = data.nickname + "(" + data.species + ")" + "<button class=\"release\" data-pokemon-id=\"" + data.id + "\">Release</button>"
                        ul.appendChild(li)
                        //debugger
                        let newButton = li.getElementsByTagName("button")[0]
                        newButton.addEventListener("click", function() {
                            //debugger
                            let configObj = {
                                method: "DELETE"
                            }
                            fetch(`${POKEMONS_URL}/${this.getAttribute("data-pokemon-id")}`, configObj)
                            .then(resp => resp.text).then(data => console.log(data))
        
                            //debugger
                            this.parentNode.parentNode.removeChild(this.parentNode)
                        })
                    })
                })
            }


        })

    }

    getTrainers()



    //debugger
})


