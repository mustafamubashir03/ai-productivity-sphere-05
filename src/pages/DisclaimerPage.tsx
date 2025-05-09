
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";

const DisclaimerPage = () => {
  return (
    <>
      <SEOHead 
        title="Disclaimer - AI Productivity Hub"
        description="Read our disclaimer to understand how we operate, our affiliations, and other important information about AI Productivity Hub."
      />
      
      <PageHeader 
        title="Disclaimer"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto prose">
          <p>Last updated: May 9, 2025</p>
          
          <h2>Affiliate Disclosure</h2>
          <p>
            AI Productivity Hub ("we," "our," or "us") participates in affiliate marketing programs, 
            which means we may earn commissions on products or services that are purchased through links 
            on our website. We may also receive compensation from companies whose products or services 
            are featured on our site.
          </p>
          <p>
            When you click on affiliate links and make purchases, we may earn a commission at no additional 
            cost to you. These commissions help support the maintenance and operation of AI Productivity Hub, 
            allowing us to continue providing valuable content and resources.
          </p>
          
          <h2>Advertising Disclosure</h2>
          <p>
            AI Productivity Hub displays advertisements, including Google AdSense ads, throughout the website. 
            These advertisements are clearly labeled and are selected automatically by our advertising partners 
            based on various factors, such as your browsing history and interests.
          </p>
          <p>
            We strive to ensure that all advertisements displayed on our site are relevant, appropriate, and 
            do not detract from the user experience. However, we do not personally endorse all products or 
            services that may be advertised on AI Productivity Hub.
          </p>
          
          <h2>Accuracy of Information</h2>
          <p>
            We make every effort to provide accurate, up-to-date information about AI productivity tools 
            and related topics. However, the AI technology landscape evolves rapidly, and information may 
            change after publication. Features, pricing, availability, and other details of the tools and 
            services mentioned on our site may change without notice.
          </p>
          <p>
            While we strive for accuracy, we cannot guarantee that all information on AI Productivity Hub 
            is completely error-free or current. We recommend that you verify important information directly 
            with the tool providers before making any decisions.
          </p>
          
          <h2>No Guarantees</h2>
          <p>
            We do not guarantee specific results from using any of the AI tools or implementing any strategies 
            discussed on our site. The effectiveness of AI productivity tools can vary based on individual 
            circumstances, expertise, implementation, and other factors.
          </p>
          <p>
            User experiences, productivity gains, and outcomes from using the tools featured on 
            AI Productivity Hub may vary, and we make no promises regarding results.
          </p>
          
          <h2>External Links</h2>
          <p>
            AI Productivity Hub contains links to external websites that are not operated by us. We have no 
            control over the content and practices of these sites and cannot be held responsible for their 
            privacy policies, content, or services.
          </p>
          <p>
            We provide these links for your convenience and to provide additional information, but linking 
            to them does not imply our endorsement of the site or its contents.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Disclaimer, please contact us at:
          </p>
          <p>
            Email: disclaimer@aiproductivityhub.com<br />
            Postal Address: 123 Tech Lane, Suite 100, San Francisco, CA 94107
          </p>
        </div>
      </div>
    </>
  );
};

export default DisclaimerPage;
