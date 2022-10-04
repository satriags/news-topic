// import { db } from './db'
import fastify from 'fastify'

const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'possng\n'
})


// server.get('/list', async (req, reply) => {
//   console.log(req);
//   // server.pg.query(
//   //   'SELECT id, username, hash, salt FROM users WHERE id=$1', [req.params.id],
//   //   function onResult(err, result) {
//   //     reply.send(err || result)
//   //   }
//   // )
// })


server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})


server.register(require('@fastify/postgres'), {
  connectionString: 'postgres://postgres@localhost/postgres'
})

server.get('/user/:id', async (req, reply) => {
  console.log(req);
  // server.pg.query(
  //   'SELECT id, username, hash, salt FROM users WHERE id=$1', [req.params.id],
  //   function onResult(err, result) {
  //     reply.send(err || result)
  //   }
  // )
})