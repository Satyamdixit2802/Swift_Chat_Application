import { useState } from "react";

export default function UsernamePrompt({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem("chat_username", trimmed);
    onSubmit(trimmed);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-sm sm:p-8">
        <div className="mb-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-indigo-300">Welcome</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Join the chat</h2>
        </div>

        <label className="mb-2 block text-sm font-medium text-slate-300">Your name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Enter your display name"
          className="w-full rounded-2xl border border-slate-600 bg-slate-950/60 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        />

        <button
          onClick={handleSubmit}
          className="mt-5 w-full rounded-2xl bg-indigo-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
        >
          Join room
        </button>
      </div>
    </div>
  );
}