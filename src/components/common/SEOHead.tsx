
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  image?: string;
  ogType?: string;
  noIndex?: boolean;
  twitterCardType?: "summary" | "summary_large_image";
  author?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  canonicalUrl, 
  image = "/placeholder.svg",
  ogType = "website",
  noIndex = false,
  twitterCardType = "summary_large_image",
  author
}: SEOHeadProps) => {
  const siteTitle = title.includes("Top AI Tools") ? title : `${title} - Top AI Tools`;
  
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
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      {author && <meta name="twitter:creator" content={author} />}
      
      {/* Mobile-specific meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#6366f1" />
      {author && <meta name="author" content={author} />}
      
      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;
