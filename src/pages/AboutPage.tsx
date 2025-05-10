
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";

const AboutPage = () => {
  return (
    <>
      <SEOHead 
        title="About Us - AI Productivity Hub"
        description="Learn about our mission to help you discover the best AI tools for enhancing productivity and streamlining your workflow."
      />
      
      <PageHeader 
        title="About AI Productivity Hub"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              At AI Productivity Hub, we're passionate about helping professionals, creatives, and businesses 
              harness the power of artificial intelligence to enhance productivity and streamline workflows.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              In today's rapidly evolving technological landscape, AI tools are revolutionizing how we work. 
              However, with hundreds of new tools launching every month, finding the right solutions for your 
              specific needs can be overwhelming.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              That's where we come in. We thoroughly research, test, and review AI productivity tools across 
              various categories to provide you with reliable, unbiased information to make informed decisions.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">What We Do</h2>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Curate</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We continuously monitor the AI tools market to identify the most promising 
                  and effective solutions across different categories.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Evaluate</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our team tests each tool hands-on, assessing its functionality, usability, 
                  pricing value, and how well it solves real-world productivity challenges.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Educate</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Through detailed reviews, guides, and tutorials, we help you understand how 
                  to leverage these tools to transform your productivity and workflow.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Our Values</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-medium">Independence</span> - Our reviews are always unbiased and based on genuine evaluation.
              </li>
              <li>
                <span className="font-medium">Thoroughness</span> - We deeply test each tool before recommending it to our audience.
              </li>
              <li>
                <span className="font-medium">Practicality</span> - We focus on real-world applications and tangible benefits.
              </li>
              <li>
                <span className="font-medium">Accessibility</span> - We aim to make complex AI tools understandable for everyone.
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Connect With Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Have questions, feedback, or suggestions? We'd love to hear from you! Visit our 
              <a href="/contact" className="text-primary hover:underline"> contact page</a> or 
              email us directly at <a href="mailto:contact@aiproductivityhub.com" className="text-primary hover:underline">contact@aiproductivityhub.com</a>.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Thank you for visiting AI Productivity Hub. We're excited to be part of your journey 
              toward enhanced productivity through AI.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
