//arquivo com as alterações de JOGADORES no BD

const Database = require ('../Data/aData');

const procuraTodosJogadores = async () => {
    const response = await Database.query(`
    select * 
    from jogadores
    order by jogadores.id
    `)
    return response.rows
}

const procuraJogadorById = async (id) => {
    const response = await Database.query(`
        select id from jogadores where id = $1
    `, [id]
    )
    return response.rows[0] 
}   

const procuraJogadorByIdTodo = async (id) => {
    const response = await Database.query(`
    select 
        jogadores.id,
        jogadores.nome,
        jogadores.data_de_nascimento,
        jogadores.pais,
        case 
            when jogadores.time is null then 'Sem Time'
            else times.nome
        end as nome_time
    from 
        jogadores 
        left join times on times.id = jogadores.time
    where jogadores.id = $1
    `, [id]
    )
    return response.rows[0]
}

const adicionaJogador = async ({nome, data_de_nascimento, pais, time}) => {
    const response = await Database.query(`
        insert into jogadores (
            nome,data_de_nascimento,pais,time
        ) values (
            $1, $2, $3, $4
        ) returning *
    `, [nome,data_de_nascimento,pais,time]
    )
    return response.rows[0]
}

const removeJogadorById = (id) => {
    Database.query(`
        delete from jogadores where id = $1
        `, [id]
    )
}

const attJogadorById = async ({id, nome, data_de_nascimento, pais, time}) => {
    const response = await Database.query(`
        update jogadores 
        set nome = $2, data_de_nascimento = $3, pais = $4, time = $5
        where id = $1 
        returning *
    `, [id, nome, data_de_nascimento, pais, time]
    )
    return response.rows[0]
}

module.exports = {procuraTodosJogadores, procuraJogadorById, procuraJogadorByIdTodo, adicionaJogador, removeJogadorById, attJogadorById};