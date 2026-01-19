import { Link } from "react-router-dom";
import { Building2, TrendingUp, Users, Scale, CalendarDays, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "SACCO News",
    description: "Latest updates on Savings and Credit Cooperatives across Kenya",
    icon: Building2,
    path: "/news?category=sacco",
    color: "bg-primary/10 text-primary",
    articles: 156,
  },
  {
    name: "Business & Finance",
    description: "Financial insights, market trends, and economic analysis",
    icon: TrendingUp,
    path: "/news?category=business",
    color: "bg-sky-500/10 text-sky-600",
    articles: 124,
  },
  {
    name: "Cooperatives",
    description: "Cooperative movement news, success stories, and innovations",
    icon: Users,
    path: "/news?category=cooperatives",
    color: "bg-emerald-500/10 text-emerald-600",
    articles: 98,
  },
  {
    name: "Policy & Regulations",
    description: "Government policies, regulatory updates, and compliance news",
    icon: Scale,
    path: "/news?category=policy",
    color: "bg-amber-500/10 text-amber-600",
    articles: 67,
  },
  {
    name: "Events & Announcements",
    description: "Industry events, conferences, and important announcements",
    icon: CalendarDays,
    path: "/news?category=events",
    color: "bg-accent/10 text-accent",
    articles: 45,
  },
];

export function CategoriesSection() {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-news">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Explore Topics</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
            News Categories
          </h2>
          <p className="text-muted-foreground">
            Dive deep into the topics that matter most to Kenya's cooperative and financial sector
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group glass-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-xl ${category.color} mb-4`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{category.articles} articles</span>
                <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-0 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
