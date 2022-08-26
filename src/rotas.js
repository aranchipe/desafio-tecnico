const express = require('express');
const { criacaoDaTabela, listarUniv, obterUniv, cadastrarUniv, atualizarUniv, deletarUniv } = require('./controllers/universidades');
const rotas = express()

rotas.get('/tabela', criacaoDaTabela)
rotas.get('/universities', listarUniv)
rotas.get('/universities/:id', obterUniv)
rotas.post('/universities', cadastrarUniv)
rotas.put('/universities/:id', atualizarUniv)
rotas.delete('/universities/:id', deletarUniv)



module.exports = rotas
