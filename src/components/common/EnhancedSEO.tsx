
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
  noIndex?: boolean;
  ogType?: string;
  twitterCardType?: "summary" | "summary_large_image";
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

const EnhancedSEO = ({ 
  title, 
  description, 
  canonicalUrl, 
  image = "/favicon.svg", 
  structuredData,
  noIndex = false,
  ogType = "website",
  twitterCardType = "summary_large_image",
  author,
  publishedDate,
  modifiedDate
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
    
  // Format image URL to be absolute
  const fullImageUrl = image && !image.startsWith('http') 
    ? `https://alltopaitools.com${image.startsWith('/') ? image : `/${image}`}` 
    : image;

  return (
    <Helmet>
      {/* Essential Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Indexing Control */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content="Top AI Tools" />
      {publishedDate && <meta property="article:published_time" content={publishedDate} />}
      {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      {author && <meta name="twitter:creator" content={author} />}
      
      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#6366f1" />
      {author && <meta name="author" content={author} />}
      
      {/* Favicon links */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      
      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      
      {/* Structured data */}
      {structuredData && generateStructuredData()}
    </Helmet>
  );
};

export default EnhancedSEO;
