class Trainer{
    constructor(trainer){
        this.id = trainer.id;
        this.name = trainer.name;
        Trainer.all.push(this)
    }
}



Trainer.all = []