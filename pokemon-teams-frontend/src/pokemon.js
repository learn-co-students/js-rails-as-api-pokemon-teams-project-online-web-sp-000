class Pokemon{
    constructor(pokeObj){ 
        this.id = pokeObj.id
        this.species = pokeObj.attributes.species
        this.nickname = pokeObj.attributes.nickname
        this.trainer = pokeObj.attributes.trainer 
    }

    render(){  
        const trainerPokemonList = document.getElementById(`${this.trainer.id}`)
        const pokemonItem = document.createElement('li');
        pokemonItem.className = `${this.trainer.id}`
        pokemonItem.innerText = `${this.species} (${this.nickname})`; 
        const releaseBtn = document.createElement('button');
        releaseBtn.className = 'release';
        releaseBtn.innerText = 'Release';
        releaseBtn.dataset.id = this.id; 
        pokemonItem.append(releaseBtn); 
        trainerPokemonList.append(pokemonItem);  
    }
}