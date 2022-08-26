const express = require('express');
const { criacaoDaTabela, listarUniversidades, obterUniversidade, cadastrarUniversidade } = require('./controllers/universidades');
const rotas = express()

rotas.get('/tabela', criacaoDaTabela)
rotas.get('/universities', listarUniversidades)
rotas.get('/universities/:id', obterUniversidade)
rotas.post('/universities', cadastrarUniversidade)





module.exports = rotas
