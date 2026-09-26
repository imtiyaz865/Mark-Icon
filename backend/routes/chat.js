import { Router } from 'express'
import { GoogleGenAI } from '@google/genai'

const router = Router()
const MAX_MESSAGES = 20

const SYSTEM_INSTRUCTION = `You are the official MARK ICON agency AI assistant. Be concise, friendly, and professional.

You may answer questions only from this website context:
- MARK ICON is a creative agency.
- Services: Brand & Visual Identity, Creative Direction, Video & Motion, Social Content, Digital Experiences.
- Recent work: Axis / Identity System (Brand identity, 2026), Northstar / Digital (Digital experience, 2025), Object / Campaign (Content direction, 2025).
- The agency helps create distinct brands, digital experiences, and content people remember.
- For project enquiries, guide the visitor to the website's final CTA and contact flow at hello@markicon.studio.

Never invent clients, pricing, awards, services, projects, timelines, or other agency facts. If the answer is not in this context, say that you do not have that information and invite the visitor to start a project through the contact flow.`

function normalizeMessages(input) {
  if (!Array.isArray(input)) return []
  return input
    .slice(-MAX_MESSAGES)
    .filter((message) => message && (message.role === 'user' || message.role === 'model'))
    .map((message) => ({
      role: message.role,
      parts: [{ text: String(message.content || '').trim().slice(0, 4000) }],
    }))
    .filter((message) => message.parts[0].text)
}

router.post('/', async (request, response) => {
  if (!process.env.GEMINI_API_KEY) {
    response.status(503).json({ error: 'AI assistant is not configured yet.' })
    return
  }

  const message = String(request.body?.message || '').trim()
  if (!message) {
    response.status(400).json({ error: 'Please enter a message.' })
    return
  }

  const contents = [
    ...normalizeMessages(request.body?.messages),
    { role: 'user', parts: [{ text: message.slice(0, 4000) }] },
  ]

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 240,
      },
    })
    const reply = result.text?.trim()
    if (!reply) throw new Error('Gemini returned an empty response.')
    response.json({ reply })
  } catch (error) {
    console.error('Gemini request failed:', error.message)
    response.status(502).json({ error: 'The assistant is unavailable right now. Please try again.' })
  }
})

export default router
