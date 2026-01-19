import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubmitNews = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    category: "",
    title: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Submission Received!",
      description: "Our editorial team will review your submission and get back to you within 48 hours.",
    });
    
    setFormData({
      name: "",
      organization: "",
      email: "",
      phone: "",
      category: "",
      title: "",
      content: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      {/* Header */}
      <section className="hero-gradient py-16 md:py-20">
        <div className="container-news">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Submit News & Press Releases
            </h1>
            <p className="text-lg text-white/80">
              Share your news, announcements, and stories with Kenya's cooperative community
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-news">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-foreground">Submission Form</h2>
                    <p className="text-sm text-muted-foreground">Fill in the details below</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization *</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleChange("organization", e.target.value)}
                        placeholder="Your SACCO / Company"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+254 700 000 000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sacco">SACCO News</SelectItem>
                        <SelectItem value="business">Business & Finance</SelectItem>
                        <SelectItem value="cooperatives">Cooperatives</SelectItem>
                        <SelectItem value="policy">Policy & Regulations</SelectItem>
                        <SelectItem value="events">Events & Announcements</SelectItem>
                        <SelectItem value="press">Press Release</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">News Title / Headline *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Enter a compelling headline"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">News Content / Details *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleChange("content", e.target.value)}
                      placeholder="Provide the full story, including key facts, quotes, and relevant details..."
                      className="min-h-[200px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="btn-primary w-full font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit for Review"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Guidelines */}
              <div className="glass-card p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4">Submission Guidelines</h3>
                <ul className="space-y-3">
                  {[
                    "Content must be original and factual",
                    "Include relevant sources and quotes",
                    "Submissions are reviewed within 48 hours",
                    "We reserve the right to edit for clarity",
                    "Approved content may be promoted on social media",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What We Accept */}
              <div className="glass-card p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4">What We Accept</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• SACCO performance reports & updates</li>
                  <li>• Industry research & analysis</li>
                  <li>• Event announcements</li>
                  <li>• Leadership changes & appointments</li>
                  <li>• New product/service launches</li>
                  <li>• Success stories & case studies</li>
                  <li>• Opinion pieces & expert commentary</li>
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Need Help?</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Contact our editorial team for assistance with your submission.
                    </p>
                    <a href="mailto:saccohubnews@gmail.com" className="text-sm text-primary font-medium hover:underline">
                      saccohubnews@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SubmitNews;
