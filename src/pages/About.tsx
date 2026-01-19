import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Users, Award, CheckCircle } from "lucide-react";

const values = [
  {
    icon: CheckCircle,
    title: "Credibility",
    description: "We deliver accurate, verified, and trustworthy news that our readers can rely on.",
  },
  {
    icon: CheckCircle,
    title: "Timeliness",
    description: "Breaking news and updates delivered promptly to keep you informed.",
  },
  {
    icon: CheckCircle,
    title: "Independence",
    description: "Unbiased reporting that serves the interests of our readers and the industry.",
  },
  {
    icon: CheckCircle,
    title: "Excellence",
    description: "Committed to the highest standards of journalism and professional ethics.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-28">
        <div className="container-news">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mt-4 mb-6">
              Kenya's Voice for SACCO & Cooperative News
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Delivering credible, impactful, and timely news to the cooperative movement since 2015.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-background">
        <div className="container-news">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                The Leading Platform for SACCO Industry News
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Sacco Hub News</strong> is Kenya's premier news platform dedicated 
                  to covering the Savings and Credit Cooperative Organizations (SACCOs), cooperatives, business finance, 
                  and the broader cooperative movement.
                </p>
                <p>
                  Founded with a vision to bridge the information gap in Kenya's cooperative sector, we have grown 
                  to become the trusted voice for millions of SACCO members, cooperative leaders, financial 
                  professionals, and policymakers across the nation.
                </p>
                <p>
                  Our team of experienced journalists and industry analysts work tirelessly to bring you the most 
                  relevant, accurate, and timely news that shapes the cooperative landscape in Kenya and beyond.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                  alt="Professional team meeting"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold">10+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-secondary/50">
        <div className="container-news">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="glass-card p-8 md:p-10">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To inform, educate, and empower the cooperative movement in Kenya through credible, 
                timely, and impactful journalism. We strive to be the definitive source of news and 
                insights that drive positive change in the SACCO and cooperative sector.
              </p>
            </div>

            {/* Vision */}
            <div className="glass-card p-8 md:p-10">
              <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-6">
                <Eye className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted and influential media platform for cooperative and financial 
                news in Africa, championing transparency, accountability, and growth in the 
                cooperative movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="section-padding bg-background">
        <div className="container-news">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Coverage</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
              What We Cover
            </h2>
            <p className="text-muted-foreground">
              Comprehensive coverage of everything that matters to Kenya's cooperative and financial sector
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "SACCO Operations", desc: "Governance, management, and member services" },
              { title: "Financial Markets", desc: "Market trends, investments, and economic analysis" },
              { title: "Policy & Regulation", desc: "SASRA updates, government policies, compliance" },
              { title: "Industry Events", desc: "Conferences, AGMs, workshops, and trainings" },
              { title: "Digital Innovation", desc: "Fintech, mobile banking, digital transformation" },
              { title: "Success Stories", desc: "Inspiring cooperative and member achievements" },
              { title: "Opinion & Analysis", desc: "Expert perspectives and industry insights" },
              { title: "Career & Training", desc: "Professional development opportunities" },
            ].map((item) => (
              <div key={item.title} className="p-6 border border-border rounded-xl hover:border-primary/50 transition-colors">
                <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-navy text-navy-foreground">
        <div className="container-news">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Principles</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">
              Values We Stand By
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="inline-flex p-3 rounded-full bg-white/10 mb-4">
                  <value.icon className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{value.title}</h4>
                <p className="text-sm text-navy-foreground/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="section-padding bg-background">
        <div className="container-news">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Audience</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-6">
                Who Reads Sacco Hub News?
              </h2>
              <ul className="space-y-4">
                {[
                  "SACCO board members, CEOs, and management teams",
                  "Cooperative society leaders and officials",
                  "Financial professionals and consultants",
                  "Regulators and policymakers (SASRA, Ministry of Cooperatives)",
                  "Banking and microfinance professionals",
                  "SACCO members seeking industry updates",
                  "Researchers and academics in cooperative studies",
                  "Investors and financial service providers",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6 text-center">
                <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground">50K+</div>
                <p className="text-sm text-muted-foreground">Monthly Readers</p>
              </div>
              <div className="glass-card p-6 text-center">
                <Award className="h-10 w-10 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground">500+</div>
                <p className="text-sm text-muted-foreground">SACCOs Covered</p>
              </div>
              <div className="glass-card p-6 text-center col-span-2">
                <div className="text-3xl font-bold text-foreground">98%</div>
                <p className="text-sm text-muted-foreground">Coverage Across All 47 Counties</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
