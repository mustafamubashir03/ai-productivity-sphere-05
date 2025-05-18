
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
}

const SEOHead = ({ title, description, canonicalUrl }: SEOHeadProps) => {
  const siteTitle = title.includes("Top AI Tools") ? title : `${title} - Top AI Tools`;
  
  // Structured data for chat functionality (helps with rich results)
  const chatStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Top AI Tools",
    "url": "https://alltopaitools.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://alltopaitools.com/tools?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "hasPart": {
      "@type": "WebApplication",
      "name": "Top AI Tools Assistant",
      "applicationCategory": "BusinessApplication",
      "description": "AI assistant that helps users discover and compare AI tools."
    }
  };
  
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl ? (
        <link rel="canonical" href={`https://alltopaitools.com${canonicalUrl}`} />
      ) : (
        <link rel="canonical" href="https://alltopaitools.com" />
      )}
      <script type="application/ld+json">
        {JSON.stringify(chatStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
