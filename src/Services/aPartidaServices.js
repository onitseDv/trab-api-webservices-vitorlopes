//repository de Jogos (Partidas)

const PartidaRepository = require('../Repositories/aPartidaRepository')

const mostraTodasPartidas = async () => {
    return await PartidaRepository.procuraTodasPartidas()
}

const existePartidas = async () => {
    const response = await PartidaRepository.procuraTodasPartidas()
    if (response.length > 0)
        return true
    else
        return false
}

const existePartidaById = async (id) => {
    const response = await PartidaRepository.procuraPartidaById(id)
    return response ? true : false
}

const mostraPartidaById = async (id) => {
    return await PartidaRepository.procuraPartidaByIdTodo(id)
}

const armazenaPartida = async ({id_torneio,id_time1,id_time2}) => {
    return await PartidaRepository.adicionaPartida({id_torneio,id_time1,id_time2})
}

const apagaPartidaById = (id) => {
    PartidaRepository.removePartidaById(id)
}

const atualizaPartidaById = async ({id,id_torneio,id_time1,id_time2}) => {
    return await PartidaRepository.attPartidaById({id,id_torneio,id_time1,id_time2})
}

const existeTimeNoPartidaById = async (id) => {
    const response = await PartidaRepository.procuraTimeNoPartidaById(id)
    return response ? true : false
}

const exibeTimesPorPartidaById = async (id) => {
    return await PartidaRepository.mostraTimesNoPartidaById(id)
}


module.exports = {mostraTodasPartidas, existePartidas, existePartidaById, mostraPartidaById, 
    armazenaPartida, apagaPartidaById, atualizaPartidaById, existeTimeNoPartidaById, exibeTimesPorPartidaById};