import knex from "../database/connection"
import { Request, Response } from "express"

class PointController{
    async create(request: Request, response: Response){
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
    }
}

export default PointController