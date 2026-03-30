

# AI Legal Assistant Chat Widget

## Overview

A floating chat widget (bottom-right bubble) powered by Lovable AI via a streaming edge function. The assistant recommends tools, explains calculator results, and answers follow-up legal questions. Every response starts with a legal disclaimer. No account required.

## Architecture

### New Files

| File | Purpose |
|---|---|
| `supabase/functions/legal-chat/index.ts` | Streaming edge function — sends conversation history to Lovable AI with a legal-focused system prompt that knows about all 100+ tools |
| `src/components/chat/LegalChatWidget.tsx` | Floating chat bubble + expandable chat panel with message list, input, and streaming response rendering |
| `src/components/chat/useLegalChat.ts` | Hook managing messages state, streaming SSE parsing, and localStorage persistence |

### Edited Files

| File | Change |
|---|---|
| `src/App.tsx` | Render `<LegalChatWidget />` globally (outside Routes, always visible) |

## Edge Function: `legal-chat`

- Streaming endpoint using Lovable AI gateway (`google/gemini-3-flash-preview`)
- System prompt includes:
  - Legal disclaimer prefix instruction ("Always begin responses with: *This is general information only — not legal advice.*")
  - Full tool inventory summary (tool names, slugs, categories, short descriptions) injected from a static string so the AI can recommend specific tools with links
  - Instructions to recommend tools by linking to `/tools/{category}/{slug}`, explain calculator results in plain English, and handle state-specific follow-ups
- Handles 429/402 errors with user-friendly messages
- Passes full conversation history for multi-turn context

## Chat Widget UI

- **Collapsed**: Floating button bottom-right with `MessageCircle` Lucide icon + "AI Legal Assistant" tooltip
- **Expanded**: 400px wide, 500px tall panel with:
  - Header: "AI Legal Assistant" + close button
  - Disclaimer banner (always visible): "This is general information only — not legal advice."
  - Scrollable message area with markdown rendering (`react-markdown`)
  - Input bar with send button
  - Tool recommendation links rendered as clickable cards when the AI mentions tool slugs
- **Mobile**: Full-width bottom sheet (100vw, 70vh)
- Messages persisted in `localStorage` key `legalChatHistory` (cleared on "New Chat" button)

## Hook: `useLegalChat`

- Manages `messages: {role, content}[]` state
- SSE streaming parser (line-by-line, handles `[DONE]`, partial JSON, CRLF)
- Progressive assistant message update (same pattern as existing AI tools)
- `sendMessage(text)` → appends user msg, streams assistant response
- `clearChat()` → resets messages

## System Prompt (Key Excerpt)

```text
You are LegallySpoken's AI Legal Assistant. You help users find the right 
free legal tool and answer general legal questions.

IMPORTANT: Always begin every response with:
"*This is general information only — not legal advice. Consult a licensed attorney for your specific situation.*"

You have access to 100+ free tools. When recommending a tool, format it as:
**[Tool Name](/tools/category/slug)** — short description

When users describe a situation, recommend 1-3 relevant tools.
When users ask about calculator results, explain in plain English.
When users ask state-specific questions, note relevant state variations.
```

The full tool list (names + slugs + categories) will be embedded in the system prompt from `tools.ts` data.

## Files Summary

| File | Change |
|---|---|
| `supabase/functions/legal-chat/index.ts` | Create — streaming chat edge function |
| `src/components/chat/LegalChatWidget.tsx` | Create — floating chat widget with full UI |
| `src/components/chat/useLegalChat.ts` | Create — chat state + streaming hook |
| `src/App.tsx` | Edit — add `<LegalChatWidget />` to global layout |

