import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Sacco Hub News</title>
        <meta name="description" content="Read the terms and conditions governing the use of Sacco Hub News platform." />
      </Helmet>
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-news max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">Terms & Conditions</h1>
            
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-muted-foreground mb-8">
                Last updated: January 2025
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Sacco Hub News ("the Platform"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">2. Use of Service</h2>
              <p className="mb-4">
                You agree to use Sacco Hub News only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Post false, misleading, or defamatory content</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with the Platform's operation or security</li>
                <li>Collect user information without consent</li>
                <li>Use automated systems to access the Platform</li>
              </ul>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">3. User Accounts</h2>
              <p className="mb-4">
                When you create an account, you must provide accurate and complete information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">4. Content Submission</h2>
              <p className="mb-4">
                By submitting news articles or other content to Sacco Hub News, you:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Grant us a non-exclusive license to publish, edit, and distribute your content</li>
                <li>Confirm that you own or have rights to the content</li>
                <li>Accept that we may edit content for clarity, accuracy, or editorial standards</li>
                <li>Understand that submission does not guarantee publication</li>
              </ul>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">5. Intellectual Property</h2>
              <p className="mb-4">
                All content on Sacco Hub News, including text, graphics, logos, and software, is the property of Sacco Hub News or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">6. Disclaimer of Warranties</h2>
              <p className="mb-4">
                Sacco Hub News is provided "as is" without warranties of any kind. We do not warrant that:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>The Platform will be uninterrupted or error-free</li>
                <li>Content will be accurate or complete</li>
                <li>Defects will be corrected</li>
              </ul>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">7. Limitation of Liability</h2>
              <p className="mb-4">
                To the fullest extent permitted by law, Sacco Hub News shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">8. Advertising</h2>
              <p className="mb-4">
                Sacco Hub News may display advertisements. Advertisers are solely responsible for the content of their ads. We do not endorse or guarantee any products or services advertised on our Platform.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">9. Termination</h2>
              <p className="mb-4">
                We reserve the right to terminate or suspend your account and access to the Platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">10. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of Kenya. Any disputes shall be resolved in the courts of Nairobi, Kenya.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">11. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Platform after changes constitutes acceptance of the new Terms.
              </p>

              <h2 className="text-xl font-heading font-bold mt-8 mb-4">12. Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms, please contact us at:
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

export default Terms;
