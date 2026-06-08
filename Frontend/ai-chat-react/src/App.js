import { useEffect, useState } from "react";
import { sendMessage, getHistory } from "./api/chatApi";
import "./App.css";

function App() {
  const [sessions, setSessions] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const activeSession = sessions.find((s) => s.id === activeId);

  // Load history on start
  useEffect(() => {
    const load = async () => {
      const data = await getHistory();

      const session = {
        id: Date.now(),
        title: "Saved Chat",
        messages: data.map((d) => [
          { role: "user", text: d.question },
          { role: "ai", text: d.answer },
        ]).flat(),
      };

      setSessions([session]);
      setActiveId(session.id);
    };

    load();
  }, []);

  // NEW CHAT
  const handleNewChat = () => {
    const newSession = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveId(newSession.id);
  };

  // SEND MESSAGE (WITH LOADING)
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    // add user message immediately
    const updated = sessions.map((s) =>
      s.id === activeId
        ? { ...s, messages: [...s.messages, userMsg] }
        : s
    );

    setSessions(updated);
    setInput("");
    setLoading(true);

    try {
      // 🔥 AI call
      const res = await sendMessage(input);

      const aiMsg = {
        role: "ai",
        text: res.answer,
      };

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

  return (
    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">
        <button className="newBtn" onClick={handleNewChat}>
          + New Chat
        </button>

        <h3>History</h3>

        {sessions.map((s) => (
          <div
            key={s.id}
            className={`chatItem ${activeId === s.id ? "active" : ""}`}
            onClick={() => setActiveId(s.id)}
          >
            {s.title}
          </div>
        ))}
      </div>

      {/* CHAT AREA */}
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

          {/* 🔥 LOADING INDICATOR */}
          {loading && (
            <div className="ai typing">
              🤖 Thinking...
            </div>
          )}
        </div>

        {/* INPUT */}
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