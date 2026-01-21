import { Link } from "react-router-dom";
import { Building2, TrendingUp, Users, Scale, CalendarDays, ArrowRight, Folder } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRealtimeCategories } from "@/hooks/useRealtimeCategories";

const iconMap: Record<string, typeof Building2> = {
  sacco: Building2,
  business: TrendingUp,
  finance: TrendingUp,
  cooperative: Users,
  cooperatives: Users,
  policy: Scale,
  regulation: Scale,
  event: CalendarDays,
  events: CalendarDays,
  default: Folder,
};

const colorMap: Record<string, string> = {
  sacco: "bg-primary/10 text-primary",
  business: "bg-sky-500/10 text-sky-600",
  finance: "bg-sky-500/10 text-sky-600",
  cooperative: "bg-emerald-500/10 text-emerald-600",
  cooperatives: "bg-emerald-500/10 text-emerald-600",
  policy: "bg-amber-500/10 text-amber-600",
  regulation: "bg-amber-500/10 text-amber-600",
  event: "bg-accent/10 text-accent",
  events: "bg-accent/10 text-accent",
  default: "bg-primary/10 text-primary",
};

export function CategoriesSection() {
  const { categories, isLoading } = useRealtimeCategories();

  const getIcon = (name: string) => {
    const lower = name.toLowerCase();
    for (const key of Object.keys(iconMap)) {
      if (lower.includes(key)) return iconMap[key];
    }
    return iconMap.default;
  };

  const getColor = (name: string) => {
    const lower = name.toLowerCase();
    for (const key of Object.keys(colorMap)) {
      if (lower.includes(key)) return colorMap[key];
    }
    return colorMap.default;
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-secondary/50">
        <div className="container-news">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Explore Topics</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
              News Categories
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="section-padding bg-secondary/50">
        <div className="container-news">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Explore Topics</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
              News Categories
            </h2>
            <p className="text-muted-foreground">
              Dive deep into the topics that matter most to Kenya's cooperative and financial sector
            </p>
          </div>
          <div className="text-center py-12 glass-card rounded-xl">
            <p className="text-muted-foreground">Categories are being set up. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

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
          {categories.map((category) => {
            const Icon = getIcon(category.name);
            const color = getColor(category.name);

            return (
              <Link
                key={category.id}
                to={`/news?category=${category.slug}`}
                className="group glass-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-xl ${color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{category.description || "Latest news and updates"}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">View articles</span>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-0 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
