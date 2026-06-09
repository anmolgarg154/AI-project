import { useEffect, useState } from "react";
import {sendMessage, getHistory} from "./api/chatApi";

import "./App.css";

function App() {
  const [sessions, setSessions] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  const activeSession = sessions.find(
    (s) => s.id === activeId
  );

  // Theme Load
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDark(true);
    }
  }, []);

  // Load History
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history =
          await getHistory();

        if (
          history &&
          history.length > 0
        ) {
          const session = {
            id: Date.now(),
            title: "Previous Chats",
            messages: history.flatMap(
              (item) => [
                {
                  role: "user",
                  text: item.question,
                },
                {
                  role: "ai",
                  text: item.answer,
                },
              ]
            ),
          };

          setSessions([session]);
          setActiveId(session.id);
        } else {
          const newSession = {
            id: Date.now(),
            title: "New Chat",
            messages: [],
          };

          setSessions([newSession]);
          setActiveId(newSession.id);
        }
      } catch (error) {
        console.error(
          "History Load Error:",
          error
        );

        const newSession = {
          id: Date.now(),
          title: "New Chat",
          messages: [],
        };

        setSessions([newSession]);
        setActiveId(newSession.id);
      }
    };

    loadHistory();
  }, []);

  // Create New Chat
  const newChat = () => {
    const session = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setSessions((prev) => [
      session,
      ...prev,
    ]);

    setActiveId(session.id);
  };

  // Send Message
  const handleSend = async () => {
    if (!input.trim()) return;

    if (loading) return;

    const currentInput = input;

    const userMessage = {
      role: "user",
      text: currentInput,
    };

    setInput("");

    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeId
          ? {
              ...session,
              messages: [
                ...session.messages,
                userMessage,
              ],
            }
          : session
      )
    );

    setLoading(true);

    try {
      const conversation =
        await sendMessage(
          currentInput
        );

      const aiMessage = {
        role: "ai",
        text:
          conversation.answer,
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeId
            ? {
                ...session,
                messages: [
                  ...session.messages,
                  aiMessage,
                ],
              }
            : session
        )
      );
    } catch (error) {
      console.error(
        "Send Error:",
        error
      );

      alert(
        error.message ||
          "Failed to get AI response"
      );
    } finally {
      setLoading(false);
    }
  };

  // Theme Toggle
  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;

      localStorage.setItem(
        "theme",
        next ? "dark" : "light"
      );

      return next;
    });
  };

  return (
    <div
      className={
        dark ? "app dark" : "app"
      }
    >
      {/* Sidebar */}
      <div className="sidebar">
        <button
          className="btn new"
          onClick={newChat}
        >
          + New Chat
        </button>

        <button
          className="btn theme"
          onClick={toggleTheme}
        >
          {dark
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}
        </button>

        <h3>History</h3>sd

        {sessions.map((session) => (
          <div
            key={session.id}
            className={`item ${
              activeId === session.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveId(
                session.id
              )
            }
          >
            {session.title}
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="chat">
        <div className="messages">
          {activeSession?.messages.map(
            (message, index) => (
              <div
                key={index}
                className={
                  message.role ===
                  "user"
                    ? "user"
                    : "ai"
                }
              >
                {message.text}
              </div>
            )
          )}

          {loading && (
            <div className="ai typing">
              🤖 Thinking...
            </div>
          )}
        </div>

        <div className="inputBox">
          <input
            type="text"
            value={input}
            placeholder="Ask anything..."
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter"
              ) {
                handleSend();
              }
            }}
          />

          <button
            onClick={handleSend}
            disabled={loading}
          >
            {loading
              ? "Thinking..."
              : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;