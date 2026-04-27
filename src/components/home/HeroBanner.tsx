import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, CheckCircle2, FileText, Scale, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const trustSignals = ["No signup required", "Free forever", "Instant results"];

function LegalIllustration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block">
      <div className="absolute right-[-6rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute right-16 top-1/2 h-[28rem] w-[24rem] -translate-y-1/2">
        <div className="absolute left-12 top-8 h-72 w-56 rotate-[-7deg] rounded-2xl border border-white/10 bg-white/[0.08] p-5 shadow-2xl backdrop-blur-md">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <FileText className="h-5 w-5" />
            </div>
            <div className="h-2 w-14 rounded-full bg-gold/40" />
          </div>
          <div className="space-y-3">
            <div className="h-2.5 rounded-full bg-white/35" />
            <div className="h-2.5 w-10/12 rounded-full bg-white/20" />
            <div className="h-2.5 w-8/12 rounded-full bg-white/20" />
          </div>
          <div className="mt-8 rounded-xl border border-gold/20 bg-gold/10 p-3">
            <div className="mb-2 h-2 w-20 rounded-full bg-gold/50" />
            <div className="h-2 w-28 rounded-full bg-white/25" />
          </div>
        </div>

        <div className="absolute right-2 top-24 h-64 w-52 rotate-[8deg] rounded-2xl border border-white/10 bg-navy-light/45 p-5 shadow-2xl backdrop-blur-md">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-gold">
            <Scale className="h-6 w-6" />
          </div>
          <div className="space-y-3">
            <div className="h-2.5 rounded-full bg-white/30" />
            <div className="h-2.5 w-9/12 rounded-full bg-white/18" />
            <div className="h-2.5 w-11/12 rounded-full bg-white/18" />
          </div>
        </div>

        <div className="absolute bottom-20 left-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.09] px-4 py-3 shadow-xl backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-navy-dark">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="h-2.5 w-24 rounded-full bg-white/45" />
            <div className="mt-2 h-2 w-16 rounded-full bg-white/20" />
          </div>
        </div>

        <div className="absolute bottom-8 right-10 flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 shadow-xl backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
          <CalendarDays className="h-5 w-5 text-gold" />
          <div className="h-2.5 w-24 rounded-full bg-white/35" />
        </div>
      </div>
    </div>
  );
}

export default function HeroBanner() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) navigate(`/tools?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[hsl(230,63%,11%)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--gold)/0.16),transparent_30%),radial-gradient(circle_at_78%_30%,hsl(var(--navy-light)/0.35),transparent_34%),linear-gradient(135deg,hsl(230,63%,11%),hsl(var(--navy-dark))_62%,hsl(230,63%,9%))]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(hsl(var(--primary-foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary-foreground))_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <LegalIllustration />

      <div className="container relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center lg:mx-0 lg:max-w-3xl lg:items-start lg:text-left">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-navy-dark/70 px-4 py-2 shadow-lg shadow-gold/5 backdrop-blur-md animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_hsl(var(--gold))]" />
            <span className="font-sans text-xs font-semibold tracking-wide text-gold-light sm:text-sm">
              100+ Free Legal Tools — No Signup Required
            </span>
          </div>

          <h1 className="font-sans text-5xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in" style={{ animationDelay: "0.08s" }}>
            Legal clarity, <span className="text-gold">simplified</span>
          </h1>

          <p className="mt-6 max-w-2xl font-sans text-lg leading-8 text-white/72 sm:text-xl animate-fade-in" style={{ animationDelay: "0.16s" }}>
            Understand contracts, check risks, calculate deadlines, and generate documents — instantly, for free.
          </p>

          <form onSubmit={handleSearch} className="mt-10 w-full max-w-2xl animate-fade-in" style={{ animationDelay: "0.24s" }}>
            <div className="group rounded-2xl border border-white/15 bg-white/[0.08] p-2 shadow-2xl shadow-navy-dark/40 backdrop-blur-xl transition-all duration-300 focus-within:border-gold/55 focus-within:shadow-gold/15">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold/80" />
                  <Input
                    aria-label="Search for a legal tool"
                    placeholder="Search for a legal tool..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 rounded-xl border-0 bg-white text-base font-medium text-navy-dark placeholder:text-charcoal/55 pl-12 shadow-inner focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-0"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-14 rounded-xl bg-gold px-8 font-sans text-base font-bold text-navy-dark shadow-lg shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-gold/30"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start animate-fade-in" style={{ animationDelay: "0.32s" }}>
            {trustSignals.map((text) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 font-sans text-sm font-medium text-white/78 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/25 hover:text-white hover:shadow-lg hover:shadow-gold/10"
              >
                <CheckCircle2 className="h-4 w-4 text-gold" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </section>
  );
}