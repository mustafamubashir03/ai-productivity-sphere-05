
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
}

const SEOHead = ({ title, description, canonicalUrl }: SEOHeadProps) => {
  const siteTitle = title.includes("Top AI Tools") ? title : `${title} - Top AI Tools`;
  
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};

export default SEOHead;
