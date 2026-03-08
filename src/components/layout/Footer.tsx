import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-accent" />
              <span className="font-serif text-lg font-bold">
                Legally<span className="text-accent">Spoken</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70">
              Simple legal tools for everyday people. Not a lawyer, not legal advice.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-3">Tools</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/tools/contract" className="hover:text-accent transition-colors">Contract Tools</Link></li>
              <li><Link to="/tools/consumer" className="hover:text-accent transition-colors">Consumer Tools</Link></li>
              <li><Link to="/tools/employment" className="hover:text-accent transition-colors">Employment Tools</Link></li>
              <li><Link to="/tools/generators" className="hover:text-accent transition-colors">Document Generators</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/tools" className="hover:text-accent transition-colors">All Tools</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/disclaimer" className="hover:text-accent transition-colors">Disclaimer</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>© {new Date().getFullYear()} LegallySpoken. All rights reserved.</p>
            <p className="text-center md:text-right max-w-md">
              <strong>Disclaimer:</strong> This site provides general legal information, not legal advice. Consult a qualified attorney for specific legal questions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
