//arquivo com as alterações de TORNEIOS no BD

const Database = require ('../Data/aData');

//procura todos os Torneios e retorna a lista deles
const procuraTodosTorneios = async () => {
    const response = await Database.query(`
        select * from torneios order by id_torneio
    `)
    return response.rows
}

//procura se existe um Torneio pelo seu [id]
const procuraTorneioById = async (id) => {
    const response = await Database.query(`
        select id_torneio from torneios where id_torneio = $1
    `, [id]
    )
    return response.rows[0] 
}   

//procura se existe um Torneio pelo seu [id], retornando as informações caso exista
const procuraTorneioByIdTodo = async (id) => {
    const response = await Database.query(`
        select * from torneios where id_torneio = $1
    `, [id]
    )
    return response.rows[0]
}

//adiciona um Torneio no banco
const adicionaTorneio = async ({nome}) => {
    const response = await Database.query(`
        insert into torneios (
            nome_torneio
        ) values (
            $1
        ) returning *
    `, [nome]
    )
    return response.rows[0]
}

//apaga um Torneio pelo [id]
const removeTorneioById = (id) => {
    Database.query(`
        delete from torneios where id_torneio = $1
    `, [id]
    )
}

//atualiza um Torneio pelo [id]
const attTorneioById = async ({id, nome}) => {
    const response = await Database.query(`
        update torneios 
        set nome_torneio = $2
        where id_torneio = $1 
        returning *
    `, [id, nome]
    )

    return response.rows[0]
}

//verifica se existe times em um Torneio passando o [id] do Torneio
const procuraTimeNoTorneioById = async (id) => {  
    const response = await Database.query(`
        select distinct
            torneios.id_torneio,
            torneios.nome_torneio,
            times.nome
        from 
            torneios
            inner join partidas on partidas.id_torneio = torneios.id_torneio
            inner join times on times.id = partidas.id_time1 OR times.id = partidas.id_time2
        where 
            torneios.id_torneio = $1
        order by
            torneios.id_torneio, times.nome
    `, [id]
    )
    return response.rows[0]
}

//retorna a lista de times em um Torneio passando o [id] do Torneio
const mostraTimesNoTorneioById = async (id) => {  
    const response = await Database.query(`
        select distinct
            torneios.id_torneio,
            torneios.nome_torneio,
            times.nome
        from 
            torneios
            inner join partidas on partidas.id_torneio = torneios.id_torneio
            inner join times on times.id = partidas.id_time1 OR times.id = partidas.id_time2
        where 
            torneios.id_torneio = $1
        order by
            torneios.id_torneio, times.nome
    `, [id]
    )
    return response.rows
}

module.exports = {procuraTodosTorneios, procuraTorneioById, procuraTorneioByIdTodo, adicionaTorneio, removeTorneioById, attTorneioById, procuraTimeNoTorneioById, mostraTimesNoTorneioById};