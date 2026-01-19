import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-primary">
      <div className="container-news">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex p-3 rounded-full bg-white/10 mb-6">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Stay Ahead with Sacco Hub News
          </h2>
          <p className="text-white/80 mb-8">
            Get the latest SACCO and financial news delivered straight to your inbox. 
            Join thousands of industry professionals.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-white bg-white/10 rounded-lg p-4">
              <CheckCircle className="h-5 w-5" />
              <span>Thank you for subscribing! You'll receive our next newsletter.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
                required
              />
              <Button type="submit" className="bg-white text-primary hover:bg-white/90 font-semibold px-6">
                Subscribe
              </Button>
            </form>
          )}
          
          <p className="text-sm text-white/60 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
