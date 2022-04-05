//repository de TIMES

const TimeRepository = require('../Repositories/aTimeRepository')

const mostraTodosTimes = async () => {
    return await TimeRepository.procuraTodosTimes()
}

const existeTimes = async () => {
    const response = await TimeRepository.procuraTodosTimes()
    if (response.length > 0)
        return true
    else
        return false
}

const existeTimeById = async (id) => {
    const response = await TimeRepository.procuraTimeById(id)
    return response ? true : false
}

const mostraTimeById = async (id) => {
    return await TimeRepository.procuraTimeByIdTodo(id)
}

const armazenaTime = async ({nome, localidade}) => {
    return await TimeRepository.adicionaTime({nome, localidade})
}

const apagaTimeById = (id) => {
    TimeRepository.removeTimeById(id)
}

const atualizaTimeById = async ({id, nome, localidade}) => {
    return await TimeRepository.attTimeById({id, nome, localidade})
}

const existeJogadorNoTimeById = async (id) => {
    const response = await TimeRepository.procuraJogadorNoTimeById(id)
    return response ? true : false
}

const exibeJogadoresPorTimeById = async (id) => {
    return await TimeRepository.mostraJogadorNoTimeById(id)
}


module.exports = {mostraTodosTimes, existeTimes, existeTimeById, mostraTimeById, 
    armazenaTime, apagaTimeById, atualizaTimeById, existeJogadorNoTimeById, exibeJogadoresPorTimeById};