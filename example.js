'use strict'

const fastify = require('fastify')({
  logger: {
    level: 'debug',
  },
})

fastify.register(require('./')).after((err) => {
  fastify.log.error(err)
  // Register custom clean up handler
  fastify.gracefulShutdown((code, cb) => {
    fastify.log.info('Graceful shutdown ...')
    cb()
    fastify.log.info('Graceful shutdown complete')
  })
})

const schema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string',
          },
        },
      },
    },
  },
}

fastify.get('/', schema, async function (req, reply) {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
  reply.send({ hello: 'world' })
})

fastify.listen(
  {
    host: '127.0.0.1',
    port: 3000,
  },
  (err) => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
  },
)
