//controller para TIMES

const {Router} = require ('express');

const TimeService = require ('../Services/aTimeServices');
const TimeController = Router();


//get
TimeController.get('', async (req, res) =>{
    const existeTime = await TimeService.existeTimes()
    if(existeTime){
        try{
            res.json(await TimeService.mostraTodosTimes())
        }catch(error){
            res.status(500).json({error: 'TimeService.mostraTodosTimes() não tá funcionando'})
        }
    }else{
        res.status(404).json({error: 'Não existem times no banco'})
    }
});

//get by id
TimeController.get('/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const existeTime = await TimeService.existeTimeById(id)
        if (existeTime){
            try{
                res.status(200).json(await TimeService.mostraTimeById(id))
            }catch{
                res.status(500).json({error: 'TimeService.mostraTimeById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Time de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'TimeService.existeTimeById() não tá funcionando'})
    }
});

//post
TimeController.post('', async (req, res) =>{
    const {nome, localidade} = req.body
    if(!nome){ 
        return res.status(400).json({error: 'O nome do time não pode ser vazio'})
    }
    try{
        res.status(201).json(await TimeService.armazenaTime({nome, localidade}))
    }catch(error){
        res.status(500).json({error: 'TimeService.armazenaTime() não tá funcionando'})
    }
});

//delete
TimeController.delete('/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const existeTime = await TimeService.existeTimeById(id)
        const existeJogadorNoTime = await TimeService.existeJogadorNoTimeById(id)
        if(existeJogadorNoTime){
            return res.status(400).json({  
                error: `O Time com id ${id} tem jogadores ativos e não pode ser apagado!` ,
                jogadores: await TimeService.exibeJogadoresPorTimeById(id)
            })
            //return res.json(await TimeService.exibeJogadoresPorTimeById(id))
            //return res.status(400).json({error: `O Time com id ${id} tem jogadores ativos e não pode ser apagado!`})
        }
        else if (existeTime){
            try{
                TimeService.apagaTimeById(id)
                res.status(200).json({message: `Time com id ${id} excluído!!!!`})
            }catch{
                res.status(500).json({error: 'TimeService.apagaTimeById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Time de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'TimeService.existeTimeById() não tá funcionando'})
    }
});

//put
TimeController.put('/:id', async (req, res) =>{
    const {id} = req.params
    const {nome, localidade} = req.body
    if(!nome){  
        return res.status(400).json({error: 'O nome do time não pode ser vazio'})
    }
    try{
        const existeTime = await TimeService.existeTimeById(id)
        if (existeTime){
            try{
                res.json(await TimeService.atualizaTimeById({id, nome, localidade}))
            }catch{
                res.status(500).json({error: 'TimeService.atualizaTimeById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Time de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'TimeService.existeTimeById() não tá funcionando'})
    }
});


module.exports = TimeController;