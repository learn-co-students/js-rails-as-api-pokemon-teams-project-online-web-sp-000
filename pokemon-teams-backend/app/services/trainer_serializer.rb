# class TrainerSerializer
#     def initialize(trainer_object)
#         @trainer = trainer_object
#     end

#     def to_json_serializer
#         options = {
#             include: {
#                 pokemons: {only: [:id, :species, :nickname, :trainer_id]}
#             },
#             except: [:created_at, :updated_at]
#         }

#         @trainer.to_json(options)
#     end
# end