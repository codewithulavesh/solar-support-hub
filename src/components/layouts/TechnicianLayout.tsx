import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Sun,
  Briefcase,
  Wrench,
  Camera,
  CheckCircle,
  Wallet,
  Star,
  GraduationCap,
  Bell,
  Settings,
  BookOpen,
  LogOut,
  Menu,
  User,
  Circle,
} from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItem {
  icon: ReactNode;
  label: string;
  href: string;
  emoji?: string;
}

const technicianNavItems: NavItem[] = [
  { icon: <Briefcase className="w-6 h-6" />, label: 'Available Jobs', href: '/technician/jobs', emoji: '🧰' },
  { icon: <Wrench className="w-6 h-6" />, label: 'My Active Job', href: '/technician/active-job', emoji: '🔧' },
  { icon: <Camera className="w-6 h-6" />, label: 'Complete Job', href: '/technician/complete-job', emoji: '📸' },
  { icon: <CheckCircle className="w-6 h-6" />, label: 'Completed Jobs', href: '/technician/completed', emoji: '✅' },
  { icon: <Wallet className="w-6 h-6" />, label: 'Earnings', href: '/technician/earnings', emoji: '💰' },
  { icon: <Star className="w-6 h-6" />, label: 'My Rating', href: '/technician/rating', emoji: '⭐' },
  { icon: <GraduationCap className="w-6 h-6" />, label: 'Skills & Training', href: '/technician/training', emoji: '🧑‍🎓' },
  { icon: <Bell className="w-6 h-6" />, label: 'Notifications', href: '/technician/notifications', emoji: '🔔' },
  { icon: <Settings className="w-6 h-6" />, label: 'Profile & Availability', href: '/technician/profile', emoji: '⚙️' },
  { icon: <BookOpen className="w-6 h-6" />, label: 'Knowledge Base', href: '/technician/knowledge', emoji: '📚' },
];

interface TechnicianLayoutProps {
  children: ReactNode;
}

export default function TechnicianLayout({ children }: TechnicianLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, technician, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getStatusColor = () => {
    switch (technician?.status) {
      case 'online': return 'bg-success';
      case 'busy': return 'bg-warning';
      case 'on_leave': return 'bg-info';
      default: return 'bg-muted-foreground';
    }
  };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/technician" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Sun className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">SELCO Tech</h1>
            <p className="text-xs text-white/70">Field Service App</p>
          </div>
        </Link>
      </div>

      {/* User info with status */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-12 h-12 border-2 border-white/30">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-white/20 text-white text-lg">
                {profile?.full_name?.charAt(0) || <User className="w-6 h-6" />}
              </AvatarFallback>
            </Avatar>
            <Circle className={cn('absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-sidebar', getStatusColor())} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white truncate">{profile?.full_name || 'Technician'}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs capitalize">
                {technician?.status || 'offline'}
              </Badge>
              {technician?.is_women_led && (
                <Badge className="bg-pink-500/20 text-pink-200 text-xs">
                  Women-led
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Quick stats */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-xs text-white/70">Rating</p>
            <p className="font-bold text-white flex items-center justify-center gap-1">
              <Star className="w-3 h-3 fill-accent text-accent" />
              {technician?.average_rating?.toFixed(1) || '0.0'}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-xs text-white/70">Jobs</p>
            <p className="font-bold text-white">{technician?.total_jobs_completed || 0}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {technicianNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                  'text-base font-medium',
                  'hover:bg-sidebar-accent',
                  isActive
                    ? 'bg-white text-primary shadow-lg'
                    : 'text-white/90'
                )}
              >
                <span className="text-xl">{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Sign out */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start gap-3 text-white/80 hover:text-white hover:bg-sidebar-accent py-4"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col bg-eco-gradient">
        <NavContent />
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-eco-gradient px-4 py-3 flex items-center justify-between">
        <Link to="/technician" className="flex items-center gap-2">
          <Sun className="w-8 h-8 text-white" />
          <span className="font-bold text-lg text-white">SELCO Tech</span>
        </Link>
        
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80 bg-eco-gradient border-0">
            <NavContent />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="min-h-screen pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
