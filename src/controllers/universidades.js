const knex = require('../database/connection');
const api = require('../services/axios')
const { schemaCadastroUniversidade } = require("../validations/schemaCadastroUniversidade");
const { schemaAttUniversidade } = require("../validations/schemaAttUniversidade");


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

const listarUniv = async (req, res) => {
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

const obterUniv = async (req, res) => {
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

const cadastrarUniv = async (req, res) => {
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

        return res.status(200).json('Universidade cadastrada com sucesso')
    } catch (error) {
        return res.status(400).json({ "messagem": error.message })

    }

}

const atualizarUniv = async (req, res) => {
    const { id } = req.params

    const { web_pages, name, domains } = req.body

    try {
        await schemaAttUniversidade.validate(req.body)

        const univEncontrada = await knex('universidades').where({ id })

        if (univEncontrada.length === 0) {
            return res.status(404).json("Universidade não encontrada")
        }

        const univsComMesmoNome = await knex('universidades').where({ name })

        const univsDuplicadas = univsComMesmoNome.filter((item) => {
            return item.country === univEncontrada[0].country && item.state_province === univEncontrada[0].state_province
        })

        if (univsDuplicadas.length !== 0) {
            return res.status(400).json('Já existe universidade com o mesmo nome, estado e país')
        }

        const univCadastrada = await knex('universidades')
            .update({
                web_pages,
                name,
                domains
            })
            .where({ id })

        if (univCadastrada.length === 0) {
            return res.status(400).json('Não foi possível atualizar os dados da universidade')
        }

        return res.status(200).json('Universidade atualizada com sucesso')
    } catch (error) {
        return res.status(400).json({ "messagem": error.message })
    }
}

const deletarUniv = async (req, res) => {
    const { id } = req.params

    try {
        const universidade = await knex('universidades')
            .where({ id })
            .first()

        if (!universidade) {
            return res.status(404).json({ "mensagem": "Universidade não encontrada" })
        }

        const univDeletada = await knex('universidades').del().where({ id })

        if (univDeletada.length === 0) {
            return res.status(400).json('Não foi possível deletar a universidade')
        }

        return res.status(200).json('Universidade deletada com sucesso')
    } catch (error) {
        return res.status(400).json({ "messagem": error.message })
    }

}


module.exports = {
    criacaoDaTabela,
    listarUniv,
    obterUniv,
    cadastrarUniv,
    atualizarUniv,
    deletarUniv
}