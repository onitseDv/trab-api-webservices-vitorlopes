//Services de TORNEIOS

const TorneioRepository = require('../Repositories/aTorneioRepository')

const mostraTodosTorneios = async () => {
    return await TorneioRepository.procuraTodosTorneios()
}

const existeTorneios = async () => {
    const response = await TorneioRepository.procuraTodosTorneios()
    if (response.length > 0)
        return true
    else
        return false
}

const existeTorneioById = async (id) => {
    const response = await TorneioRepository.procuraTorneioById(id)
    return response ? true : false
}

const mostraTorneioById = async (id) => {
    return await TorneioRepository.procuraTorneioByIdTodo(id)
}

const armazenaTorneio = async ({nome}) => {
    return await TorneioRepository.adicionaTorneio({nome})
}

const apagaTorneioById = (id) => {
    TorneioRepository.removeTorneioById(id)
}

const atualizaTorneioById = async ({id, nome}) => {
    return await TorneioRepository.attTorneioById({id, nome})
}

const existeTimeNoTorneioById = async (id) => {
    const response = await TorneioRepository.procuraTimeNoTorneioById(id)
    return response ? true : false
}

const exibeTimesPorTorneioById = async (id) => {
    return await TorneioRepository.mostraTimesNoTorneioById(id)
}


module.exports = {mostraTodosTorneios, existeTorneios, existeTorneioById, mostraTorneioById, 
    armazenaTorneio, apagaTorneioById, atualizaTorneioById, existeTimeNoTorneioById, exibeTimesPorTorneioById};