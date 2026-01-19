import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Building2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-news relative z-10">
        <div className="py-20 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium animate-fade-up">
              <TrendingUp className="h-4 w-4" />
              <span>Kenya's Leading SACCO News Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Your Trusted Source for{" "}
              <span className="text-accent">SACCO & Financial</span> News
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Stay informed with the latest updates on SACCOs, cooperatives, business finance, 
              policy changes, and industry events across Kenya.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-base">
                <Link to="/news">
                  Read Latest News
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-base">
                <Link to="/advertise">Advertise With Us</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-accent" />
                  <span className="text-3xl md:text-4xl font-bold text-white">500+</span>
                </div>
                <p className="text-sm text-white/60">SACCOs Covered</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="text-3xl md:text-4xl font-bold text-white">50K+</span>
                </div>
                <p className="text-sm text-white/60">Monthly Readers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span className="text-3xl md:text-4xl font-bold text-white">10+</span>
                </div>
                <p className="text-sm text-white/60">Years of Trust</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 35.8C384 39 480 54 576 58.3C672 62.7 768 56.3 864 48.3C960 40.3 1056 30.7 1152 30.8C1248 31 1344 41 1392 46L1440 51V101H1392C1344 101 1248 101 1152 101C1056 101 960 101 864 101C768 101 672 101 576 101C480 101 384 101 288 101C192 101 96 101 48 101H0V50Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}
