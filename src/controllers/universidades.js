const knex = require('../database/connection');
const api = require('../services/axios')
const { schemaCadastroUniversidade } = require("../validations/schemaCadastroUniversidade");


const criacaoDaTabela = async (req, res) => {

    const response = await api.get('/search')

    const universidades = response.data.filter((item) => {
        return item.country === 'Uruguay' ||
            item.country === 'Brazil' ||
            item.country === 'Argentina' ||
            item.country === 'Chile' ||
            item.country === 'Paraguay' ||
            item.country === 'Colombia' ||
            item.country === 'Peru' ||
            item.country === 'Suriname'
    })

    universidades.map(async (item) => {
        await knex('universidades').insert({
            domains: item.domains,
            alpha_two_code: item.alpha_two_code,
            country: item.country,
            web_pages: item.web_pages,
            name: item.name,
            state_province: item['state-province']
        })
    })

    return res.status(200).json(universidades)
}

const listarUniversidades = async (req, res) => {
    const { country, page } = req.query

    try {
        if (country && page) {
            const universidades = await knex('universidades')
                .select('id', 'name as nome', 'country as país', 'state_province as estado')
                .where('country', country)
                .offset((Number(page) - 1) * 20)
                .limit(20)
                .orderBy('id')

            return res.status(200).json(universidades)
        }
        if (country) {
            const universidades = await knex('universidades')
                .select('id', 'name as nome', 'country as país', 'state_province as estado')
                .where('country', country)
                .orderBy('id')
            return res.status(200).json(universidades)
        }

        if (page) {
            const universidades = await knex('universidades')
                .select('id', 'name as nome', 'country as país', 'state_province as estado')
                .offset((Number(page) - 1) * 20)
                .limit(20)
                .orderBy('id')
            return res.status(200).json(universidades)
        }

        const universidades = await knex('universidades')
            .select('id', 'name as nome', 'country as país', 'state_province as estado')
            .orderBy('id')
        return res.status(200).json(universidades)

    } catch (error) {
        return res.status(400).json({ "mensagem": error.message })
    }
}

const obterUniversidade = async (req, res) => {
    const { id } = req.params

    try {
        const universidade = await knex('universidades')
            .where({ id })
            .first()

        if (!universidade) {
            return res.status(404).json({ "mensagem": "Universidade não encontrada" })
        }

        return res.status(200).json(universidade)
    } catch (error) {
        return res.status(400).json({ "messagem": error.message })

    }
}

const cadastrarUniversidade = async (req, res) => {
    const { alpha_two_code, web_pages, name, country, domains, state_province } = req.body

    try {
        await schemaCadastroUniversidade.validate(req.body)

        if (state_province) {
            const univEncontrada = await knex('universidades')
                .where({ name, country, state_province })

            if (univEncontrada.length !== 0) {
                return res.status(400).json({ "mensagem": "Esta universidade já foi cadastrada" })
            }
        }

        const univCadastrada = await knex('universidades')
            .insert({
                alpha_two_code,
                web_pages,
                name,
                country,
                domains,
                state_province
            })

        if (univCadastrada.length === 0) {
            return res.status(400).json({ "mensagem": "Não foi possível cadastrar esta universidade" })
        }

        return res.status(200).json(univCadastrada.rows)
    } catch (error) {
        return res.status(400).json({ "messagem": error.message })

    }

}

module.exports = {
    criacaoDaTabela,
    listarUniversidades,
    obterUniversidade,
    cadastrarUniversidade
}