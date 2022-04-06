//Services de Transferencias

const TransferenciaRepository = require('../Repositories/aTransferenciaRepository')

const mostraTodasTransferencias = async () => {
    return await TransferenciaRepository.procuraTodasTransferencias()
}

const existeTransferencias = async () => {
    const response = await TransferenciaRepository.procuraTodasTransferencias()
    if (response.length > 0)
        return true
    else
        return false
}

const existeTransferenciaById = async (id) => {
    const response = await TransferenciaRepository.procuraTransferenciaById(id)
    return response ? true : false
}

const mostraTransferenciaById = async (id) => {
    return await TransferenciaRepository.procuraTransferenciaByIdTodo(id)
}

const armazenaTransferencia = async ({time_origem,time_destino,id_jogador,valor}) => {
    return await TransferenciaRepository.adicionaTransferencia({time_origem,time_destino,id_jogador,valor})
}

const apagaTransferenciaById = (id) => {
    TransferenciaRepository.removeTransferenciaById(id)
}

const atualizaTransferenciaById = async ({id,time_origem,time_destino,id_jogador,valor}) => {
    return await TransferenciaRepository.attTransferenciaById({id,time_origem,time_destino,id_jogador,valor})
}

module.exports = {mostraTodasTransferencias, existeTransferencias, existeTransferenciaById, mostraTransferenciaById, 
    armazenaTransferencia, apagaTransferenciaById, atualizaTransferenciaById};