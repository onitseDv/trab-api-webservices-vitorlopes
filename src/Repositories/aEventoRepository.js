//arquivo com as alterações de Eventos no BD

const Database = require ('../Data/aData');

//procura todos os Eventos e retorna a lista deles
const procuraTodosEventos = async () => {
    const response = await Database.query(`
        select 
            eventos.id_evento,
            eventos.id_partida,
            eventos.descricao_evento
        from 
            eventos
            --inner join partidas on partidas.id_partida = eventos.id_partida
        order by 
            eventos.id_evento
    `)
    return response.rows
}

//procura se existe um Eventos pelo seu [id]
const procuraEventoById = async (id) => {
    const response = await Database.query(`
        select 
            eventos.id_evento
        from 
            eventos
        where 
            eventos.id_evento = $1
    `, [id]
    )
    return response.rows[0] 
}   

//procura se existe um Evento pelo seu [id], retornando as informações caso exista
const procuraEventoByIdTodo = async (id) => {
    const response = await Database.query(`
        select 
            eventos.id_evento,
            eventos.id_partida,
            eventos.descricao_evento
        from 
            eventos
        where 
            eventos.id_evento = $1
    `, [id]
    )
    return response.rows[0]
}

//adiciona um evento no banco
const adicionaEvento = async ({id_partida,descricao_evento}) => {
    const response = await Database.query(`
        insert into eventos (
            id_partida, descricao_evento
        ) values (
            $1, $2
        ) returning *
    `, [id_partida,descricao_evento]
    )
    return response.rows[0]
}

//apaga um Evento pelo [id]
const removeEventoById = (id) => {
    Database.query(`
        delete from eventos where id_evento = $1
    `, [id]
    )
}

//atualiza um Evento pelo [id]
const attEventoById = async ({id_evento,id_partida,descricao_evento}) => {
    const response = await Database.query(`
        update eventos 
        set id_partida = $2, descricao_evento = $3
        where id_evento = $1 
        returning *
    `, [id_evento,id_partida,descricao_evento]
    )

    return response.rows[0]
}

module.exports = {procuraTodosEventos, procuraEventoById, procuraEventoByIdTodo, 
    adicionaEvento, removeEventoById, attEventoById};