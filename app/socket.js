const express = require('express')
const cors = require('cors')

const config = require('@config/index')
const clr = require('@utils/config/logcolor.config')
const { corsOptions } = require('@config/cors')

const app = express()

app.use(cors(corsOptions))

const expressWs = require('express-ws')(app)

const PORT = config.WS_PORT || 8766

app.ws('/start', (ws, req) => {
    ws.on('message', (data) => {
        expressWs.getWss().clients.forEach((client) => {
            client.send(data)
        })
        // ws.send(data)
    })
})

app.listen(PORT, () => {
    console.info(`${clr.fg.magenta}Socket  : ⚡ Listening on port ` + PORT)
})
