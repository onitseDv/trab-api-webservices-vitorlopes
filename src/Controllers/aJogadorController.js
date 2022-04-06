//controller para JOGADORES

const {Router} = require ('express');

const JogadorService = require ('../Services/aJogadorServices');
const TimeService = require ('../Services/aTimeServices');
const JogadorController = Router();

//get
//JogadorController.get('', async (req, res) =>{
JogadorController.get('', async (req, res) =>{
    const existeJogador = await JogadorService.existeJogadores()
    if(existeJogador){
        try{
            res.json(await JogadorService.mostraTodosJogadores())
        }catch(error){
            res.status(500).json({error: 'JogadorService.mostraTodosJogadores() não tá funcionando'})
        }
    }else{
        res.status(404).json({error: 'Não existem jogadores no banco'})
    }
});

//get by id
JogadorController.get('/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const existeJogador = await JogadorService.existeJogadorById(id)
        if (existeJogador){
            try{
                res.status(200).json(await JogadorService.mostraJogadorById(id))
            }catch{
                res.status(500).json({error: 'JogadorService.mostraJogadorById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Jogador de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'JogadorService.existeJogadorById() não tá funcionando'})
    }
});

//post
JogadorController.post('', async (req, res) =>{
    const {nome, data_de_nascimento, pais, time} = req.body
    if(!nome){ 
        return res.status(400).json({error: 'O nome do Jogador não pode ser vazio'})
    }else if(!data_de_nascimento){ 
        return res.status(400).json({error: 'A Data de nascimento do Jogador não pode ser vazio'})
    }else if(!pais){ 
        return res.status(400).json({error: 'O País do Jogador não pode ser vazio'})
    }else if (!time){
        return res.status(404).json({error: `O time não pode ser vazio`})
    }
    const existeTime = await TimeService.existeTimeById(time)
    if (!existeTime){
        return res.status(404).json({error: `O time de id: ${time} não foi encontrado ou não existe`})
    }
    try{
        res.status(201).json(await JogadorService.armazenaJogador({nome, data_de_nascimento, pais, time}))
    }catch(error){
        res.status(500).json({error: 'JogadorService.armazenaJogador() não tá funcionando'})
    }
});

//delete
JogadorController.delete('/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const existeJogador = await JogadorService.existeJogadorById(id)
        if (existeJogador){
            try{
                JogadorService.apagaJogadorById(id)
                res.status(200).json({message: `Jogador com id ${id} excluído!!!!`})
            }catch{
                res.status(500).json({error: 'JogadorService.apagaJogadorById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Jogador de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'JogadorService.existeJogadorById() não tá funcionando'})
    }
});

//put
JogadorController.put('/:id', async (req, res) =>{
    const {id} = req.params
    const {nome, data_de_nascimento, pais, time} = req.body
    if(!nome){ 
        return res.status(400).json({error: 'O nome do Jogador não pode ser vazio'})
    }else if(!data_de_nascimento){ 
        return res.status(400).json({error: 'A Data de nascimento do Jogador não pode ser vazio'})
    }else if(!pais){ 
        return res.status(400).json({error: 'O País do Jogador não pode ser vazio'})
    }
    try{
        const existeJogador = await JogadorService.existeJogadorById(id)
        const existeTime = await TimeService.existeTimeById(time)
        if (!existeTime){
            res.status(404).json({error: `O time de id: ${time} não foi encontrado ou não existe`})
        }else if (existeJogador){
            try{
                res.json(await JogadorService.atualizaJogadorById({id, nome, data_de_nascimento, pais, time}))
            }catch{
                res.status(500).json({error: 'JogadorService.atualizaJogadorById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Jogador de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'JogadorService.existeJogadorById() não tá funcionando'})
    }
});


module.exports = JogadorController;