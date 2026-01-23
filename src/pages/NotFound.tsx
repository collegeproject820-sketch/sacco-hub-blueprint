import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, Newspaper } from "lucide-react";
import { Helmet } from "react-helmet-async";
import logo from "@/assets/logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found - Sacco Hub News</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Sacco Hub News homepage." />
      </Helmet>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <img src={logo} alt="Sacco Hub News" className="h-12 w-auto" />
            <div className="flex flex-col leading-tight text-left">
              <span className="text-lg font-heading font-bold">
                <span className="text-primary">SACCO</span>
                <span className="text-accent">HUB</span>
              </span>
              <span className="text-lg font-heading font-bold text-accent">NEWS</span>
            </div>
          </Link>

          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="text-[120px] md:text-[160px] font-heading font-bold text-primary/10 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-6 rounded-full bg-primary/10">
                <Search className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved. 
            Let's get you back to the latest SACCO news.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-primary">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/news">
                <Newspaper className="mr-2 h-4 w-4" />
                Browse News
              </Link>
            </Button>
          </div>

          {/* Back link */}
          <button 
            onClick={() => window.history.back()}
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back to previous page
          </button>
        </div>

        {/* Footer credit */}
        <div className="absolute bottom-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sacco Hub News. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
