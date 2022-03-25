const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const { useSocketServer } = require('socket-controllers')
const cors = require('cors')
const dotenv = require('dotenv')
import 'reflect-metadata'

const { Controller } = require('./controllers')

dotenv.config({ path: `${__dirname}/../.env` })
const host = process.env.HOST as string
const port = process.env.SOCKETSERVERPORT as string

const corsOptions = {
  origin: '*',
  methods: ['GET']
}

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: corsOptions
})

useSocketServer(io, { controllers: [Controller] })

app.use(cors(corsOptions))
app.use(express.json())

server.listen(port, host, () => {
  console.log(`listening on ${host}:${port}...`)
})
