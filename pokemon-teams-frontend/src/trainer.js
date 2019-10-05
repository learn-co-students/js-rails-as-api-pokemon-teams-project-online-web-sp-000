class Trainer{
    constructor(trainerObj){ 
        this.id = trainerObj.id;
        this.name = trainerObj.attributes.name;
        this.pokemons = trainerObj.attributes.pokemons; 
    }

    render(){ 
        const cardContainer = document.querySelector('main');
        const trainerCard = document.createElement('div');
        trainerCard.className = 'card';
        trainerCard.dataset.id = this.id;
        const trainerName = document.createElement('p');
        trainerName.innerText = this.name;
        trainerCard.append(trainerName); 
        const addPokemonBtn = document.createElement('button');
        addPokemonBtn.innerText = 'Add Pokemon'; 
        addPokemonBtn.className = 'add-new-pokemon'; 
        trainerCard.append(addPokemonBtn); 
        const pokemonsList = document.createElement('ul');
        pokemonsList.id = this.id; 
        trainerCard.append(pokemonsList);
        cardContainer.append(trainerCard);
    }
}