import Head from "@/components/seo/Head";
import ContentPageLayout from "@/components/layout/ContentPageLayout";

export default function DisclaimerPage() {
  return (
    <>
      <Head
        title="Disclaimer — LegallySpoken"
        description="Read LegallySpoken's legal disclaimer. Our tools provide general legal information, not legal advice. Consult a qualified attorney for specific legal questions."
      />
      <ContentPageLayout
        title="Disclaimer"
        subtitle="Important information about the use of LegallySpoken's tools and content."
        breadcrumbs={[{ label: "Disclaimer" }]}
        metaTitle="Disclaimer — LegallySpoken"
        metaDescription="Read LegallySpoken's legal disclaimer. Our tools provide general legal information, not legal advice."
      >
        <div className="prose dark:prose-invert max-w-none prose-headings:font-serif">
          <h2>No Legal Advice</h2>
          <p>
            LegallySpoken provides general legal information and educational tools. Nothing on this website
            constitutes legal advice, and no attorney-client relationship is formed by using this site or its tools.
            The information provided is for general informational purposes only and should not be relied upon as a
            substitute for professional legal counsel.
          </p>

          <h2>No Attorney-Client Relationship</h2>
          <p>
            Your use of LegallySpoken does not create an attorney-client, fiduciary, or professional relationship
            between you and LegallySpoken, its owners, employees, or contributors. You should not act or refrain
            from acting based on information from this site without first seeking qualified legal advice from a
            licensed attorney in your jurisdiction.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            While we strive to keep our tools and information accurate and up to date, we make no warranties or
            representations regarding the accuracy, completeness, reliability, or currentness of any content on this
            site. Laws, regulations, and legal standards vary by jurisdiction and change over time. Our tools use
            general rules and may not reflect the specific laws applicable to your situation.
          </p>

          <h2>AI-Powered Tools</h2>
          <p>
            Some of our tools use artificial intelligence to analyze text and generate results. AI-generated outputs
            may contain errors, omissions, or inaccuracies. These results are provided as a starting point for your
            own research and should always be verified by a qualified professional before being relied upon for any
            legal, financial, or business decision.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, LegallySpoken, its owners, employees, and contributors shall not
            be liable for any damages arising out of or in connection with your use of this website or its tools.
            This includes, without limitation, direct, indirect, incidental, consequential, punitive, or special
            damages, whether or not we have been advised of the possibility of such damages.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            This site may contain links to third-party websites or resources. These links are provided for
            convenience only and do not imply endorsement. We have no control over and assume no responsibility for
            the content, privacy policies, or practices of any third-party sites.
          </p>

          <h2>Changes to This Disclaimer</h2>
          <p>
            We reserve the right to modify this disclaimer at any time without prior notice. Your continued use of
            the site following any changes constitutes acceptance of the updated disclaimer.
          </p>

          <p className="text-muted-foreground text-sm mt-8">
            <em>Last updated: March 2026</em>
          </p>
        </div>
      </ContentPageLayout>
    </>
  );
}
