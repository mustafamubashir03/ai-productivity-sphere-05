
import { Helmet } from "react-helmet-async";

interface SEOProviderProps {
  children: React.ReactNode;
}

const SEOProvider = ({ children }: SEOProviderProps) => {
  // Define the base URL for your logo - use your favicon.svg
  const logoUrl = "https://alltopaitools.com/favicon.svg";
  
  // Organization structured data for Google Search
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Top AI Tools",
    "url": "https://www.alltopaitools.com",
    "logo": logoUrl,
    "sameAs": [
      "https://twitter.com/topaitools",
      // Add other social media URLs if available
    ]
  };

  // Website structured data
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.alltopaitools.com",
    "name": "Top AI Tools - Best AI Tools for Productivity",
    "description": "Discover top AI tools for productivity, video editing, photo editing, copywriting, coding, and automation. Find the perfect AI solution for your workflow.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.alltopaitools.com/tools?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Helmet>
        {/* JSON-LD structured data for Google */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        
        {/* Additional head tags to ensure favicon is properly recognized */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </Helmet>
      {children}
    </>
  );
};

export default SEOProvider;
