import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Image,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Home,
  Bell,
  Send,
  ChevronDown,
  Check,
  FolderTree,
  History,
} from 'lucide-react';
import logo from '@/assets/logo.png';
import { formatDistanceToNow } from 'date-fns';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarSections = [
  {
    title: 'Overview',
    items: [{ name: 'Dashboard', path: '/admin', icon: LayoutDashboard }],
  },
  {
    title: 'Content',
    items: [
      { name: 'News Posts', path: '/admin/news', icon: Newspaper },
      { name: 'Submissions', path: '/admin/submissions', icon: Send },
      { name: 'Events', path: '/admin/events', icon: Calendar },
      { name: 'Adverts', path: '/admin/adverts', icon: Image },
      { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    ],
  },
  {
    title: 'Management',
    items: [
      { name: 'Users', path: '/admin/users', icon: Users },
      { name: 'Settings', path: '/admin/settings', icon: Settings },
      { name: 'Activity Logs', path: '/admin/logs', icon: History },
    ],
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { notifications, unreadCount, markAsRead, clearAll } = useRealtimeNotifications();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const getCurrentPageTitle = () => {
    for (const section of sidebarSections) {
      const item = section.items.find(
        (item) => item.path === location.pathname || (item.path !== '/admin' && location.pathname.startsWith(item.path))
      );
      if (item) return item.name;
    }
    return 'Dashboard';
  };

  const isActive = (path: string) => {
    return path === location.pathname || (path !== '/admin' && location.pathname.startsWith(path));
  };

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || 'AD';

  return (
    <div className="min-h-screen bg-[hsl(210_20%_96%)] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed from md+ */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:inset-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        shadow-lg md:shadow-none
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
            <Link to="/admin" className="flex items-center gap-2.5">
              <img src={logo} alt="Sacco Hub News" className="h-9 w-auto" />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight">
                  <span className="text-primary">SACCO</span>
                  <span className="text-accent">HUB</span>
                </span>
                <span className="text-[10px] font-medium text-muted-foreground tracking-wide uppercase mt-0.5">
                  Admin Panel
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-md hover:bg-muted text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <nav className="px-3 space-y-6">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <h3 className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                    {section.title}
                  </h3>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                            transition-all duration-200
                            ${
                              active
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }
                          `}
                        >
                          <item.icon className={`h-4 w-4 ${active ? '' : 'opacity-70'}`} />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/30">
            <Link
              to="/"
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              <Home className="h-4 w-4" />
              Back to Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 md:px-6 h-16 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground hidden sm:inline">Admin</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 hidden sm:inline" />
              <h1 className="font-semibold text-foreground">{getCurrentPageTitle()}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs" onClick={clearAll}>
                      <Check className="h-3 w-3 mr-1" />
                      Mark all read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground text-sm">No notifications</div>
                ) : (
                  <ScrollArea className="max-h-72">
                    {notifications.slice(0, 10).map((n) => (
                      <DropdownMenuItem
                        key={n.id}
                        className={`flex flex-col items-start gap-1 py-2 cursor-pointer ${n.read ? 'opacity-60' : ''}`}
                        onClick={() => {
                          markAsRead(n.id);
                          if (n.link) navigate(n.link);
                        }}
                      >
                        <span className="text-xs font-semibold text-primary">{n.title}</span>
                        <span className="text-sm line-clamp-1">{n.message}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(n.createdAt, { addSuffix: true })}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </ScrollArea>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-muted">
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:flex flex-col items-start text-left">
                    <span className="text-sm font-medium text-foreground truncate max-w-[140px]">{user?.email}</span>
                    <span className="text-xs text-muted-foreground">Administrator</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">Administrator</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    View Website
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
