import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Latest News", path: "/news" },
  { name: "Events", path: "/events" },
  { name: "Advertise", path: "/advertise" },
  { name: "Submit News", path: "/submit-news" },
  { name: "Contact Us", path: "/contact" },
];

const categories = [
  { name: "SACCO News", path: "/news?category=sacco" },
  { name: "Business & Finance", path: "/news?category=business" },
  { name: "Cooperatives", path: "/news?category=cooperatives" },
  { name: "Policy & Regulations", path: "/news?category=policy" },
  { name: "Events & Announcements", path: "/news?category=events" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      {/* Main Footer */}
      <div className="container-news section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Sacco Hub News" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-navy-foreground/80 text-sm leading-relaxed">
              Your trusted source for SACCO, business, finance, and cooperative news in Kenya. 
              Delivering credible, timely, and impactful industry insights.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-navy-foreground/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.path}>
                  <Link
                    to={cat.path}
                    className="text-sm text-navy-foreground/80 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-sm text-navy-foreground/80">
                  LAPTRUST ANNEX<br />
                  Off Harambee Avenue<br />
                  P.O. Box 57052-00200<br />
                  Nairobi CBD
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-sm text-navy-foreground/80">
                  <p>020-39363588</p>
                  <p>0742-622890 / 0710-594079</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-sm text-navy-foreground/80">
                  <p>saccohubnews@gmail.com</p>
                  <p>info@saccohubnews.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-news py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-navy-foreground/60">
              © {new Date().getFullYear()} Sacco Hub News. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-navy-foreground/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-navy-foreground/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
