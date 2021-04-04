import express from "express"
import knex from "./database/connection"

const routes = express.Router()

routes.get("/itens", async (request, response) =>{
    const itens = await knex("itens").select("*")

    const serializedItens = itens.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}` 
        }
    }) 

    return response.json({itens: serializedItens})
})

routes.post("/points", async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        itens
    } = request.body

    const trx = await knex.transaction();

    const insertedIds = await trx("points").insert({
        image: "sem-imagem",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    })

    const point_id = insertedIds[0]

    const pointItens = itens.map((item_id: number) => {
        return{
            item_id,
            point_id
        }
    })

    await trx("point_itens").insert(pointItens)

    return response.json({message: "Ponto criado com sucesso", corpo: {
        image: "sem-imagem",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        itens: pointItens
    }})
})

export default routes