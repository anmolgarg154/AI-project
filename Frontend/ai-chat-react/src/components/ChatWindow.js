import Message from "./Message";
import InputBox from "./InputBox";

export default function ChatWindow({ session, onSend, loading }) {
  return (
    <div className="chatWindow">
      <Message messages={session?.messages || []} />

      {loading && <div className="loading">Thinking...</div>}

      <InputBox onSend={onSend} />
    </div>
  );
}