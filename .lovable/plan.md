

# Block Bot Traffic (Especially from China)

## Problem
The site receives heavy bot traffic, particularly from Chinese bots/crawlers, which wastes resources and skews analytics.

## Solution — Multi-Layer Bot Protection

### Layer 1: `robots.txt` — Block Known Chinese Bots
Update `public/robots.txt` to explicitly disallow known Chinese crawler user agents:
- `Baiduspider`, `Sogou`, `360Spider`, `YisouSpider`, `Bytespider` (TikTok/ByteDance), `PetalBot` (Huawei), `MJ12bot`, `SemrushBot`, `AhrefsBot`, `DotBot`

### Layer 2: Edge Function Middleware — Request Filtering
Create a new edge function `bot-shield` that acts as a lightweight verification layer for the AI-powered endpoints (legal-chat, analyze-contract) which are the most expensive to serve to bots:
- Check `User-Agent` against a blocklist of known bot strings
- Check for suspicious request patterns (missing headers, empty Accept-Language)
- Return 403 for blocked requests
- Update `legal-chat` and `analyze-contract` to call this check before processing

### Layer 3: Client-Side Honeypot + Rate Limiting
Add a hidden honeypot field to interactive forms (chat widget, contract analyzer). Real users won't fill it; bots will. Requests with the honeypot filled get silently dropped.

### Layer 4: Meta Tags
Add `<meta>` tags in `index.html` to discourage specific bot indexing beyond robots.txt.

## Files

| File | Change |
|---|---|
| `public/robots.txt` | Add Disallow rules for ~10 Chinese/spam bot user agents |
| `supabase/functions/legal-chat/index.ts` | Add user-agent check + reject known bots |
| `supabase/functions/analyze-contract/index.ts` | Same bot check |
| `src/components/chat/LegalChatWidget.tsx` | Add honeypot field to chat requests |
| `index.html` | Add `<meta name="robots">` directives for specific bots |

## What This Won't Do
- This cannot block traffic at the CDN/network level (that requires Cloudflare or similar). If you want IP-based geo-blocking (blocking all Chinese IPs), that would require putting Cloudflare in front of your domain, which is outside Lovable's scope but is the most effective solution for heavy bot traffic.

