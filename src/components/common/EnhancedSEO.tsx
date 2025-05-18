
import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type: "Product" | "Article" | "FAQPage" | "Review" | "WebSite" | "BreadcrumbList";
  data: any;
}

interface EnhancedSEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  image?: string;
  structuredData?: StructuredDataProps[];
}

const EnhancedSEO = ({ 
  title, 
  description, 
  canonicalUrl, 
  image, 
  structuredData 
}: EnhancedSEOProps) => {
  
  const siteTitle = title.includes("Top AI Tools") ? title : `${title} - Top AI Tools`;
  
  // Generate structured data as string
  const generateStructuredData = () => {
    if (!structuredData || structuredData.length === 0) return null;
    
    return structuredData.map((item, index) => {
      let data = { ...item.data };
      
      if (item.type === "Product") {
        data = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          ...data
        };
      } else if (item.type === "Article") {
        data = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          ...data
        };
      } else if (item.type === "FAQPage") {
        data = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          ...data
        };
      } else if (item.type === "Review") {
        data = {
          "@context": "https://schema.org",
          "@type": "Review",
          ...data
        };
      } else if (item.type === "WebSite") {
        data = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          ...data
        };
      } else if (item.type === "BreadcrumbList") {
        data = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          ...data
        };
      }
      
      return (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      );
    });
  };

  // Format canonical URL with domain
  const fullCanonicalUrl = canonicalUrl 
    ? `https://alltopaitools.com${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`
    : "https://alltopaitools.com";

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content="Top AI Tools" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}
      
      {/* Structured data */}
      {structuredData && generateStructuredData()}
    </Helmet>
  );
};

export default EnhancedSEO;
