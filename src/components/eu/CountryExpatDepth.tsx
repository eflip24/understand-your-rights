import { Card, CardContent } from "@/components/ui/card";
import { getCountryExpatDepth } from "@/data/eu/countryExpatDepth";

interface Props {
  country: string;
  className?: string;
}

export default function CountryExpatDepthBlock({ country, className }: Props) {
  const depth = getCountryExpatDepth(country);
  if (!depth) return null;

  return (
    <section className={className} aria-labelledby="expat-depth-heading">
      <h2 id="expat-depth-heading" className="text-2xl font-bold mb-3">
        {depth.heading}
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6">{depth.intro}</p>

      <h3 className="text-lg font-semibold mb-2">Who does what: the titles you will see</h3>
      <dl className="mb-6 space-y-2">
        {depth.titles.map((row) => (
          <div key={row.term} className="rounded-md border border-border/60 p-3">
            <dt className="font-semibold text-foreground">{row.term}</dt>
            <dd className="text-sm text-muted-foreground mt-1">{row.meaning}</dd>
          </div>
        ))}
      </dl>

      <h3 className="text-lg font-semibold mb-2">How to check a lawyer is genuinely qualified</h3>
      <ul className="mb-6 space-y-2">
        {depth.verify.map((c) => (
          <li key={c.label} className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{c.label}. </span>
            {c.body}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">What legal work typically costs</h3>
      <div className="overflow-x-auto mb-2">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="p-2 font-semibold border-b">Matter</th>
              <th className="p-2 font-semibold border-b">Typical fee</th>
              <th className="p-2 font-semibold border-b">Notes</th>
            </tr>
          </thead>
          <tbody>
            {depth.fees.map((row) => (
              <tr key={row.matter} className="align-top">
                <td className="p-2 border-b font-medium">{row.matter}</td>
                <td className="p-2 border-b whitespace-nowrap">{row.typicalCost}</td>
                <td className="p-2 border-b text-muted-foreground">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mb-6">
        Indicative market ranges, reviewed {depth.lastReviewed}. Fees are negotiable and vary by province — always
        agree them in writing before work starts.
      </p>

      <h3 className="text-lg font-semibold mb-2">Working in your own language</h3>
      <p className="text-muted-foreground leading-relaxed mb-6">{depth.languageNote}</p>

      <h3 className="text-lg font-semibold mb-2">Mistakes that cost foreign clients the most</h3>
      <div className="grid gap-3 sm:grid-cols-2 mb-2">
        {depth.pitfalls.map((p) => (
          <Card key={p.label}>
            <CardContent className="p-4">
              <p className="font-semibold text-sm mb-1">{p.label}</p>
              <p className="text-sm text-muted-foreground">{p.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
