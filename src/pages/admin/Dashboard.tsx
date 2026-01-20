import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Newspaper, Calendar, Image, FileText, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  pendingSubmissions: number;
  activeAdverts: number;
  totalEvents: number;
  publishedPosts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPosts: 0,
    pendingSubmissions: 0,
    activeAdverts: 0,
    totalEvents: 0,
    publishedPosts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: usersCount },
          { count: postsCount },
          { count: publishedCount },
          { count: submissionsCount },
          { count: advertsCount },
          { count: eventsCount },
        ] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('news_posts').select('*', { count: 'exact', head: true }),
          supabase.from('news_posts').select('*', { count: 'exact', head: true }).eq('is_published', true),
          supabase.from('news_submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('adverts').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('events').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          totalUsers: usersCount || 0,
          totalPosts: postsCount || 0,
          publishedPosts: publishedCount || 0,
          pendingSubmissions: submissionsCount || 0,
          activeAdverts: advertsCount || 0,
          totalEvents: eventsCount || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'News Posts',
      value: stats.totalPosts,
      icon: Newspaper,
      color: 'text-sky-600',
      bgColor: 'bg-sky-500/10',
    },
    {
      title: 'Published',
      value: stats.publishedPosts,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Pending Submissions',
      value: stats.pendingSubmissions,
      icon: FileText,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Active Adverts',
      value: stats.activeAdverts,
      icon: Image,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to Sacco Hub News Admin Panel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <Card key={card.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? '...' : card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/admin/news"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Newspaper className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Create News Post</p>
                <p className="text-sm text-muted-foreground">Add new article to the website</p>
              </div>
            </a>
            <a
              href="/admin/submissions"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="p-2 rounded-lg bg-amber-500/10">
                <FileText className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">Review Submissions</p>
                <p className="text-sm text-muted-foreground">
                  {stats.pendingSubmissions} pending review
                </p>
              </div>
            </a>
            <a
              href="/admin/events"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Manage Events</p>
                <p className="text-sm text-muted-foreground">Add or edit events</p>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Connection</span>
              <span className="flex items-center gap-2 text-sm text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Authentication</span>
              <span className="flex items-center gap-2 text-sm text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Storage</span>
              <span className="flex items-center gap-2 text-sm text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Available
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
