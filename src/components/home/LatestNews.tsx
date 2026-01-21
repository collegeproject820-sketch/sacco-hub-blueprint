import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRealtimeNews } from "@/hooks/useRealtimeNews";
import { format } from "date-fns";

export function LatestNews() {
  const { news, isLoading } = useRealtimeNews({ limit: 5 });

  if (isLoading) {
    return (
      <section className="section-padding bg-background">
        <div className="container-news">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Stay Updated</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
                Latest News & Insights
              </h2>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="h-[400px] rounded-xl" />
            <div className="grid gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section className="section-padding bg-background">
        <div className="container-news">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Stay Updated</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
                Latest News & Insights
              </h2>
            </div>
          </div>
          <div className="text-center py-16 glass-card rounded-xl">
            <p className="text-muted-foreground text-lg">No news articles published yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon for the latest updates.</p>
          </div>
        </div>
      </section>
    );
  }

  const featured = news[0];
  const otherNews = news.slice(1);

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

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "No date";
    return format(new Date(dateStr), "MMMM d, yyyy");
  };

  const getReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-news">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Stay Updated</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
              Latest News & Insights
            </h2>
          </div>
          <Button asChild variant="ghost" className="text-primary hover:text-primary/80 font-semibold">
            <Link to="/news">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          <Link to={`/news/${featured.slug}`} className="group news-card lg:row-span-2">
            <div className="relative aspect-[16/10] lg:aspect-[16/14] overflow-hidden">
              <img
                src={featured.featured_image || "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&h=600&fit=crop"}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className={`category-badge ${getCategoryClass(featured.categories?.name)}`}>
                  {featured.categories?.name || "News"}
                </span>
                <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mt-4 mb-3 group-hover:text-accent transition-colors">
                  {featured.title}
                </h3>
                <p className="text-white/80 mb-4 line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(featured.published_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {getReadTime(featured.content)}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Other Articles */}
          <div className="grid gap-6">
            {otherNews.map((article) => (
              <Link key={article.id} to={`/news/${article.slug}`} className="group news-card">
                <div className="flex gap-4 p-4">
                  <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={article.featured_image || "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&h=600&fit=crop"}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`category-badge ${getCategoryClass(article.categories?.name)} text-[10px] px-2 py-0.5`}>
                      {article.categories?.name || "News"}
                    </span>
                    <h3 className="font-semibold text-foreground mt-2 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getReadTime(article.content)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
