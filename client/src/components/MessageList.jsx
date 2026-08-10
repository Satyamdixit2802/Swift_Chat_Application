export default function MessageList({ messages, currentUser }) {
  return (
    <div className="flex-1 space-y-3 overflow-y-auto bg-slate-950/20 px-4 py-4 sm:px-5">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-slate-400">
          No messages yet. Say hello to the room.
        </div>
      ) : (
        messages.map((msg) => {
          const isMine = msg.username === currentUser;

          return (
            <div key={msg._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                  isMine
                    ? "rounded-br-md bg-indigo-500 text-white"
                    : "rounded-bl-md border border-slate-700 bg-slate-800 text-slate-100"
                }`}
              >
                <div className={`mb-1 text-[11px] font-semibold uppercase tracking-wide ${isMine ? "text-indigo-100" : "text-slate-300"}`}>
                  {msg.username}
                </div>
                <p className="break-words text-sm leading-6">{msg.text}</p>
                <div className={`mt-2 text-[10px] ${isMine ? "text-indigo-100/80" : "text-slate-400"}`}>
                  {new Date(msg.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}