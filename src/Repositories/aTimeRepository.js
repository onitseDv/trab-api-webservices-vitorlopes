//arquivo com as alterações de TIMES no BD

const Database = require ('../Data/aData');

//procura todos os times e retorna a lista deles
const procuraTodosTimes = async () => {
    const response = await Database.query(`
        select * from times order by id
    `)
    return response.rows
}

//procura se existe um time pelo seu [id]
const procuraTimeById = async (id) => {
    const response = await Database.query(`
        select id from times where id = $1
    `, [id]
    )
    return response.rows[0] 
}   
//OBS: o response rows[0], pega o arametro no [id] que acabou de ser inserido

//procura se existe um time pelo seu [id], retornando as informações caso exista
const procuraTimeByIdTodo = async (id) => {
    const response = await Database.query(`
        select * from times where id = $1
    `, [id]
    )
    return response.rows[0]
}
//OBS: o $ pega o parametro

//adiciona um time no banco
const adicionaTime = async ({nome, localidade}) => {
    const response = await Database.query(`
        insert into times (
            nome, localidade
        ) values (
            $1, $2
        ) returning *
    `, [nome, localidade]
    )
    return response.rows[0]
}

//apaga um time pelo [id]
const removeTimeById = (id) => {
    Database.query(`
        delete from times where id = $1
    `, [id]
    )
}

//atualiza um time pelo [id]
const attTimeById = async ({id, nome, localidade}) => {
    const response = await Database.query(`
        update times 
        set nome = $2, localidade = $3
        where id = $1 
        returning *
    `, [id, nome, localidade]
    )

    return response.rows[0]
}

//verifica se existe jogadores ativos em um time passando o [id] do time
const procuraJogadorNoTimeById = async (id) => {  
    const response = await Database.query(`
        select jogadores.nome
        from jogadores 
        where jogadores.time = $1
    `, [id]
    )
    return response.rows[0]
}

//retorna a lista de jogadores ativos em um time passando o [id] do time
const mostraJogadorNoTimeById = async (id) => {  
    const response = await Database.query(`
        select jogadores.nome, jogadores.id
        from jogadores 
        where jogadores.time = $1
    `, [id]
    )
    return response.rows
}

module.exports = {procuraTodosTimes, procuraTimeById, procuraTimeByIdTodo, adicionaTime, removeTimeById, attTimeById, procuraJogadorNoTimeById, mostraJogadorNoTimeById};