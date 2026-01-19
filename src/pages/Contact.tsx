import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24-48 hours.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
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
              Contact Us
            </h1>
            <p className="text-lg text-white/80">
              Get in touch with our team. We're here to help with inquiries, partnerships, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-news">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Get In Touch</h2>
                <p className="text-muted-foreground">
                  Have questions or want to collaborate? Reach out through any of the channels below.
                </p>
              </div>

              {/* Office Location */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Office Location</h3>
                  <address className="text-muted-foreground not-italic text-sm leading-relaxed">
                    LAPTRUST ANNEX<br />
                    Off Harambee Avenue<br />
                    P.O. Box 57052-00200<br />
                    Nairobi CBD, Kenya
                  </address>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Phone Numbers</h3>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <p>Office: <a href="tel:+254203936358" className="hover:text-primary">020-39363588</a></p>
                    <p>Mobile: <a href="tel:+254742622890" className="hover:text-primary">0742-622890</a></p>
                    <p>Mobile: <a href="tel:+254710594079" className="hover:text-primary">0710-594079</a></p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Email Addresses</h3>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <p><a href="mailto:saccohubnews@gmail.com" className="hover:text-primary">saccohubnews@gmail.com</a></p>
                    <p><a href="mailto:info@saccohubnews.com" className="hover:text-primary">info@saccohubnews.com</a></p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8 md:p-10">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you shortly.</p>

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
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
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
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="btn-primary font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-muted">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8181724553884!2d36.82028847496573!3d-1.2841636987071827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22ba71b2d%3A0xd8e5f1d3aa6c4e9c!2sHarambee%20Ave%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1705580000000!5m2!1sen!2ske"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Sacco Hub News Office Location"
        />
      </section>
    </Layout>
  );
};

export default Contact;
