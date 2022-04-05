//controller para EVENTOS

const {Router} = require ('express');

const EventoService = require ('../Services/aEventoServices');
const PartidaService = require ('../Services/aPartidaServices');
const EventoController = Router();
const EventoProducer = require ( '../Producer/aEventoProducer');


//get
EventoController.get('', async (req, res) =>{
    const existeEvento = await EventoService.existeEventos()
    if(existeEvento){
        try{
            res.json(await EventoService.mostraTodosEventos())
        }catch(error){
            res.status(500).json({error: 'EventoService.mostraTodosEventos() não tá funcionando'})
        }
    }else{
        res.status(404).json({error: 'Não existem Eventos no banco'})
    } 
});

//get by id 
EventoController.get('/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const existeEvento = await EventoService.existeEventoById(id)
        if (existeEvento){
            try{
                res.status(200).json(await EventoService.mostraEventoById(id))
            }catch{
                res.status(500).json({error: 'EventoService.mostraEventoById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Evento de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'EventoService.existeEventoById() não tá funcionando'})
    }
});

//post
EventoController.post('', async (req, res) =>{
    const {id_partida,descricao_evento} = req.body
    if(!id_partida){ 
        return res.status(400).json({error: 'O ID da partida não pode ser vazio'})
    }else if(!descricao_evento){ 
        return res.status(400).json({error: 'A descricao do Evento não pode ser vazio'})
    }
    const existePartida = await PartidaService.existePartidaById(id_partida)
    const existeEvento = EventoService.existeEventoByDescricao(descricao_evento)
    if(!existePartida){ 
        return res.status(400).json({error: `Partida de id: ${id_partida} não foi encontrado ou não existe`})
    }else if (!existeEvento){
        return res.status(404).json({error: `O evento: ${descricao_evento} é incorreto`})
    }
    try{
        res.status(201).json(await EventoService.armazenaEvento({id_partida,descricao_evento}))
        EventoProducer.enviaMsgKafka(descricao_evento)
    }catch(error){
        res.status(500).json({error: 'EventoService.armazenaEvento() não tá funcionando'})
    }
});

//delete
EventoController.delete('/:id', async (req, res) =>{ 
    const {id} = req.params
    try{
        const existeEvento = await EventoService.existeEventoById(id)
        if (existeEvento){
            try{
                EventoService.apagaEventoById(id)
                res.status(200).json({message: `Evento com id ${id} excluído!!!!`})
            }catch{
                res.status(500).json({error: 'EventoService.apagaEventoById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Evento de id: ${id} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'EventoService.existeEventoById() não tá funcionando'})
    }
});

//put
EventoController.put('/:id_evento', async (req, res) =>{
    const {id_evento} = req.params
    const {id_partida,descricao_evento} = req.body
    if(!id_partida){ 
        return res.status(400).json({error: 'O ID da partida não pode ser vazio'})
    }else if(!descricao_evento){ 
        return res.status(400).json({error: 'A descricao do Evento não pode ser vazio'})
    }
    try{
        const existeEvento = await EventoService.existeEventoById(id_evento)
        if (existeEvento){
            try{
                res.json(await EventoService.atualizaEventoById({id_evento,id_partida,descricao_evento}))
            }catch{
                res.status(500).json({error: 'EventoService.atualizaEventoById() não tá funcionando'})
            }
        }else{
            res.status(404).json({error: `Evento de id: ${id_evento} não foi encontrado ou não existe`})
        }
    }catch(error){
        res.status(500).json({error: 'EventoService.existeEventoById() não tá funcionando'})
    }
});


module.exports = EventoController;