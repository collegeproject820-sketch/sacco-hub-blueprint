import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Search, ChevronRight } from "lucide-react";
import { useRealtimeNews } from "@/hooks/useRealtimeNews";
import { useRealtimeCategories } from "@/hooks/useRealtimeCategories";
import { format } from "date-fns";

const News = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  
  const { news, isLoading: newsLoading } = useRealtimeNews();
  const { categories, isLoading: categoriesLoading } = useRealtimeCategories();

  const filteredNews = useMemo(() => {
    return news.filter((article) => {
      const matchesCategory = activeCategory === "all" || article.categories?.slug === activeCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesCategory && matchesSearch;
    });
  }, [news, activeCategory, searchQuery]);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

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

  const allCategories = [{ id: "all", name: "All News", slug: "all" }, ...categories];

  return (
    <Layout>
      {/* Header */}
      <section className="hero-gradient py-16 md:py-20">
        <div className="container-news">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              News & Articles
            </h1>
            <p className="text-lg text-white/80">
              Stay informed with the latest updates from Kenya's SACCO and cooperative sector
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="container-news">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categoriesLoading ? (
                <Skeleton className="h-10 w-64" />
              ) : (
                allCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      activeCategory === cat.slug
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))
              )}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding bg-background">
        <div className="container-news">
          {newsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-16 glass-card rounded-xl">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or check back later for new content.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleNews.map((article) => (
                <Link key={article.id} to={`/news/${article.slug}`} className="group news-card">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={article.featured_image || "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&h=600&fit=crop"}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className={`category-badge ${getCategoryClass(article.categories?.name)}`}>
                      {article.categories?.name || "News"}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(article.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {getReadTime(article.content)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg" 
                className="font-semibold"
                onClick={() => setVisibleCount((prev) => prev + 9)}
              >
                Load More Articles
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
