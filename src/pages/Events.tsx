import { useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useRealtimeEvents } from "@/hooks/useRealtimeEvents";
import { format, isPast, isFuture } from "date-fns";

const Events = () => {
  const { events, isLoading } = useRealtimeEvents();

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    const upcoming = events.filter((e) => isFuture(new Date(e.event_date)) || new Date(e.event_date).toDateString() === now.toDateString());
    const past = events.filter((e) => isPast(new Date(e.event_date)) && new Date(e.event_date).toDateString() !== now.toDateString());
    return { upcomingEvents: upcoming, pastEvents: past.slice(0, 5) };
  }, [events]);

  const featuredEvent = upcomingEvents[0];
  const regularEvents = upcomingEvents.slice(1);

  const formatEventDate = (dateStr: string, endDateStr?: string | null) => {
    const start = new Date(dateStr);
    if (endDateStr) {
      const end = new Date(endDateStr);
      if (start.toDateString() === end.toDateString()) {
        return format(start, "MMMM d, yyyy");
      }
      return `${format(start, "MMMM d")} - ${format(end, "d, yyyy")}`;
    }
    return format(start, "MMMM d, yyyy");
  };

  const formatEventTime = (dateStr: string) => {
    return format(new Date(dateStr), "h:mm a");
  };

  if (isLoading) {
    return (
      <Layout>
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
        <section className="section-padding bg-background">
          <div className="container-news">
            <Skeleton className="h-[400px] rounded-xl" />
          </div>
        </section>
      </Layout>
    );
  }

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
      {featuredEvent ? (
        <section className="section-padding bg-background">
          <div className="container-news">
            <div className="mb-8">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Featured Event</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 glass-card overflow-hidden">
              <div className="aspect-[16/10] lg:aspect-auto">
                <img
                  src={featuredEvent.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full w-fit mb-4">
                  Event
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  {featuredEvent.title}
                </h2>
                <p className="text-muted-foreground mb-6">{featuredEvent.description}</p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>{formatEventDate(featuredEvent.event_date, featuredEvent.end_date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>{formatEventTime(featuredEvent.event_date)}</span>
                  </div>
                  {featuredEvent.location && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>{featuredEvent.location}</span>
                    </div>
                  )}
                </div>
                <Button size="lg" className="btn-primary w-fit">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="section-padding bg-background">
          <div className="container-news">
            <div className="text-center py-16 glass-card rounded-xl">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No upcoming events at the moment.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for exciting industry events!</p>
            </div>
          </div>
        </section>
      )}

      {/* More Upcoming Events */}
      {regularEvents.length > 0 && (
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
                      src={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                      Event
                    </span>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatEventDate(event.event_date, event.end_date)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
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
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
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
                      <p className="text-sm text-muted-foreground">
                        {formatEventDate(event.event_date, event.end_date)}
                        {event.location && ` • ${event.location}`}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Events;
