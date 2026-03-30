import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLegalChat } from "./useLegalChat";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const WELCOME_SUGGESTIONS = [
  "I'm renting and my landlord raised my rent — what can I do?",
  "How do I check if my contract has red flags?",
  "What tools can help me calculate my severance?",
];

const LegalChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, error, sendMessage, clearChat } = useLegalChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-label="Open AI Legal Assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 sm:bottom-6 sm:right-6 flex flex-col w-full sm:w-[400px] h-[70vh] sm:h-[500px] rounded-t-2xl sm:rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-accent/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-accent" />
          <span className="font-semibold text-sm text-foreground">AI Legal Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={clearChat}
            aria-label="New Chat"
            title="New Chat"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2">
        <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <p className="text-[11px] text-muted-foreground leading-tight">
          General information only — not legal advice.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Hi! I can help you find the right legal tool or answer general legal questions. Try asking:
            </p>
            <div className="space-y-2">
              {WELCOME_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput("");
                    sendMessage(s);
                  }}
                  className="block w-full text-left rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted/60"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-accent-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                  <ReactMarkdown
                    components={{
                      a: ({ href, children }) => {
                        const isInternal = href?.startsWith("/");
                        return (
                          <a
                            href={href}
                            onClick={(e) => {
                              if (isInternal && href) {
                                e.preventDefault();
                                handleLinkClick(href);
                              }
                            }}
                            className="text-accent underline hover:text-accent/80"
                            {...(!isInternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {children}
                          </a>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background px-3 py-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a legal question..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-input bg-muted/30 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 max-h-24"
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="h-9 w-9 shrink-0 rounded-xl"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LegalChatWidget;
