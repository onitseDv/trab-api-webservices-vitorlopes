//repository de JOGADORES

const JogadorRepository = require('../Repositories/aJogadorRepository')

const mostraTodosJogadores = async () => {
    return await JogadorRepository.procuraTodosJogadores()
}

const existeJogadorById = async (id) => {
    const response = await JogadorRepository.procuraJogadorById(id)
    return response ? true : false
}

const mostraJogadorById = async (id) => {
    return await JogadorRepository.procuraJogadorByIdTodo(id)
}

const armazenaJogador = async ({nome, data_de_nascimento, pais, time}) => {
    return await JogadorRepository.adicionaJogador({nome, data_de_nascimento, pais, time})
}

const apagaJogadorById = (id) => {
    JogadorRepository.removeJogadorById(id)
}

const atualizaJogadorById = async ({id, nome, data_de_nascimento, pais, time}) => {
    return await JogadorRepository.attJogadorById({id, nome, data_de_nascimento, pais, time})
}

module.exports = {mostraTodosJogadores, existeJogadorById, mostraJogadorById, armazenaJogador, apagaJogadorById, atualizaJogadorById};