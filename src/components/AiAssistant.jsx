import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2, ArrowRight, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { base44 } from "@/api/base44Client";

const FAQS = [
  "How does AgriLoop work?",
  "What is the furnace made of?",
  "How do I start & operate it?",
  "What is the core idea behind AgriLoop?",
];

const SYSTEM_PROMPT = `You are the AgriLoop assistant — friendly, creative, and clear. AgriLoop is an innovative agricultural waste-to-biochar conversion system. It uses an ESP32-controlled pyrolysis furnace with multi-point temperature mapping, adaptive pyrolysis that adjusts to the feedstock, energy recovery from pyrolysis gases, and real-time sensor monitoring.

Available site pages (use these exact paths for redirects):
- "/" → Home (overview, the idea)
- "/furnace" → The Furnace (composition & structure)
- "/how-it-works" → How It Works (the process steps)
- "/materials" → Materials (suitable & prohibited feedstock)
- "/outputs" → Outputs (biochar, energy, data)
- "/components" → System Components (ESP32, sensors, reactor parts)
- "/control-system" → Control System (live sensors, adaptive pyrolysis, AI optimizer, energy recovery)

Instructions:
- Answer the user's question simply, creatively, and well — explain like a curious student.
- Keep it concise (4-7 sentences) but complete.
- Suggest 1 to 3 relevant pages to visit next, picked ONLY from the paths above.
- Return JSON: { "answer": string (markdown), "redirects": [ { "label": string, "path": string, "reason": string } ] }`;

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const ask = async (question) => {
    if (!question.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `${SYSTEM_PROMPT}\n\nUser question: ${question}`,
        response_json_schema: {
          type: "object",
          properties: {
            answer: { type: "string" },
            redirects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  label: { type: "string" },
                  path: { type: "string" },
                  reason: { type: "string" },
                },
              },
            },
          },
        },
      });
      setMessages((m) => [...m, { role: "assistant", ...res }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", answer: "I couldn't reach the assistant service right now. Please try again in a moment.", redirects: [] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-forest to-emerald2 px-5 py-3.5 text-cream shadow-2xl shadow-forest/30 hover:scale-105 transition-transform"
        aria-label="Open AgriLoop AI assistant"
      >
        <Sparkles className="h-5 w-5" />
        <span className="font-semibold text-sm hidden sm:inline">Ask AgriLoop AI</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-charcoal/30 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] flex flex-col bg-cream/95 backdrop-blur-2xl border-l border-forest/10 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 bg-gradient-to-r from-forest to-emerald2 text-cream">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream/15 backdrop-blur border border-mint/30">
                    <MessageCircle className="h-5 w-5 text-mint" />
                  </span>
                  <div>
                    <p className="font-heading font-bold">AgriLoop Assistant</p>
                    <p className="text-xs text-cream/70 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyanaccent animate-pulse" />
                      Online · here to help
                    </p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-cream/80 hover:text-cream" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-6">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mint/30 text-emerald2">
                      <Sparkles className="h-7 w-7" />
                    </div>
                    <p className="mt-4 font-heading font-semibold text-forest">Ask me anything about AgriLoop</p>
                    <p className="mt-1 text-sm text-charcoal/60">Pick a question or write your own.</p>
                    <div className="mt-5 grid gap-2.5">
                      {FAQS.map((q) => (
                        <button
                          key={q}
                          onClick={() => ask(q)}
                          className="text-left rounded-xl bg-white border border-forest/10 px-4 py-3 text-sm text-forest hover:border-emerald2/40 hover:bg-mint/20 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m, i) =>
                  m.role === "user" ? (
                    <div key={i} className="flex justify-end">
                      <div className="rounded-2xl rounded-br-sm bg-gradient-to-r from-forest to-emerald2 text-cream px-4 py-2.5 text-sm max-w-[80%]">
                        {m.text}
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-sm bg-white border border-forest/10 px-4 py-3 text-sm text-charcoal/80 max-w-[88%] shadow-sm">
                        <div className="prose prose-sm max-w-none leading-relaxed [&_p]:my-1.5 [&_strong]:text-forest">
                          <ReactMarkdown>{m.answer || ""}</ReactMarkdown>
                        </div>
                        {m.redirects?.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {m.redirects.map((r, j) => (
                              <Link
                                key={j}
                                to={r.path}
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center gap-1.5 rounded-full bg-mint/30 border border-emerald2/30 px-3 py-1.5 text-xs font-semibold text-forest hover:bg-mint/50 transition-colors"
                                title={r.reason}
                              >
                                {r.label}
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}

                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-sm bg-white border border-forest/10 px-4 py-3 shadow-sm">
                      <Loader2 className="h-4 w-4 animate-spin text-emerald2" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-forest/10 bg-white/60 backdrop-blur">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    ask(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Write your question…"
                    className="flex-1 rounded-full border border-forest/15 bg-white px-4 py-2.5 text-sm text-forest outline-none focus:border-emerald2/50"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-forest to-emerald2 text-cream disabled:opacity-40"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}