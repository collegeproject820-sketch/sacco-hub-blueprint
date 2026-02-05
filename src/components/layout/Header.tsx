import { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "News", path: "/news" },
  { name: "Events", path: "/events" },
  { name: "Advertise", path: "/advertise" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut, isLoading, authReady } = useAuth();

  // Compute auth state only once authReady is true
  const authState = useMemo(() => {
    if (!authReady) return 'loading';
    if (!user) return 'guest';
    if (isAdmin) return 'admin';
    return 'user';
  }, [authReady, user, isAdmin]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container-news">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Sacco Hub News" className="h-12 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg sm:text-xl font-heading font-bold">
                <span className="text-primary">SACCO</span>
                <span className="text-accent">HUB</span>
              </span>
              <span className="text-lg sm:text-xl font-heading font-bold text-accent">NEWS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {authState === 'loading' ? (
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            ) : authState === 'guest' ? (
              <>
                <Button asChild variant="ghost" size="sm" className="font-medium">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild variant="default" size="sm" className="btn-primary font-semibold">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            ) : authState === 'admin' ? (
              <>
                <Button asChild variant="default" size="sm" className="btn-primary font-semibold">
                  <Link to="/admin">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="font-medium">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="font-medium">
                  <Link to="/submit-news">
                    <FileText className="mr-2 h-4 w-4" />
                    Submit News
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="font-medium">
                  <Link to="/account">
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="font-medium">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
            {authState !== 'loading' && (
                <div className="pt-4 border-t border-border mt-2 space-y-2">
                {authState === 'guest' ? (
                    <>
                      <Button asChild variant="outline" className="w-full font-medium">
                        <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                      </Button>
                      <Button asChild variant="default" className="w-full btn-primary font-semibold">
                        <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                      </Button>
                    </>
                ) : authState === 'admin' ? (
                    <>
                      <Button asChild variant="default" className="w-full btn-primary font-semibold">
                        <Link to="/admin" onClick={() => setIsOpen(false)}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full font-medium" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="w-full font-medium">
                        <Link to="/submit-news" onClick={() => setIsOpen(false)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Submit News
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full font-medium">
                        <Link to="/account" onClick={() => setIsOpen(false)}>
                          <User className="mr-2 h-4 w-4" />
                          My Account
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full font-medium" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
