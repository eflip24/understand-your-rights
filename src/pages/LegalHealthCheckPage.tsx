import Head from "@/components/seo/Head";
import LegalHealthCheckQuiz from "@/components/quiz/LegalHealthCheckQuiz";

export default function LegalHealthCheckPage() {
  return (
    <div className="container py-12 md:py-16">
      <Head
        title="Free Legal Health Check Quiz — Get Personalized Tool Recommendations"
        description="Answer 6 quick questions and get instant, personalized recommendations from 100+ free legal tools. No signup required."
      />
      <LegalHealthCheckQuiz mode="inline" />
    </div>
  );
}
