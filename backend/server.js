import 'dotenv/config'
import express from 'express'
import chatRouter from './routes/chat.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json({ limit: '32kb' }))

app.get('/', (request, response) => {
    response.json({
        status: 'ok',
        message: 'MARK ICON API is running.'
    })
})

app.use('/api/chat', chatRouter)

app.use((error, request, response, next) => {
    if (error.type === 'entity.too.large') {
        response.status(413).json({ error: 'Request body is too large.' })
        return
    }

    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        response.status(400).json({ error: 'Invalid request.' })
        return
    }

    next(error)
})

app.use((error, request, response, next) => {
    console.error('Unhandled API error:', error)
    response.status(500).json({
        error: 'The assistant is unavailable right now.'
    })
})

export default app