const express = require ('express');

const TimeController = require('../Controllers/aTimeController');
const JogadorController = require('../controllers/aJogadorController');
const TransferenciaController = require('../controllers/aTransferenciaController');
const TorneioController = require('../controllers/aTorneioController');
const PartidaController = require('../controllers/aPartidaController');
const EventoController = require('../controllers/aEventoController');

const controllers = express.Router();

controllers.use('/times', TimeController);
controllers.use('/jogadores', JogadorController);
controllers.use('/transferencias', TransferenciaController);
controllers.use('/torneios', TorneioController);
controllers.use('/partidas', PartidaController);
controllers.use('/eventos', EventoController);

module.exports = controllers; 