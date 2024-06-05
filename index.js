import { fastify } from 'fastify'
import { DatabaseMemoryUser, DatabaseMemoryEvent } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemoryUser()
const databaseEvent = new DatabaseMemoryEvent()


//GET, POST, PUT, DELETE, PATCH(pequena informação)

//autenticate

server.post('/api/auth/signup', (request, reply) => {
    const { username, password } = request.body

    if (!username || !password) {
        return reply.status(400).send({ error: 'Username and password are required' });
    }

    database.create({
        username,
        password
    })

    return reply.status(201).send()
})

server.post('/api/auth/login', (request, reply) => {
    const { username, password } = request.body
    
    const userId = database.login({ username, password })

    if(userId) {
        return reply.status(201).send({ message: 'Login successful' })
    } else {
        return reply.status(401).send({ error: 'Invalid username or password' });
    }

})

//events

server.post('/api/events', (request, reply) => {
    const { title, description, quantities, value } = request.body

    databaseEvent.create({
        title,
        description,
        quantities,
        value
    })

    return reply.status(201).send()

})

server.get('/api/events', (request, reply) => {

    return reply.status(200).send(databaseEvent.list())

})

server.get('/api/events/:id', (request, reply) => {

    const eventId = request.params.id

    const evento = databaseEvent.view(eventId)

    if (evento) {
        return reply.status(200).send(evento);
    } else {
        return reply.status(404).send({ error: 'Event not found' });
    }

})

server.put('/api/events/:id', () => {
})

server.delete('/api/events/:id', () => {
})

//ticket

server.post('/api/tickets', () => {
})

server.get('/api/tickets', () => {
})

server.post('/api/tickets/buy', () => {
})

server.get('/api/tickets/availability/:eventId', () => {
})

/*

Autenticação
POST /api/auth/signup: Cadastro de usuário + - USUARIO , SENHA -
POST /api/auth/login: Login de usuário + 
Eventos
POST /api/events: Criação de evento - TITULO, DESCRIÇÃO, QUANTIDADE DE INGRESSOS, VALOR - +
GET /api/events: Listagem de eventos + 
GET /api/events/:id: Detalhes de um evento +
PUT /api/events/:id: Edição de evento 
DELETE /api/events/:id: Exclusão de evento
Ingressos
POST /api/tickets: Venda de ingresso
GET /api/tickets: Listagem de ingressos vendidos
POST /api/tickets/buy: Compra de ingresso
GET /api/tickets/availability/:eventId: Verificar disponibilidade de ingressos para um evento

*/

server.listen({
    port: 1202
})