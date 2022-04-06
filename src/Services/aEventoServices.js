//Services de Eventos

const EventoRepository = require('../Repositories/aEventoRepository')

const mostraTodosEventos = async () => {
    return await EventoRepository.procuraTodosEventos()
}

const existeEventos = async () => {
    const response = await EventoRepository.procuraTodosEventos()
    if (response.length > 0)
        return true
    else
        return false
}

const existeEventoById = async (id) => {
    const response = await EventoRepository.procuraEventoById(id)
    return response ? true : false
}

const existeEventoByDescricao = (descricao) => {
    const eventos = [
        {descricao: "inicio"},
        {descricao: "gol"},
        {descricao: "intervalo"},
        {descricao: "acrescimo"},
        {descricao: "substituicao"},
        {descricao: "advertencia"},
        {descricao: "fim"}
    ];
    for(let cont of eventos){
        if(cont.descricao === descricao){
            
            return true
       }
   }
   return false
}

const mostraEventoById = async (id) => {
    return await EventoRepository.procuraEventoByIdTodo(id)
}

const armazenaEvento = async ({id_partida,descricao_evento}) => {
    return await EventoRepository.adicionaEvento({id_partida,descricao_evento})
}

const apagaEventoById = (id) => {
    EventoRepository.removeEventoById(id)
}

const atualizaEventoById = async ({id_evento,id_partida,descricao_evento}) => {
    return await EventoRepository.attEventoById({id_evento,id_partida,descricao_evento})
}

module.exports = {mostraTodosEventos, existeEventos, existeEventoById, existeEventoByDescricao, mostraEventoById, 
    armazenaEvento, apagaEventoById, atualizaEventoById};