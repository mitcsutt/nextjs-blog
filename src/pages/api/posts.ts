import getKnex from 'getKnex'
import { NextApiRequest, NextApiResponse } from 'next'

export default async(req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method){
    case "POST": {
      const knex = getKnex()

      const { title, contents } = req.body
      const post = await knex.insert({
        title,
				contents
      }).into('posts')
      res.status(201).json(post)
    }
    default: res.status(404)
  }
}