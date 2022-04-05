//controller para INFORMAÇÕES DOS JOGOS (PARTIDAS)

const {Router} = require ('express');

const PartidaService = require ('../Services/aPartidaServices');
const TorneioService = require ('../Services/aTorneioServices');
const TimeService = require ('../Services/aTimeServices');
const PartidaController = Router();

//get
PartidaController.get('', async (req, res) =>{
    const existePartida = await PartidaService.existePartidas()
    if(existePartida){
        try{
            res.json(await PartidaService.mostraTodasPartidas())
        }catch(error){
            res.status(500).json({error: 'PartidaService.mostraTodasPartidas() não tá funcionando'})
        }
    }else{
        res.status(404).json({error: 'Não existem Partidas no banco'})
    }
});

//get by id
PartidaController.get('/:id', async (req, res) =>{
    const {id} = req.params
    //console.log()
    try{
        const existePartida = await PartidaService.existePartidaById(id)
        if (existePartida){
            try{
                res.status(200).json(await PartidaService.mostraPartidaById(id))
            }catch{
                res.status(500).json({error: 'PartidaService.mostraPartidaById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Partida de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'PartidaService.existePartidaById() não tá funcionando'})
    }
});

//post
PartidaController.post('', async (req, res) =>{
    const {id_torneio,id_time1,id_time2} = req.body
    const existeTorneio = await TorneioService.existeTorneioById(id_torneio)
    const existeTime1 = await TimeService.existeTimeById(id_time1)
    const existeTime2 = await TimeService.existeTimeById(id_time2)
    if(!id_torneio){ 
        return res.status(400).json({error: 'O ID do torneio não pode ser vazio'})
    }else if(!id_time1){ 
        return res.status(400).json({error: 'O ID do time 1 não pode ser vazio'})
    }else if(!id_time2){ 
        return res.status(400).json({error: 'O ID do time 2 não pode ser vazio'})
    }else if(id_time1 === id_time2){ 
        return res.status(400).json({error: 'Os IDs dos times não podem ser iguais'})
    }else if (!existeTorneio){
        return res.status(404).json({error: `Torneio de id: ${id_torneio} não foi encontrado ou não existe`})
    }else if(!existeTime1){ 
        return res.status(400).json({error: `Time 1 de id: ${id_time1} não foi encontrado ou não existe`})
    }else if(!existeTime2){ 
        return res.status(400).json({error: `Time 2 de id: ${id_time2} não foi encontrado ou não existe`})
    }
    try{
        res.status(201).json(await PartidaService.armazenaPartida({id_torneio,id_time1,id_time2}))
    }catch(error){
        res.status(500).json({error: 'PartidaService.armazenaPartida() não tá funcionando'})
    }
});

//delete
PartidaController.delete('/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const existePartida = await PartidaService.existePartidaById(id)
        if (existePartida){
            try{
                PartidaService.apagaPartidaById(id)
                res.status(200).json({message: `Partida com id ${id} excluído!!!!`})
            }catch{
                res.status(500).json({error: 'PartidaService.apagaPartidaById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Partida de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'PartidaService.existePartidaById() não tá funcionando'})
    }
});

//put
PartidaController.put('/:id', async (req, res) =>{
    const {id} = req.params
    const {id_torneio,id_time1,id_time2} = req.body
    const existeTorneio = await TorneioService.existeTorneioById(id_torneio)
    const existeTime1 = await TimeService.existeTimeById(id_time1)
    const existeTime2 = await TimeService.existeTimeById(id_time2)
    if(!id_torneio){ 
        return res.status(400).json({error: 'O ID do torneio não pode ser vazio'})
    }else if(!id_time1){ 
        return res.status(400).json({error: 'O ID do time 1 não pode ser vazio'})
    }else if(!id_time2){ 
        return res.status(400).json({error: 'O ID do time 2 não pode ser vazio'})
    }else if(id_time1 === id_time2){ 
        return res.status(400).json({error: 'Os IDs dos times não podem ser iguais'})
    }else if (!existeTorneio){
        return res.status(404).json({error: `Torneio de id: ${id_torneio} não foi encontrado ou não existe`})
    }else if(!existeTime1){ 
        return res.status(400).json({error: `Time 1 de id: ${id_time1} não foi encontrado ou não existe`})
    }else if(!existeTime2){ 
        return res.status(400).json({error: `Time 2 de id: ${id_time2} não foi encontrado ou não existe`})
    }
    try{
        const existePartida = await PartidaService.existePartidaById(id)
        if (existePartida){
            try{
                res.json(await PartidaService.atualizaPartidaById({id,id_torneio,id_time1,id_time2}))
            }catch{
                res.status(500).json({error: 'PartidaService.atualizaPartidaById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Partida de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'PartidaService.existePartidaById() não tá funcionando'})
    }
});


module.exports = PartidaController;