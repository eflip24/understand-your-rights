# Fixed-price lawyer review: severance & employment contracts (US + Ireland)

The first service is a severance and employment contract review. The client pays the lawyer directly, and LegallySpoken earns a flat fee from each listed lawyer. Under Irish law, only a solicitor with a practising certificate may act as a solicitor (Solicitors Act 1954 s.55). Rules also limit how solicitors can share fees with people who are not solicitors (Solicitors (Amendment) Act 1994 s.71). Most US states have a similar rule (ABA Model Rule 5.4). So LegallySpoken is a directory and a tool for preparing a case. It is not a law firm.

## Phase 0: Check the facts first (no building)
- Check the rules in Ireland: Law Society practising certificates, the 2020 LSRA advertising rules (online ads by solicitors), fee-sharing and referral fees, and insurance rules for freelance and locum solicitors.
- Check the rules in the US: referral fees and lawyer listing services (Rule 7.2), and the practice rules for the first 3 to 5 states with severance traffic (SC, NY, CA, TX, FL).
- Check fair prices: what Irish solicitors and US lawyers charge for a severance agreement review, and what freelance solicitors in Ireland earn per hour.
- Write up the findings with sources, and save the legal rules to project memory.

## Phase 1: Pilot page for one service
- New page "Have a lawyer review your severance agreement", with a US version and an Ireland version (euro prices, Irish law terms such as the Workplace Relations Commission and statutory redundancy).
- Add "Get this reviewed by a lawyer" buttons to the severance calculators, the SC severance guide and the severance blog article.
- Client steps: upload the agreement (private storage), answer short questions, and get a free AI first-pass summary marked "not legal advice". Then the client chooses a lawyer and pays that lawyer's fixed price on the lawyer's own payment link or invoice.

## Phase 2: Lawyer side
- Lawyer sign-up: practising certificate or bar number, where they practise, proof of insurance, their fixed price and turnaround time. An admin checks each one before it goes live.
- Lawyer portal: new requests with the AI summary attached, Accept or Decline, a secure upload for the signed review letter, and Mark as delivered.
- Client order tracker: Received, then AI summary ready, then With your lawyer, then Delivered.
- Lawyer billing: a monthly listing subscription through the existing payments setup. This is a flat fee, never a share of what the client pays the lawyer.

## Phase 3: Ireland launch push
- Pages for Irish searches: severance and redundancy review, unfair dismissal, settlement agreements.
- Recruiting freelance solicitors: a "Join as a solicitor" page plus a list of outreach targets (locum and freelance solicitors, small practices).

## Phase 4: Later
- Faster lawyer tools such as AI redlines and review templates, and more services (lease review, demand letters).

## Best way to talk to freelance lawyers (to confirm in Phase 0)
- Everything about a client's case stays inside the lawyer portal: messages, files and handover. This keeps client confidentiality and leaves a record of who saw what.
- Email alerts for new requests, with a link to the portal and no client details in the email.
- For recruiting and quick questions: a WhatsApp Business broadcast or LinkedIn. Never use these for case files.

## Technical details
- New tables (grants and access rules on each): lawyers, lawyer_verifications, review_requests, review_messages, review_files. The admin role uses the existing user_roles table.
- New private storage bucket "reviews". Files are reached through signed links that expire.
- A backend function builds the AI first-pass summary. It reuses the existing contract-analysis setup with the openai/gpt-6-astra model and no max_tokens. It only runs when a client asks for it, to keep credit use down.
- Email alerts use the existing transactional email setup.
- Lawyer subscriptions use the existing payments webhook. Client payments go straight to each lawyer.
- Pages are registered in the guide index and sitemap, and the Ireland pages carry hreflang for en-IE.
