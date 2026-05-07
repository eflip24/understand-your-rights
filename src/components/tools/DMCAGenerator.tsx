import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function DMCAGenerator() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [original, setOriginal] = useState("");
  const [infringing, setInfringing] = useState("");

  const doc = `DMCA TAKEDOWN NOTICE

Date: ${new Date().toLocaleDateString()}

To the Designated DMCA Agent:

I, ${name || "[Your Name]"}, am the copyright owner (or an agent authorized to act on behalf of the owner) of certain copyrighted material described below. I am providing this notice in good faith pursuant to 17 U.S.C. § 512(c).

1. IDENTIFICATION OF COPYRIGHTED WORK:
${original || "[Describe the original copyrighted work and where it can be found]"}

2. IDENTIFICATION OF INFRINGING MATERIAL:
${infringing || "[URL(s) of the infringing material]"}

3. CONTACT INFORMATION:
${contact || "[Your email, address, and phone]"}

4. GOOD FAITH STATEMENT: I have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.

5. ACCURACY STATEMENT: The information in this notice is accurate, and under penalty of perjury, I am the owner or authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.

6. SIGNATURE:

____________________________
${name || "[Your Name]"}`;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>Your full name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
        <div><Label>Contact (email/phone)</Label><Input value={contact} onChange={e => setContact(e.target.value)} /></div>
      </div>
      <div><Label>Original work</Label><Textarea value={original} onChange={e => setOriginal(e.target.value)} rows={3} /></div>
      <div><Label>Infringing URLs</Label><Textarea value={infringing} onChange={e => setInfringing(e.target.value)} rows={3} /></div>
      <Textarea value={doc} readOnly rows={18} className="font-mono text-xs" />
      <Button onClick={() => navigator.clipboard.writeText(doc)}>Copy Notice</Button>
    </div>
  );
}
