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
        aria-label={open ? 'Close build desk' : 'Open build desk'}
      >
        {open ? 'x' : 'V'}
        {!open && <span className="chat-fab-ping"></span>}
      </button>
    </>
  )
}
