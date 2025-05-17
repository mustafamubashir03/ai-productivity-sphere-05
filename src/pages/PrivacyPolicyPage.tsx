import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";

const PrivacyPolicyPage = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy - Top AI Tools"
        description="Learn how Top AI Tools collects, uses, and protects your personal information in compliance with privacy laws and Google AdSense requirements."
      />
      
      <PageHeader 
        title="Privacy Policy"
        description="Last Updated: May 17, 2025"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Top AI Tools ("we," "our," or "us") operates https://topaitools.com (the "Site"). We are committed to protecting your privacy and handling your personal information with transparency.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site. By using our Site, you consent to the data practices described in this policy. If you do not agree, please discontinue use of our Site.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">2. Information Collection</h2>
            
            <h3 className="text-xl font-semibold mb-2">2.1 Personal Information</h3>
            <p className="mb-4">
              We collect personal information you voluntarily provide when you:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Register for an account or newsletter</li>
              <li>Submit contact forms or inquiries</li>
              <li>Participate in surveys or promotions</li>
              <li>Make purchases (if applicable)</li>
            </ul>
            <p>This may include:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Name and contact details (email, phone)</li>
              <li>Demographic information</li>
              <li>Payment information (for purchases)</li>
              <li>Communication preferences</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">2.2 Automatic Data Collection</h3>
            <p className="mb-4">
              We automatically collect certain information when you visit our Site:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device information (IP address, browser type, OS)</li>
              <li>Usage data (pages visited, time spent, clicks)</li>
              <li>Referring website details</li>
              <li>Cookies and tracking data (see Section 4)</li>
            </ul>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">3. Use of Information</h2>
            <p className="mb-4">
              We use collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To provide and maintain our Site</li>
              <li>To personalize your experience</li>
              <li>To communicate with you (service messages, updates)</li>
              <li>To process transactions (if applicable)</li>
              <li>To improve our products and services</li>
              <li>To analyze Site usage and trends</li>
              <li>To prevent fraud and enhance security</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar technologies (web beacons, pixels) to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Remember user preferences</li>
              <li>Analyze Site traffic and performance</li>
              <li>Enable advertising functions</li>
              <li>Detect and prevent fraud</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">4.1 Google AdSense</h3>
            <p className="mb-4">
              We use Google AdSense to display ads on our Site. Google uses cookies to serve personalized ads based on your visits to our Site and other websites. You can opt out of personalized advertising by visiting <a href="https://adssettings.google.com" className="text-blue-600 hover:underline">Google's Ads Settings</a>.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">4.2 Analytics</h3>
            <p className="mb-4">
              We use Google Analytics to understand how users interact with our Site. Google Analytics collects information such as how often users visit, what pages they visit, and what other sites they used prior to coming to our Site.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">4.3 Cookie Management</h3>
            <p>
              Most browsers allow you to refuse cookies or delete existing cookies. However, blocking cookies may affect Site functionality. For more information, visit <a href="https://www.allaboutcookies.org" className="text-blue-600 hover:underline">allaboutcookies.org</a>.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">5. Data Sharing and Disclosure</h2>
            <p className="mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Service providers (hosting, analytics, payment processors)</li>
              <li>Advertising partners (including Google AdSense)</li>
              <li>Legal authorities when required by law</li>
              <li>Successor entities in case of business transfer</li>
            </ul>
            <p>
              We require all third parties to respect your privacy and only process your data for specified purposes.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">6. User Rights and Choices</h2>
            <p className="mb-4">
              Depending on your location, you may have rights to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Restrict or object to processing</li>
              <li>Withdraw consent (where applicable)</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            <p>
              To exercise these rights, contact us at <a href="mailto:privacy@topaitools.com" className="text-blue-600 hover:underline">privacy@topaitools.com</a>.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>SSL encryption for data transmission</li>
              <li>Regular security assessments</li>
              <li>Access controls to personal data</li>
              <li>Secure storage systems</li>
            </ul>
            <p>
              However, no Internet transmission is 100% secure. We cannot guarantee absolute security of your information.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers in compliance with applicable laws.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <p>
              Our Site is not intended for children under 16. We do not knowingly collect personal information from children under 16. If we become aware of such collection, we will take steps to delete the information promptly.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">10. Policy Updates</h2>
            <p className="mb-4">
              We may update this Privacy Policy periodically. We will notify you of material changes by posting the new policy on this page with an updated "Last Updated" date.
            </p>
            <p>
              Your continued use of the Site after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
            <p className="mb-2">
              For privacy-related inquiries, please contact our Data Protection Officer at:
            </p>
            <address className="not-italic">
              <p>Email: <a href="mailto:privacy@topaitools.com" className="text-blue-600 hover:underline">privacy@topaitools.com</a></p>
              <p>Postal Address: 123 Tech Lane, Suite 100, San Francisco, CA 94107</p>
            </address>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              This Privacy Policy is effective as of May 17, 2025 and supersedes all previous versions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
