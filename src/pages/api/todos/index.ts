import getKnex from 'getKnex'
import { NextApiRequest, NextApiResponse } from 'next'

export default async(req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method){
    case "GET": {
      const knex = getKnex()

      const todos = await knex('todos')

      res.status(200).json(todos)
    }
    case "POST": {
      const knex = getKnex()

      const { text } = req.body
      const todo = await knex.insert({
        complete: false,
        text: text,
      }).into('todos')

      res.status(201).json(todo)
    }
    default: res.status(404)
  }
  return res
}