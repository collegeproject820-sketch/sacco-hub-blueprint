import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredNews = [
  {
    id: 1,
    title: "Kenya's SACCO Sector Records 15% Growth in Member Deposits",
    excerpt: "The cooperative movement continues to show resilience with significant growth in savings and loan disbursements across the country.",
    category: "SACCO News",
    categoryClass: "category-sacco",
    date: "January 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "New Regulations Set to Transform Cooperative Banking in Kenya",
    excerpt: "SASRA announces comprehensive guidelines aimed at strengthening financial oversight and member protection.",
    category: "Policy & Regulations",
    categoryClass: "category-policy",
    date: "January 17, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Top 10 SACCOs Leading Digital Transformation in 2026",
    excerpt: "Leading cooperatives embrace mobile banking, AI, and blockchain to serve members better.",
    category: "Business & Finance",
    categoryClass: "category-business",
    date: "January 16, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "Annual Cooperative Summit 2026 Set for March in Nairobi",
    excerpt: "Industry leaders, regulators, and stakeholders to converge for the biggest cooperative event of the year.",
    category: "Events",
    categoryClass: "category-events",
    date: "January 15, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "Youth Empowerment Through SACCOs: Success Stories",
    excerpt: "How young Kenyans are leveraging cooperative savings to build businesses and secure their futures.",
    category: "Cooperatives",
    categoryClass: "category-cooperatives",
    date: "January 14, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    featured: false,
  },
];

export function LatestNews() {
  const featured = featuredNews[0];
  const otherNews = featuredNews.slice(1);

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
          <Link to={`/news/${featured.id}`} className="group news-card lg:row-span-2">
            <div className="relative aspect-[16/10] lg:aspect-[16/14] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className={`category-badge ${featured.categoryClass}`}>
                  {featured.category}
                </span>
                <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mt-4 mb-3 group-hover:text-accent transition-colors">
                  {featured.title}
                </h3>
                <p className="text-white/80 mb-4 line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featured.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Other Articles */}
          <div className="grid gap-6">
            {otherNews.map((article) => (
              <Link key={article.id} to={`/news/${article.id}`} className="group news-card">
                <div className="flex gap-4 p-4">
                  <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`category-badge ${article.categoryClass} text-[10px] px-2 py-0.5`}>
                      {article.category}
                    </span>
                    <h3 className="font-semibold text-foreground mt-2 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
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
