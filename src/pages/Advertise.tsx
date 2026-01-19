import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Target, Users, TrendingUp, Award, CheckCircle, Monitor, FileText, Megaphone, ArrowRight } from "lucide-react";

const adOptions = [
  {
    icon: Monitor,
    title: "Banner Advertisements",
    description: "Premium placement across our website with maximum visibility to our engaged audience.",
    features: ["Homepage banners", "Article sidebar ads", "Category page placement", "Mobile-optimized formats"],
  },
  {
    icon: FileText,
    title: "Sponsored Articles",
    description: "Custom content created by our editorial team to showcase your brand story.",
    features: ["Professional writing", "SEO optimized", "Social media promotion", "Newsletter inclusion"],
  },
  {
    icon: Megaphone,
    title: "Press Releases",
    description: "Get your news and announcements published to our extensive readership.",
    features: ["Editorial review", "Category placement", "Social sharing", "Archive access"],
  },
];

const stats = [
  { value: "50K+", label: "Monthly Readers" },
  { value: "500+", label: "SACCOs Covered" },
  { value: "98%", label: "Kenya Coverage" },
  { value: "10+", label: "Years of Trust" },
];

const audienceSegments = [
  "SACCO Board Members & CEOs",
  "Cooperative Society Officials",
  "Financial Professionals",
  "Banking & Microfinance Executives",
  "Government & Regulatory Officials",
  "Financial Service Providers",
  "Researchers & Academics",
  "General SACCO Members",
];

const Advertise = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-28">
        <div className="container-news">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Partner With Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mt-4 mb-6">
              Advertise on Kenya's Premier SACCO News Platform
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Reach decision-makers, industry leaders, and millions of cooperative members 
              with targeted advertising solutions.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
              <a href="#contact-form">
                Get Advertising Rates
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container-news">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Advertise */}
      <section className="section-padding bg-background">
        <div className="container-news">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
              Why Advertise With Sacco Hub News?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "Targeted Reach", desc: "Direct access to SACCO leaders and cooperative professionals" },
              { icon: Users, title: "Engaged Audience", desc: "Readers actively seeking industry insights and solutions" },
              { icon: TrendingUp, title: "Growing Platform", desc: "Rapidly expanding reach across Kenya's cooperative sector" },
              { icon: Award, title: "Trusted Voice", desc: "10+ years of credible, authoritative journalism" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-news">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Audience</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-6">
                Who Will See Your Message?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our platform reaches key decision-makers and influencers across Kenya's 
                cooperative and financial sector. Your advertisement will be seen by:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {audienceSegments.map((segment) => (
                  <div key={segment} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{segment}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">Reach by Numbers</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Monthly Page Views</span>
                    <span className="font-semibold">200K+</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Newsletter Subscribers</span>
                    <span className="font-semibold">25K+</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "70%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Social Media Followers</span>
                    <span className="font-semibold">35K+</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advertising Options */}
      <section className="section-padding bg-background">
        <div className="container-news">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Solutions</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
              Advertising Options
            </h2>
            <p className="text-muted-foreground">
              Choose the format that best suits your marketing objectives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {adOptions.map((option) => (
              <div key={option.title} className="glass-card p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                  <option.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{option.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{option.description}</p>
                <ul className="space-y-3">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="section-padding bg-navy text-navy-foreground">
        <div className="container-news">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Request Advertising Rates
            </h2>
            <p className="text-navy-foreground/80 mb-8">
              Contact our advertising team for a customized proposal that fits your budget and objectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
                <Link to="/contact">Contact Us Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8">
                <a href="mailto:saccohubnews@gmail.com">Email Us Directly</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Advertise;
