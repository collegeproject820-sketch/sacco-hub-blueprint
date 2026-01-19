import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Annual Cooperative Summit 2026",
    description: "Kenya's biggest cooperative event bringing together SACCO leaders, regulators, and industry stakeholders.",
    date: "March 15-17, 2026",
    time: "8:00 AM - 5:00 PM",
    location: "KICC, Nairobi",
    type: "Conference",
    attendees: "2000+",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "SACCO Digital Transformation Workshop",
    description: "Hands-on training on implementing digital banking solutions for cooperative organizations.",
    date: "February 20, 2026",
    time: "9:00 AM - 4:00 PM",
    location: "Hilton Hotel, Nairobi",
    type: "Workshop",
    attendees: "150",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Financial Literacy Campaign Launch",
    description: "National launch of the 2026 cooperative financial literacy initiative.",
    date: "February 5, 2026",
    time: "10:00 AM",
    location: "Virtual & In-Person",
    type: "Launch Event",
    attendees: "500+",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "SASRA Compliance Training",
    description: "Essential compliance training for SACCO managers and board members.",
    date: "February 25, 2026",
    time: "8:30 AM - 3:00 PM",
    location: "Sarova Stanley, Nairobi",
    type: "Training",
    attendees: "100",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",
    featured: false,
  },
];

const pastEvents = [
  {
    id: 5,
    title: "Year-End SACCO Forum 2025",
    date: "December 10, 2025",
    location: "Kenyatta University, Nairobi",
    type: "Forum",
  },
  {
    id: 6,
    title: "Women in Cooperatives Conference",
    date: "November 20, 2025",
    location: "Safari Park Hotel, Nairobi",
    type: "Conference",
  },
  {
    id: 7,
    title: "Youth SACCO Innovation Challenge",
    date: "October 15, 2025",
    location: "iHub, Nairobi",
    type: "Competition",
  },
];

const Events = () => {
  const featuredEvent = upcomingEvents.find((e) => e.featured);
  const regularEvents = upcomingEvents.filter((e) => !e.featured);

  return (
    <Layout>
      {/* Header */}
      <section className="hero-gradient py-16 md:py-20">
        <div className="container-news">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Events & Announcements
            </h1>
            <p className="text-lg text-white/80">
              Industry conferences, workshops, trainings, and key announcements
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="section-padding bg-background">
          <div className="container-news">
            <div className="mb-8">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Featured Event</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 glass-card overflow-hidden">
              <div className="aspect-[16/10] lg:aspect-auto">
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full w-fit mb-4">
                  {featuredEvent.type}
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  {featuredEvent.title}
                </h2>
                <p className="text-muted-foreground mb-6">{featuredEvent.description}</p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{featuredEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    <span>{featuredEvent.attendees} Expected Attendees</span>
                  </div>
                </div>
                <Button size="lg" className="btn-primary w-fit">
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="section-padding bg-secondary/50">
        <div className="container-news">
          <div className="mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Upcoming</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
              More Events
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularEvents.map((event) => (
              <div key={event.id} className="news-card overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                    {event.type}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="section-padding bg-background">
        <div className="container-news">
          <div className="mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Archive</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
              Past Events
            </h2>
          </div>

          <div className="space-y-4">
            {pastEvents.map((event) => (
              <div key={event.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{event.type}</span>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
