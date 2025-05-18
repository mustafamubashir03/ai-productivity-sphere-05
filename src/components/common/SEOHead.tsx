
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  image?: string;
  ogType?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  canonicalUrl, 
  image = "/placeholder.svg",
  ogType = "website"
}: SEOHeadProps) => {
  const siteTitle = title.includes("Top AI Tools") ? title : `${title} - Top AI Tools`;
  
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
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content="Top AI Tools" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Mobile-specific meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="theme-color" content="#6366f1" />
      
      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </Helmet>
  );
};

export default SEOHead;
