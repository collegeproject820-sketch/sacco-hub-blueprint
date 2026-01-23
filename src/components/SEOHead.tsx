import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
}

export function SEOHead({
  title = "Sacco Hub News – Your Trusted Source for SACCO & Financial News",
  description = "Kenya's leading platform for SACCO news, business, finance, cooperatives, and industry updates. Trusted by professionals and institutions.",
  image = "/favicon.png",
  url,
  type = "website",
  publishedTime,
  author,
}: SEOHeadProps) {
  const fullTitle = title.includes("Sacco Hub News") 
    ? title 
    : `${title} | Sacco Hub News`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Sacco Hub News" />
      {url && <meta property="og:url" content={url} />}
      
      {/* Article specific */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@SaccoHubNews" />
    </Helmet>
  );
}
