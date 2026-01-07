import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sun,
  Ticket,
  Map,
  Users,
  GitBranch,
  Clock,
  Database,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  User,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface NavItem {
  icon: ReactNode;
  label: string;
  href: string;
  children?: NavItem[];
}

const adminNavItems: NavItem[] = [
  { icon: <Ticket className="w-5 h-5" />, label: 'Ticket Management', href: '/admin/tickets' },
  { icon: <Map className="w-5 h-5" />, label: 'Live Map View', href: '/admin/map' },
  { icon: <Users className="w-5 h-5" />, label: 'Technician Management', href: '/admin/technicians' },
  { icon: <GitBranch className="w-5 h-5" />, label: 'Job Assignment', href: '/admin/assignments' },
  { icon: <Clock className="w-5 h-5" />, label: 'SLA & Performance', href: '/admin/sla' },
  { icon: <Database className="w-5 h-5" />, label: 'Solar Systems', href: '/admin/systems' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Reports & Analytics', href: '/admin/reports' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '/admin/settings' },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-card">
      {/* Logo */}
      <div className="p-4 border-b">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-solar-gradient rounded-lg flex items-center justify-center">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">SELCO Admin</h1>
            <p className="text-xs text-muted-foreground">Service Coordinator</p>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {profile?.full_name?.charAt(0) || <User className="w-5 h-5" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate text-sm">{profile?.full_name || 'Admin'}</p>
            <p className="text-xs text-muted-foreground truncate">{profile?.email || 'admin@selco.in'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {adminNavItems.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                  'text-sm font-medium',
                  'hover:bg-accent',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Sign out */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col border-r bg-card">
        <NavContent />
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b px-4 py-3 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-solar-gradient rounded-lg flex items-center justify-center">
            <Sun className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-foreground">SELCO Admin</span>
        </Link>
        
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <NavContent />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="min-h-screen pt-14 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
