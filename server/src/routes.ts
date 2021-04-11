import express from "express"
import knex from "./database/connection"
import PointController from "./controllers/PointController"

const pointController = new PointController()
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

routes.post("/points", pointController.create)

export default routes