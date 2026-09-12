import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from '../lib/gsap'
import { useTheme } from '../hooks/useTheme'

const INITIAL_MESSAGE = {
  role: 'model',
  content: 'Hi, I’m your AI assistant. What can we make clearer, sharper, or more memorable?',
}

export default function Chatbot() {
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const panel = useRef(null)
  const inputRef = useRef(null)
  const endRef = useRef(null)

  useLayoutEffect(() => {
    const element = panel.current
    if (!element) return undefined

    if (open) {
      gsap.fromTo(element, { autoAlpha: 0, y: 18, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' })
      return () => gsap.killTweensOf(element)
    }

    gsap.set(element, { autoAlpha: 0, y: 18, scale: 0.98 })
    return undefined
  }, [open])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [open, messages, isSending])

  const sendMessage = async (event) => {
    event.preventDefault()
    const message = input.trim()
    if (!message || isSending) {
      if (!message) setError('Write a message first.')
      return
    }

    setError('')
    setInput('')
    setMessages((current) => [...current, { role: 'user', content: message }])
    setIsSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          messages: messages.map(({ role, content }) => ({ role, content })),
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'The assistant is unavailable right now.')
      setMessages((current) => [...current, { role: 'model', content: data.reply }])
    } catch (requestError) {
      setError(requestError.message || 'Network error. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7" data-theme={theme}>
      <div
        ref={panel}
        id="mark-icon-chat"
        className={`w-[min(calc(100vw-2rem),24rem)] origin-bottom-right border border-(--line-strong) bg-(--bg) text-(--text) shadow-(--shadow) ${open ? 'pointer-events-auto visible' : 'pointer-events-none invisible'}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-(--line) px-4 py-3">
          <div>
            <p className="m-0 font-[var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">MARK ICON</p>
            <h2 className="m-0 text-[0.98rem] font-medium tracking-[-0.02em]">Studio assistant</h2>
          </div>
          <button className="p-2 text-[var(--text-muted)] transition-colors hover:text-[var(--text)]" type="button" onClick={() => setOpen(false)} aria-label="Close chat">
            ×
          </button>
        </div>
        <div className="flex h-[min(55vh,25rem)] flex-col gap-4 overflow-y-auto px-4 py-4" aria-live="polite">
          {messages.map((item, index) => (
            <div className={`max-w-[88%] text-[0.88rem] leading-[1.5] ${item.role === 'user' ? 'self-end bg-[var(--accent)] px-3 py-2 text-[var(--accent-text)]' : 'self-start text-[var(--text-muted)]'}`} key={`${item.role}-${index}`}>
              {item.content}
            </div>
          ))}
          {isSending && <div className="self-start font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.12em] text-[var(--accent)]">Thinking…</div>}
          <div ref={endRef} />
        </div>
        <form className="border-t border-[var(--line)] p-3" onSubmit={sendMessage}>
          {error && <p className="m-0 mb-2 text-[0.76rem] text-[var(--accent)]" role="alert">{error}</p>}
          <div className="flex items-end gap-2 border border-[var(--line-strong)] px-2 py-1.5 focus-within:border-[var(--accent)]">
            <textarea
              ref={inputRef}
              className="min-h-8 flex-1 resize-none bg-transparent py-1 text-[0.88rem] leading-[1.4] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  sendMessage(event)
                }
              }}
              placeholder="Ask about the studio…"
              rows="1"
              maxLength="2000"
              disabled={isSending}
              aria-label="Message"
            />
            <button className="px-2 py-1 text-[0.78rem] font-medium text-[var(--accent)] transition-colors hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={isSending || !input.trim()}>
              Send
            </button>
          </div>
        </form>
      </div>
      <button
        className="group flex h-12 items-center gap-2 border border-[var(--line-strong)] bg-[var(--bg)] px-4 text-[0.82rem] font-medium text-[var(--text)] shadow-[var(--shadow)] transition-[background-color,color,border-color] duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-text)]"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="mark-icon-chat"
      >
        <span className="h-1.5 w-1.5 bg-[var(--accent)] transition-colors group-hover:bg-[var(--accent-text)]" aria-hidden="true" />
        {open ? 'Close chat' : 'Ask MARK ICON'}
      </button>
    </div>
  )
}
