import { useState } from 'react'
import ChatAssistant from './ChatAssistant'

export default function FloatingChat() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div className="chat-panel-wrap">
          <ChatAssistant onClose={() => setOpen(false)} />
        </div>
      )}
      <button
        type="button"
        className="chat-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
      >
        {open ? '×' : '💬'}
        {!open && <span className="chat-fab-ping"></span>}
      </button>
    </>
  )
}
