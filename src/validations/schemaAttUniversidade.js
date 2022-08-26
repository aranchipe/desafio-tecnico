const yup = require('./settings')

const schemaAttUniversidade = yup.object().shape({

    web_pages: yup
        .array()
        .required('O campo web_pages é obrigatório'),
    name: yup
        .string()
        .required('O campo name é obrigatório'),
    domains: yup
        .array()
        .required('O campo domains é obrigatório')
})

module.exports = {
    schemaAttUniversidade
}