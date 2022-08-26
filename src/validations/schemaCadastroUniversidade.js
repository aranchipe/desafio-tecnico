const yup = require('./settings')

const schemaCadastroUniversidade = yup.object().shape({
    alpha_two_code: yup
        .string()
        .length(2 | 'O campo alpha_two_code deve ter 2 caracteres')
        .required('O campo alpha_two_code é obrigatório'),
    web_pages: yup
        .array()
        .required('O campo web_pages é obrigatório'),
    name: yup
        .string()
        .required('O campo name é obrigatório'),
    country: yup
        .string()
        .required('O campo country é obrigatório'),
    domains: yup
        .array()
        .required('O campo domains é obrigatório')

})

module.exports = {
    schemaCadastroUniversidade
}