import React, { useState, useEffect, useRef } from "react";

type Message = { sender: "user" | "bot"; text: string };

const initialMessages: Message[] = [
  { sender: "bot", text: "Hi there! How can I make your day smarter?" },
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [dark, setDark] = useState(false);
  const [typing, setTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // LOGIN STATES
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(() => {
  return localStorage.getItem("auth") === "false" ;
});


  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "✨ Here's a thoughtful reply (dummy response).",
        },
      ]);
      setTyping(false);
    }, 1000);
  };

  const handleClear = () => {
    setMessages([]);
    setShowMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setLoggedIn(false);
  };

  const handleLogin = () => {
    if (email === "demo@chat.com" && pass === "demo123") {
      localStorage.setItem("auth", "true");
      setLoggedIn(true);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col transition-colors relative"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      {/* HEADER */}
      <header
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur border-b"
        style={{
          backgroundColor: "var(--bg-alt)",
          borderColor: "var(--bg-alt)",
        }}
      >
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-fuchsia-600 
        bg-clip-text text-transparent">
          AI Bot
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-full hover:bg-gray-200/40"
          >
            <span className="material-symbols-rounded text-2xl">
              {dark ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu((v) => !v)}
              className="p-2 rounded-full hover:bg-gray-200/40"
            >
              <span className="material-symbols-rounded text-2xl">more_vert</span>
            </button>

            {showMenu && (
              <div
                className="absolute right-0 mt-3 w-40 rounded-xl shadow-lg border z-20"
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--bg-alt)",
                }}
              >
                <button
                  onClick={handleClear}
                  className="w-full text-left px-5 py-2 hover:bg-gray-200/40"
                >
                  Clear Chat
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-2 hover:bg-gray-200/40"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CHAT CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-10 py-6 space-y-6 overflow-y-auto">

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <span className="material-symbols-rounded text-3xl opacity-80 self-start">
              {msg.sender === "bot" ? "smart_toy" : "person"}
            </span>

           <div
  className={`
    inline-block
    px-5 py-3 rounded-3xl shadow-sm
    max-w-[75%] sm:max-w-[70%] md:max-w-[65%] lg:max-w-[60%]
    break-words
  `}
  style={{
    background:
      msg.sender === "user"
        ? "var(--bubble-user)"
        : "var(--bubble-bot)",
    color: msg.sender === "user" ? "#fff" : "var(--fg)",
    border:
      msg.sender === "bot" ? "1px solid var(--bg-alt)" : "none",
  }}
>
  {msg.text}
</div>

          </div>
        ))}

        {typing && (
          <div className="flex items-center gap-3 opacity-70">
            <span className="material-symbols-rounded text-3xl">smart_toy</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* INPUT */}
      <footer
        className="p-4 border-t backdrop-blur"
        style={{
          backgroundColor: "var(--bg-alt)",
          borderColor: "var(--bg-alt)",
        }}
      >
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-5 py-3 rounded-full border shadow-sm"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--bg-alt)",
              color: "var(--fg)",
            }}
            placeholder="Type your message..."
          />

          <button
            onClick={handleSend}
            className="p-3 rounded-full bg-gradient-to-tr from-indigo-600 to-fuchsia-500 text-white hover:shadow-lg transition"
          >
            <span className="material-symbols-rounded text-2xl">send</span>
          </button>
        </div>
      </footer>

      {/* FLOATING LOGIN MODAL */}
      {!loggedIn && (
        <div
          className="
            absolute inset-0 flex items-center justify-center 
            backdrop-blur-md bg-black/20 z-50
            px-4
          "
        >
          <div
            className="w-full max-w-sm p-8 rounded-2xl shadow-xl border"
            style={{
              backgroundColor: "var(--bg-alt)",
              borderColor: "var(--bg-alt)",
            }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 rounded-lg border"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--bg-alt)",
                color: "var(--fg)",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-3 rounded-lg border"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--bg-alt)",
                color: "var(--fg)",
              }}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              onClick={handleLogin}
              className="w-full p-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-fuchsia-500 hover:shadow-lg transition"
            >
              Login
            </button>

            <p className="text-xs opacity-70 mt-4 text-center">
              Demo: demo@chat.com / demo123
            </p>
          </div>
        </div>
      )}

      {/* Icons */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:FILL@0..1"
        rel="stylesheet"
      />
    </div>
  );
}
