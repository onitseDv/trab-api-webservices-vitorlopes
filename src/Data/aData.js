//arquivo para algumas definições e comunicação com o bd

const {Pool} = require ('pg');

const {HOST_DB, PORT_DB, DATABASE_DB, USER_DB, PASSWORD_DB} = process.env; //chama o arquivo .env e preenche as informações

console.log(
    !HOST_DB ? 'HOST_DB não está configurado corretamente no .env'
    : !PORT_DB ? 'PORT_DB não está configurado corretamente no .env'
    : !DATABASE_DB ? 'DATABASE_DB não está configurado corretamente no .env'
    : !USER_DB ? 'USER_DB não está configurado corretamente no .env'
    : !PASSWORD_DB ? 'PASSWORD_DB não está configurado corretamente no .env'
    : 'Banco configurado corretamente no .env'
)

module.exports = new Pool ({
    host: HOST_DB,
    port: Number(PORT_DB),
    database: DATABASE_DB,
    user: USER_DB,
    password: PASSWORD_DB
});