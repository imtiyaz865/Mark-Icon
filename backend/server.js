import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import markRouter from './routes/chat.js'

const app = express()

app.disable('x-powered-by')

app.use(cors())

app.use(express.json({ limit: '32kb' }))

app.get('/', (request, response) => {
    response.json({
        status: 'ok',
        message: 'MARK ICON API is running.'
    })
})

app.use('/api/chat', markRouter)

app.use((error, request, response, next) => {
    console.error('Unhandled API error:', error)

    if (error?.type === 'entity.too.large') {
        return response.status(413).json({
            error: 'Request body is too large.'
        })
    }

    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return response.status(400).json({
            error: 'Invalid request.'
        })
    }

    next(error)
})

app.use((error, request, response, next) => {
    console.error('Unhandled API error:', error)

    response.status(500).json({
        error: 'The assistant is unavailable right now.'
    })
})

const PORT = process.env.PORT || 8787

app.listen(PORT, () => {
    console.log(`MARK ICON API running on http://localhost:${PORT}`)
})

export default app