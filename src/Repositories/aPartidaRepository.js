//arquivo com as alterações dos Jogos (Partidas) no BD

const Database = require ('../Data/aData');

//procura todas as Partidas e retorna a lista deles
const procuraTodasPartidas = async () => {
    const response = await Database.query(`
        --select * from partidas order by id_torneio, id_partida
        select 
            partidas.id_partida,
            torneios.nome_torneio,
            time1.nome as time1,
            time2.nome as time2
        from
            partidas
            inner join torneios on partidas.id_torneio = torneios.id_torneio
            inner join times time1 on time1.id = partidas.id_time1
            inner join times time2 on time2.id = partidas.id_time2
    `)
    return response.rows
}

//procura se existe uma Partida pelo seu [id]
const procuraPartidaById = async (id) => {
    const response = await Database.query(`
        select id_partida from partidas where id_partida = $1
    `, [id]
    )
    return response.rows[0] 
}   

//procura se existe uma Partida pelo seu [id], retornando as informações caso exista
const procuraPartidaByIdTodo = async (id) => {
    const response = await Database.query(`
        --select id_partida from partidas where id_partida = $1
        select 
            partidas.id_partida,
            torneios.nome_torneio,
            time1.nome as time1,
            time2.nome as time2
        from
            partidas
            inner join torneios on partidas.id_torneio = torneios.id_torneio
            inner join times time1 on time1.id = partidas.id_time1
            inner join times time2 on time2.id = partidas.id_time2
        where 
            partidas.id_partida = $1
    `, [id]
    )
    return response.rows[0]
}

//adiciona uma Partida no banco
const adicionaPartida = async ({id_torneio,id_time1,id_time2}) => {
    const response = await Database.query(`
        insert into partidas (
            id_torneio, id_time1, id_time2
        ) values (
            $1, $2, $3
        ) returning *
    `, [id_torneio, id_time1, id_time2]
    )
    return response.rows[0]
}

//apaga uma Partida pelo [id]
const removePartidaById = (id) => {
    Database.query(`
        delete from partidas where id_Partida = $1
    `, [id]
    )
}

//atualiza uma Partida pelo [id]
const attPartidaById = async ({id,id_torneio,id_time1,id_time2}) => {
    const response = await Database.query(`
        update partidas 
        set id_torneio = $2, id_time1 = $3, id_time2 = $4
        where id_partida = $1 
        returning *
    `, [id,id_torneio,id_time1,id_time2]
    )

    return response.rows[0]
}

//verifica se existe times ativos em um Partida passando o [id] do Partida
const procuraTimeNoPartidaById = async (id) => {  
    const response = await Database.query(`
        select 
            Partidas.id_Partida,
            Partidas.nome_Partida,
            times.nome
        from 
            Partidas
            inner join info_Partida on info_Partida.id_Partida = Partidas.id_Partida
            inner join times on times.id = info_Partida.id_time
        where Partidas.id_Partida = $1
    `, [id]
    )
    return response.rows[0]
}

//retorna a lista de times ativos em um Partida passando o [id] do Partida
const mostraTimesNoPartidaById = async (id) => {  
    const response = await Database.query(`
        select 
            Partidas.id_Partida,
            Partidas.nome_Partida,
            times.nome
        from 
            Partidas
            inner join info_Partida on info_Partida.id_Partida = Partidas.id_Partida
            inner join times on times.id = info_Partida.id_time
        where Partidas.id_Partida = $1
    `, [id]
    )
    return response.rows
}

module.exports = {procuraTodasPartidas, procuraPartidaById, procuraPartidaByIdTodo, adicionaPartida, 
    removePartidaById, attPartidaById, procuraTimeNoPartidaById, mostraTimesNoPartidaById};