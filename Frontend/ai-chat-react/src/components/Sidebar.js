export default function Sidebar({
  sessions,
  activeId,
  onSelect,
  onNewChat,
}) {
  s
  return (
    <div className="sidebar">

      <button className="newChatBtn" onClick={onNewChat}>
        + New Chat
      </button>

      <h3>History</h3>

      {sessions.map((s) => (
        <div
          key={s.id}
          className={`sessionItem ${activeId === s.id ? "active" : ""}`}
          onClick={() => onSelect(s.id)}
        >
          {s.title}
        </div>
      ))}
    </div>
  );
}