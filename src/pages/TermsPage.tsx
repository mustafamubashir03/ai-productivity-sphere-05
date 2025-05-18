
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";

const TermsPage = () => {
  return (
    <>
      <SEOHead 
        title="Terms and Conditions - Top AI Tools"
        description="Review the legal terms governing your use of Top AI Tools, including intellectual property rights, user responsibilities, and limitations of liability."
      />
      
      <PageHeader 
        title="Terms and Conditions"
        description="Last Updated: May 9, 2025"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Top AI Tools ("the Site"), you agree to be bound by these Terms and Conditions ("Terms"), our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>, and any additional terms that may apply to specific services or features of the Site.
            </p>
            <p>
              If you do not agree with any part of these Terms, you must immediately discontinue your use of the Site. Continued use constitutes acceptance of these Terms.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">2. Intellectual Property Rights</h2>
            <p className="mb-4">
              All content on the Site, including text, graphics, logos, images, software, and other materials ("Content"), is the property of Top AI Tools or its content suppliers and protected by international copyright and intellectual property laws.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable license to access and use the Site for personal, non-commercial purposes. You may not:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Republish, sell, rent, or sub-license Content from the Site</li>
              <li>Reproduce, duplicate, or copy Content for commercial purposes</li>
              <li>Modify or create derivative works from our Content</li>
              <li>Use automated systems (e.g., scraping, data mining) to extract data</li>
            </ul>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
            <h3 className="text-xl font-semibold mb-2">3.1 User Contributions</h3>
            <p className="mb-4">
              The Site may allow users to post content ("User Contributions"). By submitting User Contributions, you grant us a worldwide, royalty-free, perpetual license to use, modify, display, and distribute your content.
            </p>
            <p className="mb-4 font-medium">You warrant that your User Contributions:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Are original and you have all necessary rights to share them</li>
              <li>Do not violate any third-party rights (including privacy and IP rights)</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Are not defamatory, obscene, or otherwise objectionable</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">3.2 Prohibited Activities</h3>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Use the Site for any unlawful purpose or in violation of these Terms</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Introduce viruses, malware, or other harmful code</li>
              <li>Interfere with the Site's security or operation</li>
              <li>Engage in data mining, scraping, or similar data gathering</li>
              <li>Send unsolicited communications or spam</li>
            </ul>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Content and Links</h2>
            <p className="mb-4">
              The Site may contain links to third-party websites, services, or content that we do not own or control. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The content, accuracy, or practices of third-party sites</li>
              <li>Any damage or loss caused by third-party content</li>
              <li>Your interactions with any third parties</li>
            </ul>
            <p>
              We recommend reviewing the terms and privacy policies of any third-party sites you visit.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">5. Disclaimers and Limitations</h2>
            <h3 className="text-xl font-semibold mb-2">5.1 Service Disclaimer</h3>
            <p className="mb-4 italic">
              THE SITE AND ITS CONTENT ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="mb-4">
              We do not guarantee that:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The Site will be available uninterrupted or error-free</li>
              <li>Defects will be corrected</li>
              <li>The Site or servers are free of viruses or harmful components</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">5.2 Limitation of Liability</h3>
            <p className="italic">
              IN NO EVENT SHALL TOP AI TOOLS, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">6. General Provisions</h2>
            <h3 className="text-xl font-semibold mb-2">6.1 Modifications</h3>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the Site. Your continued use constitutes acceptance of the modified Terms.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">6.2 Governing Law</h3>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes shall be resolved exclusively in the courts of San Francisco County, California.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">6.3 Severability</h3>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">7. Contact Information</h2>
            <p className="mb-2">
              For questions about these Terms, please contact us at:
            </p>
            <address className="not-italic">
              <p>Email: <a href="mailto:legal@alltopaitools.com" className="text-blue-600 hover:underline">legal@alltopaitools.com</a></p>
              <p>Postal Address: 123 Tech Lane, Suite 100, San Francisco, CA 94107</p>
            </address>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              These Terms and Conditions were last updated on May 9, 2025 and replace all prior versions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
