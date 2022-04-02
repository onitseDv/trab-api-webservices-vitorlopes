//arquivo com as alterações de Transferencias no BD

const Database = require ('../Data/aData');

//procura todos as Transferencias e retorna a lista deles
const procuraTodasTransferencias = async () => {
    const response = await Database.query(`
        select * from transferencias order by id
        /*
        select 
            transferencias.id,
            t_time_origem.nome as time_origem,
            t_time_destino.nome as time_destino,
            jogadores.nome as nome_jogador,
            transferencias.data,
            transferencias.valor
        from 
            transferencias
            inner join times t_time_origem on t_time_origem.id = transferencias.time_origem
            inner join times t_time_destino on t_time_destino.id = transferencias.time_destino
            inner join jogadores on jogadores.id = transferencias.id_jogador
        order by 
            transferencias.id
        */
    `)
    return response.rows
}

//procura se existe uma Transferencia pelo seu [id]
const procuraTransferenciaById = async (id) => {
    const response = await Database.query(`
        select id from transferencias where id = $1
    `, [id]
    )
    return response.rows[0] 
}   

//procura se existe uma Transferencia pelo seu [id], retornando as informações caso exista
const procuraTransferenciaByIdTodo = async (id) => {
    const response = await Database.query(`
    select 
        transferencias.id,
        t_time_origem.nome as time_origem,
        t_time_destino.nome as time_destino,
        jogadores.nome as nome_jogador,
        transferencias.data,
        transferencias.valor
    from 
        transferencias
        inner join times t_time_origem on t_time_origem.id = transferencias.time_origem
        inner join times t_time_destino on t_time_destino.id = transferencias.time_destino
        inner join jogadores on jogadores.id = transferencias.id_jogador
    where 
        transferencias.id = $1
    `, [id]
    )
    return response.rows[0]
}

//adiciona uma Transferencia no banco
const adicionaTransferencia = async ({time_origem,time_destino,id_jogador,valor}) => {
    const response = await Database.query(`
        insert into transferencias (
            time_origem,time_destino,id_jogador,data,valor
        ) values (
            $1, $2, $3, current_timestamp, $4
        ) returning *
    `, [time_origem,time_destino,id_jogador,valor]
    )
    return response.rows[0]
}

//apaga uma Transferencia pelo [id]
const removeTransferenciaById = (id) => {
    Database.query(`
        delete from transferencias where id = $1
    `, [id]
    )
}

//atualiza uma Transferencia pelo [id]
const attTransferenciaById = async ({id,time_origem,time_destino,id_jogador,valor}) => {
    const response = await Database.query(`
        update transferencias 
        set time_origem = $2, time_destino = $3, id_jogador = $4, valor = $5, data = current_timestamp
        where id = $1 
        returning *
    `, [id,time_origem,time_destino,id_jogador,valor]
    )

    return response.rows[0]
}

module.exports = {procuraTodasTransferencias, procuraTransferenciaById, procuraTransferenciaByIdTodo, 
    adicionaTransferencia, removeTransferenciaById, attTransferenciaById};