import { useEffect, useState } from "react";
import { socket } from "./services/socket";
import { fetchMessages } from "./services/api";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import UsernamePrompt from "./components/UsernamePrompt";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("chat_username") || "");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [onlineCount, setOnlineCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    fetchMessages()
      .then((res) => setMessages(res.data))
      .catch(() => setError("Could not load chat history"));

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    socket.on("user_typing", (user) => setTypingUser(user));
    socket.on("user_stopped_typing", () => setTypingUser(null));
    socket.on("user_count", (count) => setOnlineCount(count));
    socket.on("error_message", (msg) => setError(msg));
    socket.on("connect_error", () => setError("Connection lost. Retrying..."));

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_stopped_typing");
      socket.off("user_count");
      socket.off("error_message");
      socket.off("connect_error");
    };
  }, [username]);

  if (!username) return <UsernamePrompt onSubmit={setUsername} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
      <div className="mx-auto flex h-screen max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-4 flex items-center justify-between rounded-2xl border border-slate-700/80 bg-slate-900/80 px-5 py-4 shadow-lg shadow-slate-950/40 backdrop-blur-sm">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-indigo-300">Swift Chat</p>
            <h1 className="mt-1 text-2xl font-semibold text-white">Chat room</h1>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="text-sm font-medium text-emerald-200">{onlineCount} online</span>
          </div>
        </header>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        )}

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/70 shadow-2xl shadow-slate-950/30">
          <MessageList messages={messages} currentUser={username} />

          {typingUser && typingUser !== username && (
            <div className="border-t border-slate-700/70 bg-slate-950/40 px-4 py-2 text-sm text-slate-300">
              <span className="font-medium text-indigo-300">{typingUser}</span> is typing...
            </div>
          )}

          <MessageInput username={username} />
        </div>
      </div>
    </div>
  );
}

export default App;