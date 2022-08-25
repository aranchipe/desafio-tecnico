const knex = require('../database/connection');
const api = require('../services/axios')

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


module.exports = {
    criacaoDaTabela,
    listarUniversidades
}