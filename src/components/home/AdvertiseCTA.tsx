import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Users, TrendingUp, Award } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Targeted Reach",
    description: "Connect with SACCOs, cooperatives, and financial professionals",
  },
  {
    icon: Users,
    title: "Engaged Audience",
    description: "50,000+ monthly readers actively seeking industry insights",
  },
  {
    icon: TrendingUp,
    title: "Growing Platform",
    description: "Rapidly expanding reach across Kenya's cooperative sector",
  },
  {
    icon: Award,
    title: "Trusted Voice",
    description: "10+ years of credible, authoritative financial journalism",
  },
];

export function AdvertiseCTA() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container-news relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Partner With Us</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
                Advertise on Kenya's Premier SACCO News Platform
              </h2>
              <p className="text-lg text-muted-foreground">
                Reach decision-makers, industry leaders, and millions of cooperative members. 
                Your message, delivered with impact.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-accent font-semibold px-8">
                <Link to="/advertise">Get Advertising Rates</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold px-8">
                <Link to="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-navy p-1">
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-heading font-bold text-primary mb-4">50K+</div>
                  <p className="text-xl font-semibold text-foreground mb-2">Monthly Readers</p>
                  <p className="text-muted-foreground">Industry professionals actively engaged with our content</p>
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-accent">500+</div>
                        <p className="text-xs text-muted-foreground">SACCOs</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">98%</div>
                        <p className="text-xs text-muted-foreground">Kenya Reach</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">10+</div>
                        <p className="text-xs text-muted-foreground">Years Trust</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
