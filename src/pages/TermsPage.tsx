
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";

const TermsPage = () => {
  return (
    <>
      <SEOHead 
        title="Terms and Conditions - AI Productivity Hub"
        description="Read our terms and conditions to understand the rules, guidelines, and agreements for using AI Productivity Hub."
      />
      
      <PageHeader 
        title="Terms and Conditions"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto prose">
          <p>Last updated: May 9, 2025</p>
          
          <h2>Agreement to Terms</h2>
          <p>
            By accessing and using AI Productivity Hub ("the Site"), you agree to be bound by these 
            Terms and Conditions ("Terms"), our Privacy Policy, and any additional terms and conditions 
            that may apply to specific sections of the Site or to products and services available 
            through the Site. If you do not agree to these Terms, please do not access or use the Site.
          </p>
          
          <h2>Intellectual Property</h2>
          <p>
            The Site and its original content, features, and functionality are owned by AI Productivity 
            Hub and are protected by international copyright, trademark, patent, trade secret, and 
            other intellectual property or proprietary rights laws.
          </p>
          <p>
            You may access, download, or print content from the Site for your personal, non-commercial 
            use only. You must not modify, reproduce, distribute, create derivative works of, publicly 
            display, publicly perform, republish, download, store, or transmit any of the material on 
            our Site without our express prior written consent.
          </p>
          
          <h2>User Contributions</h2>
          <p>
            The Site may contain message boards, chat rooms, personal web pages or profiles, forums, 
            bulletin boards, and other interactive features that allow users to post, submit, publish, 
            display, or transmit content or materials to us or on the Site.
          </p>
          <p>
            By providing any User Contribution on the Site, you grant us and our affiliates and service 
            providers, and each of their and our respective licensees, successors, and assigns the right 
            to use, reproduce, modify, perform, display, distribute, and otherwise disclose to third 
            parties any such material.
          </p>
          <p>You represent and warrant that:</p>
          <ul>
            <li>All User Contributions comply with applicable laws and regulations.</li>
            <li>You own or control all rights in your User Contributions.</li>
            <li>
              Your User Contributions do not violate the rights (including intellectual property rights 
              and privacy rights) of any third party.
            </li>
          </ul>
          
          <h2>Prohibited Uses</h2>
          <p>You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>
              Use the Site in any way that violates any applicable federal, state, local, or 
              international law or regulation.
            </li>
            <li>
              Use the Site to transmit or send unsolicited commercial communications.
            </li>
            <li>
              Impersonate or attempt to impersonate AI Productivity Hub, an AI Productivity Hub 
              employee, another user, or any other person or entity.
            </li>
            <li>
              Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site.
            </li>
            <li>
              Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts 
              of the Site, the server on which the Site is stored, or any server, computer, or database 
              connected to the Site.
            </li>
            <li>
              Use any robot, spider, or other automatic device, process, or means to access the Site 
              for any purpose, including monitoring or copying any of the material on the Site.
            </li>
          </ul>
          
          <h2>Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites or services that are not owned or 
            controlled by AI Productivity Hub. We have no control over, and assume no responsibility 
            for, the content, privacy policies, or practices of any third-party websites or services.
          </p>
          <p>
            You acknowledge and agree that AI Productivity Hub shall not be responsible or liable, 
            directly or indirectly, for any damage or loss caused or alleged to be caused by or in 
            connection with the use of or reliance on any such content, goods, or services available 
            on or through any such websites or services.
          </p>
          
          <h2>Disclaimers</h2>
          <p>
            THE SITE AND ITS CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT 
            ANY WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
            IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that the Site will function uninterrupted, secure, or available at any 
            particular time or location, or that any errors or defects will be corrected.
          </p>
          <p>
            Any material downloaded or otherwise obtained through the use of the Site is done at your 
            own discretion and risk. You will be solely responsible for any damage to your computer 
            system or loss of data resulting from such downloads.
          </p>
          
          <h2>Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL AI PRODUCTIVITY HUB, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, 
            SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, 
            OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, 
            OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO 
            ACCESS OR USE THE SITE.
          </p>
          
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If we make material 
            changes to these Terms, we will notify you by posting the revised Terms on the Site 
            with a "Last Updated" date.
          </p>
          <p>
            Your continued use of the Site after any such changes constitutes your acceptance of 
            the new Terms.
          </p>
          
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of the State of California without regard 
            to its conflict of law provisions. Any disputes relating to these Terms will be subject 
            to the exclusive jurisdiction of the courts of San Francisco County, California.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            Email: legal@aiproductivityhub.com<br />
            Postal Address: 123 Tech Lane, Suite 100, San Francisco, CA 94107
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
