import * as PetModel from './../models/petModel.js'

export const listarTodos = async (req, res) => {
    try{
        const pets = await PetModel.findAll()

        if(!pets || pets.length === 0){
            res.status(404).json({
                total: pets.length,
                mensagem: 'Não tem animais nessa lista',
                pets
            })
        } 

        res.status(200).json({
            total: pets.length,
            mensagem: 'lista de pets',
            pets
        })

    } catch(error){
        res.status(500).json ({
            erro: 'Erro interno',
            detalhes: error.message,
            status: 500
        })
    }
}

export const listarUm = async (req, res) => {
    try{
        const {id} = req.params;
        const pet = await PetModel.findById(id)

        if(!pet){
            return res.status(404).json({
                erro: "Pet não encontrado",
                mensagem: 'Verifique de o id do pet existe',
                id: id
            })
        }

        res.status(200).json({
            mensagem: 'Pet encontrado',
            pet
        })

    } catch (error){
        res.status(500).json({
            erro: 'Erro ao buscar pet por id',
            detalhes: error.message
        })
    }
}