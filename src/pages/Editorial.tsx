import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const Editorial = () => {
  return (
    <>
      <Helmet>
        <title>Editorial Policy - Sacco Hub News</title>
        <meta name="description" content="Learn about Sacco Hub News editorial standards, fact-checking processes, and content guidelines." />
      </Helmet>
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-news max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">Editorial Policy</h1>
            
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-lg text-muted-foreground mb-8">
                Sacco Hub News is committed to delivering accurate, fair, and comprehensive coverage of the SACCO, cooperative, and financial sectors in Kenya.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">Our Mission</h2>
              <p className="mb-4">
                To be Kenya's most trusted source for SACCO and cooperative sector news, providing timely, accurate, and impactful journalism that serves the interests of our readers and the broader cooperative movement.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">Editorial Standards</h2>
              <h3 className="text-lg font-semibold mt-6 mb-3">Accuracy</h3>
              <p className="mb-4">
                We strive for accuracy in all our reporting. Facts are verified through multiple sources before publication. When errors occur, we correct them promptly and transparently.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Fairness</h3>
              <p className="mb-4">
                We present all sides of a story fairly and give subjects of critical coverage an opportunity to respond. We distinguish clearly between news reporting and opinion.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Independence</h3>
              <p className="mb-4">
                Our editorial decisions are made independently of commercial, political, or other interests. Advertising and sponsored content are clearly labeled and separated from editorial content.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Transparency</h3>
              <p className="mb-4">
                We are transparent about our sources, methods, and any potential conflicts of interest. We clearly identify opinion pieces, sponsored content, and user-submitted material.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">Content Guidelines</h2>
              <p className="mb-4">All content published on Sacco Hub News must:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Be factually accurate and verified</li>
                <li>Be relevant to the SACCO, cooperative, or financial sectors</li>
                <li>Respect the privacy and dignity of individuals</li>
                <li>Avoid defamation, hate speech, or discrimination</li>
                <li>Comply with Kenyan law and press standards</li>
                <li>Properly attribute sources and quotes</li>
              </ul>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">Corrections Policy</h2>
              <p className="mb-4">
                We take errors seriously. If you believe we have made an error in our reporting, please contact us immediately. We will investigate all complaints and, where errors are confirmed, publish corrections prominently.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">User-Submitted Content</h2>
              <p className="mb-4">
                We welcome news submissions from our readers. All submissions are reviewed by our editorial team before publication. We reserve the right to edit submissions for clarity, accuracy, and editorial standards. Submission does not guarantee publication.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">Sponsored Content</h2>
              <p className="mb-4">
                Sponsored content and advertisements are clearly labeled and separated from editorial content. Our editorial team maintains full independence from commercial interests, and advertisers have no influence over our news coverage.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">Disclaimer</h2>
              <p className="mb-4">
                The information provided on Sacco Hub News is for general informational purposes only. While we strive for accuracy, we make no warranties about the completeness, reliability, or accuracy of this information. Any reliance you place on such information is strictly at your own risk.
              </p>
              <p className="mb-4">
                Content on this site does not constitute financial, legal, or professional advice. Readers should consult appropriate professionals before making decisions based on information presented here.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">Contact the Editorial Team</h2>
              <p className="mb-4">
                For editorial inquiries, corrections, or complaints:
              </p>
              <p className="mb-4">
                <strong>Email:</strong> saccohubnews@gmail.com<br />
                <strong>Subject Line:</strong> Editorial Inquiry
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Editorial;
