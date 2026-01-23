import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Calendar, FileText, LayoutDashboard, Shield, Clock } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

type Profile = Tables<'profiles'>;
type NewsSubmission = Tables<'news_submissions'>;

const Account = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [submissions, setSubmissions] = useState<NewsSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      if (!user) return;

      const [profileResult, submissionsResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('news_submissions')
          .select('*')
          .eq('submitted_by', user.id)
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      if (profileResult.data) setProfile(profileResult.data);
      if (submissionsResult.data) setSubmissions(submissionsResult.data);
      setIsLoading(false);
    };

    if (user) fetchData();
  }, [user, authLoading, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-500/10 text-emerald-600';
      case 'rejected': return 'bg-destructive/10 text-destructive';
      default: return 'bg-amber-500/10 text-amber-600';
    }
  };

  if (authLoading || isLoading) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-news max-w-4xl">
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="grid gap-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Account - Sacco Hub News</title>
        <meta name="description" content="Manage your Sacco Hub News account, view your submissions, and access your profile." />
      </Helmet>
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-news max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">My Account</h1>
              <p className="text-muted-foreground mt-2">Manage your profile and submissions</p>
            </div>

            <div className="grid gap-6">
              {/* Admin Access Card - Only shown to admins */}
              {isAdmin && (
                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Administrator Access</CardTitle>
                        <CardDescription>You have full admin privileges</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      As an administrator, you can manage news posts, users, events, adverts, and site settings.
                    </p>
                    <Button asChild className="btn-primary">
                      <Link to="/admin">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Go to Admin Dashboard
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  {profile && (
                    <>
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profile.full_name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Member since {format(new Date(profile.created_at), 'MMMM d, yyyy')}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant={isAdmin ? "default" : "secondary"}>
                      {isAdmin ? "Administrator" : "Member"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Submissions Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      My Submissions
                    </CardTitle>
                    <CardDescription>Your recent news submissions</CardDescription>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/submit-news">Submit News</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {submissions.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">You haven't submitted any news yet</p>
                      <Button asChild>
                        <Link to="/submit-news">Submit Your First Story</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissions.map((submission) => (
                        <div key={submission.id} className="flex items-start justify-between p-4 rounded-lg border border-border/50">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-1">{submission.title}</h4>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {format(new Date(submission.created_at), 'MMM d, yyyy')}
                              </span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(submission.status || 'pending')}>
                            {submission.status || 'pending'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Account;
