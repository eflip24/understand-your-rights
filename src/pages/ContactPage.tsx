import { Mail, Clock, MapPin, MessageSquare } from "lucide-react";
import Head from "@/components/seo/Head";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <>
      <Head
        title="Contact LegallySpoken — Get in Touch"
        description="Contact the LegallySpoken team with feedback, corrections, partnership questions, or press inquiries. We aim to respond within 2 business days."
      />

      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-20">
        <div className="container max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center rounded-full bg-accent/10 p-3">
            <MessageSquare className="h-7 w-7 text-accent" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Contact us</h1>
          <p className="text-lg text-muted-foreground">
            Questions, corrections, tool requests, or partnership inquiries — we read every message.
          </p>
        </div>
      </section>

      <section className="container max-w-3xl mx-auto py-14 space-y-10">
        <div className="grid sm:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="rounded-lg bg-accent/10 p-2.5 w-fit">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-serif font-semibold text-lg">Email</h2>
              <a href="mailto:hello@legallyspoken.com" className="text-accent hover:underline break-all">
                hello@legallyspoken.com
              </a>
              <p className="text-sm text-muted-foreground">
                General questions, content feedback, corrections, suggestions for new tools or guides.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="rounded-lg bg-accent/10 p-2.5 w-fit">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-serif font-semibold text-lg">Response time</h2>
              <p className="text-foreground font-medium">Within 2 business days</p>
              <p className="text-sm text-muted-foreground">
                Monday–Friday, excluding public holidays. Urgent legal matters belong with a licensed attorney, not us.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">What we can help with</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Reporting an error or outdated information in a guide, tool, or article.</li>
            <li>Suggesting a new tool, calculator, or topic you would like us to cover.</li>
            <li>Press, partnership, attorney directory listing, or content syndication requests.</li>
            <li>DMCA, takedown, and privacy requests (please include the URL and a description).</li>
            <li>General feedback on the site, the design, or the tools.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">What we cannot help with</h2>
          <p className="text-muted-foreground">
            We are not a law firm. We cannot review your contract, represent you, or give legal
            advice about your specific situation. For that, please consult a qualified attorney
            licensed in your jurisdiction. Our{" "}
            <a href="/lawyer-near-me" className="text-accent hover:underline">attorney directory</a>{" "}
            is a good place to start.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent shrink-0 mt-1" />
              <div className="space-y-1">
                <h2 className="font-serif font-semibold">Operator &amp; mailing address</h2>
                <p className="text-sm text-muted-foreground">
                  For the operator details required by EU consumer law, please see our{" "}
                  <a href="/legal-notice" className="text-accent hover:underline">Legal Notice</a>{" "}
                  page (also available as{" "}
                  <a href="/impressum" className="text-accent hover:underline">Impressum</a>,{" "}
                  <a href="/mentions-legales" className="text-accent hover:underline">Mentions légales</a>,{" "}
                  <a href="/aviso-legal" className="text-accent hover:underline">Aviso legal</a>,{" "}
                  <a href="/note-legali" className="text-accent hover:underline">Note legali</a>, and{" "}
                  <a href="/informacao-legal" className="text-accent hover:underline">Informação legal</a>).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground border-t pt-6">
          <strong>Disclaimer:</strong> Sending an email to LegallySpoken does not create an
          attorney–client relationship. Do not include confidential or time-sensitive legal
          information in your message.
        </p>
      </section>
    </>
  );
}
