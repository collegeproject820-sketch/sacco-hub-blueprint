import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeAnalytics } from '@/hooks/useRealtimeAnalytics';
import { 
  Users, 
  Newspaper, 
  Calendar, 
  Image, 
  FileText, 
  TrendingUp, 
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  PenLine,
  Send,
  Star,
  Eye,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import type { Tables } from '@/integrations/supabase/types';

type NewsPost = Tables<'news_posts'>;
type NewsSubmission = Tables<'news_submissions'>;

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  pendingSubmissions: number;
  activeAdverts: number;
  totalEvents: number;
  publishedPosts: number;
  draftPosts: number;
  featuredPosts: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const { visitors24h, pageViews24h, isLoading: analyticsLoading } = useRealtimeAnalytics();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPosts: 0,
    pendingSubmissions: 0,
    activeAdverts: 0,
    totalEvents: 0,
    publishedPosts: 0,
    draftPosts: 0,
    featuredPosts: 0,
  });
  const [recentPosts, setRecentPosts] = useState<NewsPost[]>([]);
  const [pendingSubmissions, setPendingSubmissions] = useState<NewsSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          { count: usersCount },
          { count: postsCount },
          { count: publishedCount },
          { count: draftCount },
          { count: featuredCount },
          { count: submissionsCount },
          { count: advertsCount },
          { count: eventsCount },
          { data: recentPostsData },
          { data: submissionsData },
        ] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('news_posts').select('*', { count: 'exact', head: true }),
          supabase.from('news_posts').select('*', { count: 'exact', head: true }).eq('is_published', true),
          supabase.from('news_posts').select('*', { count: 'exact', head: true }).eq('is_published', false),
          supabase.from('news_posts').select('*', { count: 'exact', head: true }).eq('is_featured', true),
          supabase.from('news_submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('adverts').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('events').select('*', { count: 'exact', head: true }).eq('is_published', true),
          supabase.from('news_posts').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('news_submissions').select('*').eq('status', 'pending').order('created_at', { ascending: false }).limit(5),
        ]);

        setStats({
          totalUsers: usersCount || 0,
          totalPosts: postsCount || 0,
          publishedPosts: publishedCount || 0,
          draftPosts: draftCount || 0,
          featuredPosts: featuredCount || 0,
          pendingSubmissions: submissionsCount || 0,
          activeAdverts: advertsCount || 0,
          totalEvents: eventsCount || 0,
        });

        setRecentPosts(recentPostsData || []);
        setPendingSubmissions(submissionsData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Visitors (24h)',
      value: visitors24h,
      icon: Users,
      color: 'text-sky-600',
      bgColor: 'bg-sky-500/10',
      realtime: true,
    },
    {
      title: 'Page Views (24h)',
      value: pageViews24h,
      icon: Activity,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500/10',
      realtime: true,
    },
    {
      title: 'Total Articles',
      value: stats.totalPosts,
      icon: Newspaper,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Published',
      value: stats.publishedPosts,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Pending Review',
      value: stats.pendingSubmissions,
      icon: Send,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
      urgent: stats.pendingSubmissions > 0,
    },
    {
      title: 'Live Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  const quickActions = [
    { label: 'New Article', path: '/admin/news', icon: PenLine },
    { label: 'Review Submissions', path: '/admin/submissions', icon: FileText },
    { label: 'Manage Events', path: '/admin/events', icon: Calendar },
    { label: 'View Users', path: '/admin/users', icon: Users },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome to the Newsroom
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your editorial content, review submissions, and monitor platform activity.
              </p>
            </div>
            <div className="flex gap-2">
              {quickActions.slice(0, 2).map((action) => (
                <Button key={action.path} asChild variant="outline" size="sm">
                  <Link to={action.path}>
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statCards.map((card) => (
          <Card key={card.title} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
                {card.urgent && (
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
                    Action Needed
                  </Badge>
                )}
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-foreground">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{card.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Articles */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Recent Articles</CardTitle>
                <CardDescription>Latest content from the newsroom</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-primary">
                <Link to="/admin/news">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {recentPosts.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Newspaper className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No articles yet. Create your first article.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recentPosts.map((post) => (
                  <div key={post.id} className="px-6 py-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(post.created_at), 'MMM d, yyyy')}
                          </span>
                          {post.is_featured && (
                            <span className="text-xs text-gold flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge 
                        variant={post.is_published ? "default" : "secondary"}
                        className={post.is_published ? "bg-success/10 text-success" : ""}
                      >
                        {post.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Submissions */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  Pending Submissions
                  {stats.pendingSubmissions > 0 && (
                    <Badge variant="destructive" className="text-[10px]">
                      {stats.pendingSubmissions}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>Reader submissions awaiting review</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-primary">
                <Link to="/admin/submissions">
                  Review All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {pendingSubmissions.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <CheckCircle2 className="h-10 w-10 mx-auto mb-2 text-success opacity-70" />
                <p>All caught up! No pending submissions.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {pendingSubmissions.map((submission) => (
                  <div key={submission.id} className="px-6 py-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {submission.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">
                            by {submission.author_name}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(submission.created_at), 'MMM d')}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-gold/10 text-gold">
                        Pending
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.path}
                asChild
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-muted hover:border-primary/30"
              >
                <Link to={action.path}>
                  <action.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
