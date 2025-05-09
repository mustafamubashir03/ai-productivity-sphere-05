
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";

const PrivacyPolicyPage = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy - AI Productivity Hub"
        description="Read our privacy policy to understand how we collect, use, and protect your personal information at AI Productivity Hub."
      />
      
      <PageHeader 
        title="Privacy Policy"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto prose">
          <p>Last updated: May 9, 2025</p>
          
          <h2>Introduction</h2>
          <p>
            AI Productivity Hub ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you visit our website aiproductivityhub.com (the "Site").
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing and using the Site, you acknowledge 
            that you have read, understood, and agree to be bound by all terms of this Privacy Policy. 
            If you do not agree, please do not access or use our Site.
          </p>
          
          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul>
            <li>Fill out a form on our Site</li>
            <li>Contact us via email</li>
            <li>Subscribe to our newsletter</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p>This personal information may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Message content</li>
          </ul>
          
          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our Site, we may automatically collect certain information about your 
            device and usage patterns. This information may include:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Referral source</li>
            <li>Pages visited</li>
            <li>Time and date of visits</li>
            <li>Time spent on pages</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Provide, operate, and maintain our Site</li>
            <li>Respond to your inquiries and requests</li>
            <li>Send newsletters and updates (if you've subscribed)</li>
            <li>Improve our Site and user experience</li>
            <li>Monitor Site usage and analyze trends</li>
            <li>Protect against unauthorized access</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about your browsing 
            activities and to measure and analyze Site traffic. Our Site may also use third-party 
            cookies from services like Google Analytics and Google AdSense to help us analyze how 
            users use the Site and to serve personalized advertisements.
          </p>
          <p>
            You can control cookies through your browser settings and other tools. However, disabling 
            cookies may limit your ability to use certain features of our Site.
          </p>
          
          <h2>Third-Party Disclosure</h2>
          <p>We may share your information with third parties in the following situations:</p>
          <ul>
            <li>With service providers who perform services on our behalf</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights, privacy, safety, or property</li>
            <li>In connection with a business transaction (e.g., merger or acquisition)</li>
          </ul>
          
          <h2>Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Right to access the personal information we hold about you</li>
            <li>Right to request correction of inaccurate information</li>
            <li>Right to request deletion of your personal information</li>
            <li>Right to opt-out of marketing communications</li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@aiproductivityhub.com.
          </p>
          
          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal 
            information. However, no method of transmission over the Internet or electronic storage 
            is 100% secure, so we cannot guarantee absolute security.
          </p>
          
          <h2>Children's Privacy</h2>
          <p>
            Our Site is not intended for children under 16 years of age. We do not knowingly collect 
            personal information from children under 16. If we learn that we have collected personal 
            information from a child under 16, we will promptly delete that information.
          </p>
          
          <h2>Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes to our practices 
            or for other operational, legal, or regulatory reasons. We will post the updated Privacy 
            Policy on this page with a "Last Updated" date.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@aiproductivityhub.com<br />
            Postal Address: 123 Tech Lane, Suite 100, San Francisco, CA 94107
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
