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

export const criar = async(req,res) => {
    try {
        const { nome, especie, idade, dono} = req.body

        const dado = req.body 

        // Validação 
        const camposObrigatorios = ['nome', 'especie', 'idade', 'dono'];

        const faltando = camposObrigatorios.filter(campo => !dado[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
            });
        }

        //verificar se a casa é válida
        const especiesValidas = ['Cachorro', 'Gato', 'Passarinho', 'Peixe']
        if(!especiesValidas.includes(casa)){
            return res.status(400).json({
                erro: 'Espécie inválida',
                especiesValidas
            })
        }

        const novoPet = await PetModel.create(dado);

        res.status(201).json({
            mensagem: 'Pet criado com sucesso!',
            pet: novoPet
        })

    } catch (error){
        res.status(500).json({
            erro: 'Erro ao criar pet',
            detalhes: error.message
        })
    }
}

export const apagar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const petExiste = await PetModel.findById(id)

        if(!petExiste){
            return res.status(404).json({
                erro: 'Pet não encontrado com esse Id',
                id: id
            })
        }

        await PetModel.deletePet(id)

        res.status(200).json({
            mensagem: 'Pet removido com sucesso',
            bruxoRemovido: petExiste
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao apagar o Pet',
            detahes: error.message
        })
    }
}

export const atualizar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;

        const petExiste = await PetModel.findById(id);

        if (!petExiste) {
            return res.status(404).json({
                erro: 'Pet não encontrado com esse id',
                id: id
            })
        }

        if (dados.especie) {
            const especiesValidas = ['Cachorro', 'Gato', 'Passarinho', 'Peixe'];
            if (!especiesValidas.includes(dados.especie)) {
                return res.status(400).json({
                    erro: 'Espécie inválida!',
                    especiesValidas
                })
            }
        }

        
        const petAtualizado = await PetModel.update(id, dados);

        res.status(200).json({
            mensagem: 'Pet atualizado com sucesso',
            pet: petAtualizado
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao atualizar Pets',
            detalhes: error.message
        })
    }
}