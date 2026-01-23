import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Sacco Hub News</title>
        <meta name="description" content="Learn how Sacco Hub News collects, uses, and protects your personal information." />
      </Helmet>
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-news max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-muted-foreground mb-8">
                Last updated: January 2025
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                At Sacco Hub News, we collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Account information (name, email address) when you register</li>
                <li>News submissions and related content you provide</li>
                <li>Communications you send to us</li>
                <li>Usage data and analytics about how you interact with our platform</li>
              </ul>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and publish news submissions</li>
                <li>Send you newsletters and updates (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>With service providers who assist in our operations</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
                <li>With your consent</li>
              </ul>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">5. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Export your data in a portable format</li>
              </ul>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">6. Cookies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookies through your browser settings.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">7. Children's Privacy</h2>
              <p className="mb-4">
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">8. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">9. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mb-4">
                <strong>Email:</strong> saccohubnews@gmail.com<br />
                <strong>Phone:</strong> 020-39363588<br />
                <strong>Address:</strong> LAPTRUST ANNEX, Off Harambee Avenue, P.O. Box 57052-00200, Nairobi CBD
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Privacy;
