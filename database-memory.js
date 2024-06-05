import { randomUUID } from "node:crypto"

export class DatabaseMemoryUser {
    #usuarios = new Map()

    list(){
        return Array.from(this.#usuarios.values())
    }

    create(user){
        const userId = randomUUID()
        this.#usuarios.set(userId, user)
        //return console.log("Usuario criado")
    }

    login({username, password}){
        for (let [userId, user] of this.#usuarios) {
            if (user.username === username && user.password === password) {
                return userId
            }
        }
        return null
    }

}

export class DatabaseMemoryEvent {
    #eventos = new Map()

    list(){
        return Array.from(this.#eventos.entries()).map((eventArray) => {
            const id = eventArray[0]
            const data = eventArray[1]

            return {
                id,
                ...data,
            }
        })
    }

    create(evento){
        const eventId = randomUUID()
        this.#eventos.set(eventId, evento)
    }

    view(id){
        for (let [eventId, evento] of this.#eventos) {
            if (eventId === id) {
                return {
                    //...evento
                    title: evento.title,
                    description: evento.description
                }
            }
        }
        return null
    }

}