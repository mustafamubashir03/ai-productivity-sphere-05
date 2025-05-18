
import SEOHead from "@/components/common/SEOHead";
import PageHeader from "@/components/common/PageHeader";

const AboutPage = () => {
  return (
    <>
      <SEOHead 
        title="About Us - Top AI Tools | Trusted AI Tools Resource"
        description="Top AI Tools provides independent reviews and guides on AI tools to boost your productivity. Learn about our mission, values, and editorial process."
      />
      
      <PageHeader 
        title="About Top AI Tools"
        description="Your trusted resource for AI-powered productivity solutions"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          {/* AdSense Compliance Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-8 text-sm">
            <p className="text-blue-700 dark:text-blue-300">
              <strong>Advertising Disclosure:</strong> Top AI Tools participates in various affiliate programs, including the Amazon Services LLC Associates Program. We may earn commissions from qualifying purchases made through links on our site, at no extra cost to you. These partnerships help support our research and content creation.
            </p>
          </div>
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Mission</h2>
            <p className="mb-4">
              Founded in 2023, Top AI Tools is dedicated to helping individuals and businesses navigate the complex landscape of AI productivity tools. Our team of technology experts and productivity specialists rigorously tests and evaluates tools to provide honest, practical recommendations.
            </p>
            <p>
              We believe AI should be accessible and beneficial to everyone, not just tech experts. That's why we focus on clear, actionable advice that helps you work smarter, not harder.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Editorial Process</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Research & Selection</h3>
                <p className="mb-2">
                  We identify tools based on:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>User demand and popularity</li>
                  <li>Innovative features</li>
                  <li>Market reputation</li>
                  <li>Pricing accessibility</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Testing & Evaluation</h3>
                <p className="mb-2">
                  Each tool undergoes:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>30+ hours of hands-on testing</li>
                  <li>Real-world use case analysis</li>
                  <li>Comparison with alternatives</li>
                  <li>Value-for-money assessment</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Review Process</h3>
                <p className="mb-2">
                  Our reviews feature:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Clear pros and cons</li>
                  <li>Pricing breakdowns</li>
                  <li>Ideal user profiles</li>
                  <li>Alternatives comparison</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Ongoing Monitoring</h3>
                <p className="mb-2">
                  We regularly:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Update existing reviews</li>
                  <li>Track tool performance</li>
                  <li>Monitor pricing changes</li>
                  <li>Respond to user feedback</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Team</h2>
            <p className="mb-4">
              Top AI Tools was founded by a team of productivity consultants, software engineers, and AI researchers who saw firsthand how AI could transform workflows. Today, our team includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Technology Experts</strong> with hands-on AI implementation experience</li>
              <li><strong>Productivity Coaches</strong> who understand workflow optimization</li>
              <li><strong>Content Specialists</strong> dedicated to clear, helpful communication</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Advertising & Affiliate Disclosure</h2>
            <p className="mb-4">
              To support our operations, Top AI Tools participates in various affiliate programs. This means we may earn commissions when you purchase through our links, at no additional cost to you.
            </p>
            <p className="mb-4">
              We maintain strict editorial independence:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Affiliate relationships never influence our recommendations</li>
              <li>We highlight both strengths and weaknesses of every product</li>
              <li>Our testing process is identical for all tools, regardless of partnerships</li>
            </ul>
            <p>
              We use Google AdSense to display relevant advertisements. These ads are clearly marked and selected automatically based on content relevance.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Contact & Feedback</h2>
            <p className="mb-4">
              We welcome your questions, suggestions, and tool recommendations. Please reach us at:
            </p>
            <p className="mb-2">
              <strong>Email:</strong> <a href="mailto:contact@alltopaitools.com" className="text-primary hover:underline">contact@alltopaitools.com</a>
            </p>
            <p>
              <strong>Mailing Address:</strong> 123 Tech Lane, Suite 100, San Francisco, CA 94107
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
