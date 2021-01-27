class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        options = {
            include: [:pokemons]
        }
        render json: TrainerSerializer.new(trainers)
        printer
    end

def printer
    puts "____       _                              "
    puts "|  _ \ ___ | | _____ _ __ ___   ___  _ __  "
    puts "| |_) / _ \| |/ / _ \ '_ ` _ \ / _ \| '_ \ "
    puts "|  __/ (_) |   <  __/ | | | | | (_) | | | |"
    puts "|_|   \___/|_|\_\___|_| |_| |_|\___/|_| |_|"
end

end
