
import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type: "Product" | "Article" | "FAQPage" | "Review";
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

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}
      
      {/* Structured data */}
      {structuredData && generateStructuredData()}
    </Helmet>
  );
};

export default EnhancedSEO;
