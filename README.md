# Api CRUD Universidades

## O que o usuário pode fazer

- Criar uma collection/tabela contendo várias universidades utilizando uma api externa
- Listar as universidades do banco de dados
- Listar os dados de uma universidade específica
- Cadastrar uma nova universidade
- Atualizar os dados de uma universidade específica
- Deletar uma universidade específica

## Endpoints

### GET /tabela - Criação da Collection/Tabela

#### Dados Enviados
 - Neste endpoint não haverá body

#### Dados Retornados
 - Todas as universidades cadastradas na nova collection/tabela



### GET /universities - Listar Universidades

#### Dados Enviados
 - Poderão ser passados dois query params (country e/ou page)
 - Neste endpoint não haverá body
 

#### Dados Retornados
 - Todas as universidades do banco de dados caso não tenha query params
 - As universidades de um determinado país caso tenha o query params "country"
 - As universidades de uma determinada página caso tenha o query params "page"
 - Lembrando que cada página tem 20 universidades


### GET /universities/:id - Obter Dados de uma Universidade

#### Dados Enviados
 - Neste endpoint não haverá body
 - "id" como parâmetro de rota

#### Dados Retornados
 - Dados da universidade de id igual ao parâmetro de rota


### POST /universities - Cadastro de uma Universidade

#### Dados Enviados
 - Body:
 -- domains
 -- alpha_two_code
 -- country
 -- web_pages
 -- name	
 -- state_province
 
 ##### Validações
 - domains -> deve ser um array de strings (obrigatório)
 - alpha_two_code -> deve ser uma string de 2 caracteres (obrigatório)
 - country -> deve ser uma stying (obrigatório)
 - web_pages -> deve ser um array de strings (obrigatório)
 - name -> deve ser uma string (obrigatório)
 - state_province -> deve ser uma string (não é obrigatório)

 OBS: Não será possível cadastrar uma universidade caso já exista uma com o mesmo nome, estado e país
    
#### Dados Retornados
 - sucesso/erro


### PUT /universities/:id - Atualizar os Dados de uma Universidade

#### Dados Enviados
 - "id" como parâmetro de rota
 - body:
 -- web_pages
 -- name
 -- domains
 
 ##### Validações
 - web_pages -> deve ser um array de strings (obrigatório)
 - name -> deve ser uma string (obrigatório)
 - domains -> deve ser um array de strings (obrigatório)
 
 OBS: Caso já exista uma universidade com o nome passado no body e que seja do mesmo estado e país, não será possível realizar a atualização.

#### Dados Retornados
 - sucesso/erro


### DELETE /universities/:id - Excluir uma Universidade

#### Dados Enviados
 - Neste endpoint não haverá body
 - "id" como parâmetro de rota

#### Dados Retornados
 - sucesso/erro
