import Head from "@/components/seo/Head";
import ContentPageLayout from "@/components/layout/ContentPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head
        title="Privacy Policy — LegallySpoken"
        description="Learn how LegallySpoken collects, uses, and protects your data. We respect your privacy and never sell your personal information."
      />
      <ContentPageLayout
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
        breadcrumbs={[{ label: "Privacy Policy" }]}
        metaTitle="Privacy Policy — LegallySpoken"
        metaDescription="Learn how LegallySpoken collects, uses, and protects your data."
      >
        <div className="prose dark:prose-invert max-w-none prose-headings:font-serif">
          <h2>Information We Collect</h2>
          <p>
            When you use LegallySpoken, we may collect the following types of information:
          </p>
          <ul>
            <li>
              <strong>Account information:</strong> If you create an account, we collect your email address and
              display name. This information is used solely to provide account functionality such as saving analyses.
            </li>
            <li>
              <strong>Usage data:</strong> We collect anonymous usage data including pages visited, tools used, and
              general interaction patterns to improve our services.
            </li>
            <li>
              <strong>Tool inputs:</strong> Text and data you enter into our tools is processed to generate results.
              If you choose to save an analysis, the input and output data is stored in your account.
            </li>
            <li>
              <strong>Cookies:</strong> We use essential cookies to maintain your session and preferences. We do not
              use third-party advertising cookies.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our tools and services</li>
            <li>Save your analyses and preferences when you have an account</li>
            <li>Improve and optimize our website and tools</li>
            <li>Respond to your requests or inquiries</li>
            <li>Protect against unauthorized access or misuse</li>
          </ul>

          <h2>Data Storage and Security</h2>
          <p>
            Your data is stored securely using industry-standard cloud infrastructure with encryption at rest and in
            transit. We implement appropriate technical and organizational measures to protect your personal
            information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>We Do Not Sell Your Data</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties for marketing or
            advertising purposes. We will never monetize your data in this way.
          </p>

          <h2>AI-Processed Data</h2>
          <p>
            Some of our tools use artificial intelligence to analyze text you provide. This text is sent to AI
            processing services solely for the purpose of generating results. We do not use your inputs to train AI
            models. AI-processed data is not retained beyond the duration of your session unless you explicitly save
            the analysis to your account.
          </p>

          <h2>Data Retention</h2>
          <p>
            If you have an account, your saved analyses are retained until you delete them or close your account.
            Anonymous usage data is retained in aggregate form for analytics purposes. You can request deletion of
            your account and associated data at any time by contacting us.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Request data portability</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            LegallySpoken is not directed at children under 13. We do not knowingly collect personal information
            from children. If you believe we have collected information from a child, please contact us so we can
            promptly remove it.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify users of significant changes by
            posting a notice on our website. Your continued use of the site after changes are posted constitutes
            acceptance of the updated policy.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy or your data, please contact us at{" "}
            <a href="mailto:privacy@legallyspoken.com" className="text-accent">
              privacy@legallyspoken.com
            </a>.
          </p>

          <p className="text-muted-foreground text-sm mt-8">
            <em>Last updated: March 2026</em>
          </p>
        </div>
      </ContentPageLayout>
    </>
  );
}
