const express = require('express');
const { criacaoDaTabela, listarUniversidades } = require('./controllers/universidades');
const rotas = express()

rotas.get('/tabela', criacaoDaTabela)
rotas.get('/universities', listarUniversidades)





module.exports = rotas
