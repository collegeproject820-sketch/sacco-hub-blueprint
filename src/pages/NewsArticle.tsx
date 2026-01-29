import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowLeft, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { format } from "date-fns";
import { SocialShareButtons } from "@/components/news/SocialShareButtons";
import { SEOHead } from "@/components/SEOHead";
import { Helmet } from "react-helmet-async";

type NewsPost = Tables<'news_posts'> & {
  categories?: Tables<'categories'> | null;
};

const NewsArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("news_posts")
        .select("*, categories(*)")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setArticle(data);
        // Increment view count
        supabase
          .from("news_posts")
          .update({ views_count: (data.views_count || 0) + 1 })
          .eq("id", data.id)
          .then(() => {});
      }
      setIsLoading(false);
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "No date";
    return format(new Date(dateStr), "MMMM d, yyyy");
  };

  const getReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  const getCategoryClass = (categoryName?: string) => {
    if (!categoryName) return "category-sacco";
    const name = categoryName.toLowerCase();
    if (name.includes("sacco")) return "category-sacco";
    if (name.includes("business") || name.includes("finance")) return "category-business";
    if (name.includes("cooperative")) return "category-cooperatives";
    if (name.includes("policy") || name.includes("regulation")) return "category-policy";
    if (name.includes("event")) return "category-events";
    return "category-sacco";
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-news max-w-4xl">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-64 mb-8" />
            <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </section>
      </Layout>
    );
  }

  if (notFound || !article) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-news text-center py-16">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/news">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const articleUrl = `${window.location.origin}/news/${article.slug}`;

  return (
    <>
      <Helmet>
        <title>{article.title} - Sacco Hub News</title>
        <meta name="description" content={article.excerpt || article.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt || article.title} />
        <meta property="og:url" content={articleUrl} />
        {article.featured_image && <meta property="og:image" content={article.featured_image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt || article.title} />
        {article.featured_image && <meta name="twitter:image" content={article.featured_image} />}
      </Helmet>
      <Layout>
        <article className="section-padding bg-background">
          <div className="container-news max-w-4xl">
            {/* Back Link */}
            <Button asChild variant="ghost" className="mb-8 -ml-4">
              <Link to="/news">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Link>
            </Button>

            {/* Header */}
            <header className="mb-8">
              <span className={`category-badge ${getCategoryClass(article.categories?.name)} mb-4 inline-block`}>
                {article.categories?.name || "News"}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.published_at)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {getReadTime(article.content)}
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {article.views_count || 0} views
                </span>
              </div>
              
              {/* Social Share Buttons */}
              <SocialShareButtons 
                url={articleUrl}
                title={article.title}
                description={article.excerpt || undefined}
              />
            </header>

            {/* Featured Image */}
            {article.featured_image && (
              <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8">
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-lg text-muted-foreground mb-8 font-medium leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {/* Content - Render HTML from rich text editor */}
            <div 
              className="prose prose-lg max-w-none text-foreground prose-headings:font-heading prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Footer with Share Buttons */}
            <footer className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Published on {formatDate(article.published_at)}
                    </p>
                  </div>
                  <Button asChild variant="outline">
                    <Link to="/news">View More Articles</Link>
                  </Button>
                </div>
                
                {/* Bottom Share Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/50">
                  <p className="text-sm font-medium text-foreground">Enjoyed this article? Share it!</p>
                  <SocialShareButtons 
                    url={articleUrl}
                    title={article.title}
                    description={article.excerpt || undefined}
                  />
                </div>
              </div>
            </footer>
          </div>
        </article>
      </Layout>
    </>
  );
};

export default NewsArticle;
