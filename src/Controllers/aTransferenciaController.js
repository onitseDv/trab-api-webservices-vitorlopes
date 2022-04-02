//controller para TRANSFERENCIAS

const {Router} = require ('express');

const TransferenciaService = require ('../Services/aTransferenciaServices');
const JogadorService = require ('../Services/aJogadorServices');
const TimeService = require ('../Services/aTimeServices');
const TransferenciaController = Router();


//get
TransferenciaController.get('', async (req, res) =>{
    const existeTransferencia = await TransferenciaService.existeTransferencias()
    if(existeTransferencia){
        try{
            res.status(200).json(await TransferenciaService.mostraTodasTransferencias())
        }catch(error){
            res.status(500).json({error: 'TransferenciaService.mostraTodasTransferencias() não tá funcionando'})
        }
    }else{
        res.status(404).json({error: 'Não existem transferencias no banco'})
    }
 });

//get by id
TransferenciaController.get('/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const existeTransferencia = await TransferenciaService.existeTransferenciaById(id)
        if (existeTransferencia){
            try{
                res.status(200).json(await TransferenciaService.mostraTransferenciaById(id))
            }catch{
                res.status(500).json({error: 'TransferenciaService.mostraTransferenciaById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Transferencia de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'TransferenciaService.existeTransferenciaById() não tá funcionando'})
    }
});

//post
TransferenciaController.post('', async (req, res) =>{
    const {time_origem,time_destino,id_jogador,valor} = req.body
    if(!time_origem){ 
        return res.status(400).json({error: 'O Time de Origem do jogador não pode ser vazio'})
    }else if(!time_destino){ 
        return res.status(400).json({error: 'O Time de Destino do jogador não pode ser vazio'})
    }else if(!id_jogador){ 
        return res.status(400).json({error: 'O ID do jogador não pode ser vazio'})
    }else if (time_origem === time_destino){
        return res.status(400).json({error: 'Os times de origem e destino não podem ser iguais'})
    }
    const existeTimeOrigem = await TimeService.existeTimeById(time_origem)
    const existeTimeDestino = await TimeService.existeTimeById(time_destino)
    const existeJogador = await JogadorService.existeJogadorById(id_jogador)
    if (!existeTimeOrigem){
        return res.status(404).json({error: `O time (origem) de id: ${time_origem} não foi encontrado ou não existe`})
    }else if (!existeTimeDestino){
        return res.status(404).json({error: `O time (destino) de id: ${time_destino} não foi encontrado ou não existe`})
    }else if (!existeJogador){
        return res.status(404).json({error: `Jogador de id: ${id_jogador} não foi encontrado ou não existe`})
    }
    try{
        res.status(201).json(await TransferenciaService.armazenaTransferencia({time_origem,time_destino,id_jogador,valor}))
    }catch(error){
        res.status(500).json({error: 'TransferenciaService.armazenaTransferencia() não tá funcionando'})
    }
});

//delete
TransferenciaController.delete('/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const existeTransferencia = await TransferenciaService.existeTransferenciaById(id)
        if (existeTransferencia){
            try{
                TransferenciaService.apagaTransferenciaById(id)
                res.status(200).json({message: `Transferencia com id ${id} excluído!!!!`})
            }catch{
                res.status(500).json({error: 'TransferenciaService.apagaTransferenciaById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Transferencia de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'TransferenciaService.existeTransferenciaById() não tá funcionando'})
    }
});

//put
TransferenciaController.put('/:id', async (req, res) =>{
    const {id} = req.params
    const {time_origem,time_destino,id_jogador,valor} = req.body
    if(!time_origem){ 
        return res.status(400).json({error: 'O Time de Origem do jogador não pode ser vazio'})
    }else if(!time_destino){ 
        return res.status(400).json({error: 'O Time de Destino do jogador não pode ser vazio'})
    }else if(!id_jogador){ 
        return res.status(400).json({error: 'O ID do jogador não pode ser vazio'})
    }else if (time_origem === time_destino){
        return res.status(400).json({error: 'Os times de origem e destino não podem ser iguais'})
    }
    try{
        const existeTransferencia = await TransferenciaService.existeTransferenciaById(id)
        if (existeTransferencia){
            try{
                res.json(await TransferenciaService.atualizaTransferenciaById({id,time_origem,time_destino,id_jogador,valor}))
            }catch{
                res.status(500).json({error: 'TransferenciaService.atualizaTransferenciaById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Transferencia de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'TransferenciaService.existeTransferenciaById() não tá funcionando'})
    }
});


module.exports = TransferenciaController;