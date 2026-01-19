import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, ChevronRight } from "lucide-react";

const allNews = [
  {
    id: 1,
    title: "Kenya's SACCO Sector Records 15% Growth in Member Deposits",
    excerpt: "The cooperative movement continues to show resilience with significant growth in savings and loan disbursements across the country.",
    category: "SACCO News",
    categoryKey: "sacco",
    categoryClass: "category-sacco",
    date: "January 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "New Regulations Set to Transform Cooperative Banking in Kenya",
    excerpt: "SASRA announces comprehensive guidelines aimed at strengthening financial oversight and member protection.",
    category: "Policy & Regulations",
    categoryKey: "policy",
    categoryClass: "category-policy",
    date: "January 17, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Top 10 SACCOs Leading Digital Transformation in 2026",
    excerpt: "Leading cooperatives embrace mobile banking, AI, and blockchain to serve members better.",
    category: "Business & Finance",
    categoryKey: "business",
    categoryClass: "category-business",
    date: "January 16, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Annual Cooperative Summit 2026 Set for March in Nairobi",
    excerpt: "Industry leaders, regulators, and stakeholders to converge for the biggest cooperative event of the year.",
    category: "Events",
    categoryKey: "events",
    categoryClass: "category-events",
    date: "January 15, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Youth Empowerment Through SACCOs: Success Stories",
    excerpt: "How young Kenyans are leveraging cooperative savings to build businesses and secure their futures.",
    category: "Cooperatives",
    categoryKey: "cooperatives",
    categoryClass: "category-cooperatives",
    date: "January 14, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "SASRA Releases 2025 Annual Report on SACCO Performance",
    excerpt: "Comprehensive analysis reveals key trends, challenges, and opportunities in Kenya's SACCO sector.",
    category: "Policy & Regulations",
    categoryKey: "policy",
    categoryClass: "category-policy",
    date: "January 13, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
  },
  {
    id: 7,
    title: "Women-Led SACCOs Show Remarkable Growth in Rural Kenya",
    excerpt: "Female cooperative leaders driving financial inclusion and community development.",
    category: "Cooperatives",
    categoryKey: "cooperatives",
    categoryClass: "category-cooperatives",
    date: "January 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
  },
  {
    id: 8,
    title: "Interest Rate Changes: What It Means for SACCO Loans",
    excerpt: "Expert analysis on how Central Bank policies affect cooperative lending and borrowing.",
    category: "Business & Finance",
    categoryKey: "business",
    categoryClass: "category-business",
    date: "January 11, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&h=600&fit=crop",
  },
];

const categories = [
  { key: "all", name: "All News" },
  { key: "sacco", name: "SACCO News" },
  { key: "business", name: "Business & Finance" },
  { key: "cooperatives", name: "Cooperatives" },
  { key: "policy", name: "Policy & Regulations" },
  { key: "events", name: "Events" },
];

const News = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = allNews.filter((article) => {
    const matchesCategory = activeCategory === "all" || article.categoryKey === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeCategory === cat.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
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
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((article) => (
                <Link key={article.id} to={`/news/${article.id}`} className="group news-card">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className={`category-badge ${article.categoryClass}`}>
                      {article.category}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="font-semibold">
              Load More Articles
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
