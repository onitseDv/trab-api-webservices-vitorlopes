//controller para TORNEIO

const {Router} = require ('express');

const TorneioService = require ('../Services/aTorneioServices');
const TorneioController = Router();


//get
TorneioController.get('', async (req, res) =>{
    const existeTorneio = await TorneioService.existeTorneios()
    if(existeTorneio){
        try{
            res.json(await TorneioService.mostraTodosTorneios())
        }catch(error){
            res.status(500).json({error: 'TorneioService.mostraTodosTorneios() não tá funcionando'})
        }
    }else{
        res.status(404).json({error: 'Não existem torneios no banco'})
    }
});

//get by id
TorneioController.get('/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const existeTorneio = await TorneioService.existeTorneioById(id)
        if (existeTorneio){
            try{
                res.status(200).json(await TorneioService.mostraTorneioById(id))
            }catch{
                res.status(500).json({error: 'TorneioService.mostraTorneioById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Torneio de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'TorneioService.existeTorneioById() não tá funcionando'})
    }
});

//post
TorneioController.post('', async (req, res) =>{
    const {nome} = req.body
    if(!nome){ 
        return res.status(400).json({error: 'O nome do Torneio não pode ser vazio'})
    }
    try{
        res.status(201).json(await TorneioService.armazenaTorneio({nome}))
    }catch(error){
        res.status(500).json({error: 'TorneioService.armazenaTorneio() não tá funcionando'})
    }
});

//delete
TorneioController.delete('/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const existeTorneio = await TorneioService.existeTorneioById(id)
        const existeTimeNoTorneio = await TorneioService.existeTimeNoTorneioById(id)
        if(existeTimeNoTorneio){
            return res.status(400).json({  
                error: `O Torneio com id ${id} tem times ativos e não pode ser apagado!` ,
                times: await TorneioService.exibeTimesPorTorneioById(id)
            })
        }else if (existeTorneio){
            try{
                TorneioService.apagaTorneioById(id)
                res.status(200).json({message: `Torneio com id ${id} excluído!!!!`})
            }catch{
                res.status(500).json({error: 'TorneioService.apagaTorneioById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Torneio de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'TorneioService.existeTorneioById() não tá funcionando'})
    }
});

//put
TorneioController.put('/:id', async (req, res) =>{
    const {id} = req.params
    const {nome} = req.body
    if(!nome){  
        return res.status(400).json({error: 'O nome do Torneio não pode ser vazio'})
    }
    try{
        const existeTorneio = await TorneioService.existeTorneioById(id)
        if (existeTorneio){
            try{
                res.json(await TorneioService.atualizaTorneioById({id, nome}))
            }catch{
                res.status(500).json({error: 'TorneioService.atualizaTorneioById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Torneio de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'TorneioService.existeTorneioById() não tá funcionando'})
    }
});


module.exports = TorneioController;