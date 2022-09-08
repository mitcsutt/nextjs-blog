// import getKnex from 'getKnex'

// export default async function handler(req, res) {
//   const knex = getKnex()
// 	const todo = knex('todos')
//   .where({ id: 42 })
//   .update({ 
//     title: "The Hitchhiker's Guide to the Galaxy" 
//   }, ['id', 'title'])
//   res.status(200).json(todos)
// }