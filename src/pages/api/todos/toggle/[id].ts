import getKnex from 'getKnex'
import { NextApiRequest, NextApiResponse } from 'next'

const put = async(req: NextApiRequest, res: NextApiResponse) => {
  const knex = getKnex()

  const { id } = req.query
  const { complete } = req.body

  if(!id || typeof id !== 'string') {
    return res.status(400)
  }

  const todo = knex('todos')
    .where({ id: parseInt(id) })
    .update({ 
      complete
    })
  res.status(200).json(todo)
}

export default async(req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method){
    case "PUT": put(req, res)
    default: res.status(404)
  }
}