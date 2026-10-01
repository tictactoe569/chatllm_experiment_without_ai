const { useEffect, useState } = React;

function Sidebar({ sessions, activeSessionId, onSelectSession, onNewSession, onDeleteSession, onUpdateSysPrompt }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={onNewSession}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="8" y1="2" x2="8" y2="14" />
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
          Novo chat
        </button>
        <label>
        System Prompt: <input id="1" name="SP" onKeyDown={e => {if (e.key === "Enter") {onUpdateSysPrompt(document.getElementById("1").value)}}} />
      </label>
      </div>
      
      <div className="sidebar-list">
        {sessions.map((s) => (
          <div
            key={s.id}
            className={`sidebar-item ${s.id === activeSessionId ? "active" : ""}`}
            onClick={() => onSelectSession(s.id)}
          >
            <span className="sidebar-item-title">{s.title}</span>
            <button
              className="sidebar-item-del"
              onClick={(e) => { e.stopPropagation(); onDeleteSession(s.id); }}
              title="Excluir sessao"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="2" y1="2" x2="10" y2="10" />
                <line x1="10" y1="2" x2="2" y2="10" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}