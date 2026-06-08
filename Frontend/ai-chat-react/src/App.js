import { useEffect, useState } from "react";
import { sendMessage, getHistory } from "./api/chatApi";
import "./App.css";

function App() {
  const [sessions, setSessions] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  const activeSession = sessions.find((s) => s.id === activeId);

  // Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  // Load history
  useEffect(() => {
    const load = async () => {
      const data = await getHistory();

      const session = {
        id: Date.now(),
        title: "Saved Chat",
        messages: data.flatMap((d) => [
          { role: "user", text: d.question },
          { role: "ai", text: d.answer },
        ]),
      };

      setSessions([session]);
      setActiveId(session.id);
    };

    load();
  }, []);

  // NEW CHAT
  const newChat = () => {
    const session = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setSessions((prev) => [session, ...prev]);
    setActiveId(session.id);
  };

  // SEND MESSAGE
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeId
          ? { ...s, messages: [...s.messages, userMsg] }
          : s
      )
    );

    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input);

      const aiMsg = { role: "ai", text: res.answer };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeId
            ? { ...s, messages: [...s.messages, aiMsg] }
            : s
        )
      );
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // toggle theme
  const toggleTheme = () => {
    setDark((prev) => {
      localStorage.setItem("theme", !prev ? "dark" : "light");
      return !prev;
    });
  };

  return (
    <div className={dark ? "app dark" : "app"}>

      {/* SIDEBAR */}
      <div className="sidebar">

        <button className="btn new" onClick={newChat}>
          + New Chat
        </button>

        <button className="btn theme" onClick={toggleTheme}>
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <h3>Chats</h3>

        {sessions.map((s) => (
          <div
            key={s.id}
            className={`item ${activeId === s.id ? "active" : ""}`}
            onClick={() => setActiveId(s.id)}
          >
            {s.title}
          </div>
        ))}
      </div>

      {/* CHAT */}
      <div className="chat">

        <div className="messages">
          {activeSession?.messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "user" : "ai"}
            >
              {m.text}
            </div>
          ))}

          {loading && (
            <div className="ai typing">
              🤖 Thinking...
            </div>
          )}
        </div>

        <div className="inputBox">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button onClick={handleSend}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;