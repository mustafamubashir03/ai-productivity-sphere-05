
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";

const DisclaimerPage = () => {
  return (
    <>
      <SEOHead 
        title="Disclaimer - Top AI Tools"
        description="Read our comprehensive disclaimer covering affiliate disclosures, advertising, content accuracy, and terms of use for Top AI Tools."
      />
      
      <PageHeader 
        title="Website Disclaimer"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p className="text-gray-600 font-medium">Last Updated: May 17, 2025</p>
          
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">1. General Information</h2>
            <p className="mb-4">
              The information provided by Top AI Tools ("we," "our," or "us") on https://alltopaitools.com (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
            </p>
          </div>
          
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">2. Affiliate Disclosure</h2>
            <p className="mb-4">
              The Site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include but are not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Amazon Services LLC Associates Program</li>
              <li>Other AI tool affiliate programs</li>
            </ul>
            <p>
              We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites.
            </p>
          </div>
          
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">3. Advertising Disclosure</h2>
            <p className="mb-4">
              The Site uses Google AdSense and other advertising networks. These third-party vendors use cookies to serve ads based on a user's prior visits to our website or other websites.
            </p>
            <p>
              Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline">Google's Ads Settings</a>.
            </p>
          </div>
          
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">4. Content Accuracy</h2>
            <p className="mb-4">
              The AI tools landscape changes rapidly. While we strive to provide accurate and up-to-date information, we cannot guarantee that all content is completely current or error-free. Product features, pricing, and availability may change without notice.
            </p>
            <p>
              We recommend verifying critical information directly with the product providers before making any purchasing decisions.
            </p>
          </div>
          
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">5. No Professional Advice</h2>
            <p>
              The information contained on this Site is not intended as, and shall not be understood or construed as, professional advice. Your use of the Site does not create any professional-client relationship between you and Top AI Tools.
            </p>
          </div>
          
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">6. External Links Disclaimer</h2>
            <p className="mb-4">
              The Site may contain links to external websites that are not provided or maintained by or in any way affiliated with us. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
            </p>
            <p>
              We strongly advise you to review the Privacy Policy and Terms of Service of every site you visit.
            </p>
          </div>
          
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall Top AI Tools, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Site.
            </p>
          </div>
          
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">8. Contact Information</h2>
            <p className="mb-2">
              For any questions regarding this disclaimer, please contact us at:
            </p>
            <address className="not-italic">
              <p>Email: <a href="mailto:disclaimer@alltopaitools.com" className="text-blue-600 hover:underline">disclaimer@alltopaitools.com</a></p>
              <p>Postal Address: 123 Tech Lane, Suite 100, San Francisco, CA 94107</p>
            </address>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              This disclaimer was last updated on May 17, 2025 and may be amended from time to time without notice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisclaimerPage;
