import { useState } from "react";
import { socket } from "../services/socket";

export default function MessageInput({ username }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    socket.emit("send_message", { username, text: trimmed });
    socket.emit("stop_typing");
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit("typing", username);
  };

  return (
    <div className="border-t border-slate-700/70 bg-slate-950/60 p-3 sm:p-4">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/80 p-2 shadow-inner shadow-slate-950/30">
        <input
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border-0 bg-transparent px-3 py-2 text-base text-white placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSend}
          className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
        >
          Send
        </button>
      </div>
    </div>
  );
}