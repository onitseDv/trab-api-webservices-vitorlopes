require('dotenv').config(); //traz as informações do arquivo .env criado para conexão com o bd
const express = require ('express');
const morgan = require ('morgan');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const serverApp = express (); //nome da aplicação
const porta = 3000;

const rotasIndex = require ('./src/Rotas/aRotasIndex');

serverApp.use(morgan('dev')); //log de execução
serverApp.use(bodyParser.urlencoded({extended: false})); //módulo capaz de converter o corpo da requisição para vários formatos
serverApp.use(express.json()); //determinar o tipo de dados que quero receber
serverApp.use(cors());
serverApp.use(rotasIndex);

serverApp.listen (porta, ()=> {
    console.log(`Server on - http://localhost:${porta}/`)
});

