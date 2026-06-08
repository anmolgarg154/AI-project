export default function Message({ messages }) {
  return (
    <div className="chatArea">
      {messages.map((m, i) => (
        <div key={i}>
          {m.role === "user" ? (
            <div className="userMsg">🧑 {m.text}</div>
          ) : (
            <div className="botMsg">🤖 {m.text}</div>
          )}
        </div>
      ))}
    </div>
  );
}