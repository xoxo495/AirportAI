import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Parent from "../../parent";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Selamat datang di AI Airport Intelligence Systems! Ada yang bisa saya bantu terkait jadwal penerbangan, fasilitas bandara, atau informasi bagasi hari ini?",
      time: "10:00",
    },
    {
      id: 2,
      sender: "user",
      text: "<div classname>",
      time: "10:01",
    },
    {
      id: 3,
      sender: "bot",
      text: "Adit: kocak😹",
      time: "10:01",
    },
  ]);

  const chatContainerRef = useRef(null);
  const messagesRef = useRef([]);

  useEffect(() => {
    const lastMessageIndex = messages.length - 1;
    const lastMessageEl = messagesRef.current[lastMessageIndex];

    if (lastMessageEl) {
      gsap.fromTo(
        lastMessageEl,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" },
      );
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <Parent>
      <div className="flex flex-col h-full w-full justify-between bg-slate-50 text-slate-800">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {messages.map((msg, index) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={msg.id}
                ref={(el) => (messagesRef.current[index] = el)}
                className={`flex ${isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-md rounded-2xl p-4 shadow-sm ${
                    isBot
                      ? "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                      : "bg-slate-900 rounded-tr-none"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-1 ${
                      isBot ? "text-sky-600" : "text-sky-400"
                    }`}
                  >
                    {isBot ? "AAI Assistant" : "Anda"}
                  </p>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-2 text-right ${
                      isBot ? "text-slate-400" : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-slate-200 p-4 bg-white shrink-0">
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 max-w-4xl mx-auto"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan Anda di sini..."
              className="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="flex items-center justify-center p-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <svg
                className="w-5 h-5 transform rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Parent>
  );
}
