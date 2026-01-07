import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sun,
  AlertCircle,
  ClipboardList,
  Zap,
  Phone,
  Bell,
  Globe,
  HelpCircle,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItem {
  icon: ReactNode;
  label: string;
  href: string;
  emoji?: string;
}

const endUserNavItems: NavItem[] = [
  { icon: <AlertCircle className="w-6 h-6" />, label: 'Report Issue', href: '/report-issue', emoji: '🆘' },
  { icon: <ClipboardList className="w-6 h-6" />, label: 'My Service Status', href: '/service-status', emoji: '📍' },
  { icon: <Zap className="w-6 h-6" />, label: 'My Solar System', href: '/my-system', emoji: '☀️' },
  { icon: <Phone className="w-6 h-6" />, label: 'Call for Help', href: '/call-help', emoji: '📞' },
  { icon: <Bell className="w-6 h-6" />, label: 'Notifications', href: '/notifications', emoji: '🔔' },
  { icon: <Globe className="w-6 h-6" />, label: 'Language', href: '/language', emoji: '🌐' },
  { icon: <HelpCircle className="w-6 h-6" />, label: 'Help & Info', href: '/help', emoji: 'ℹ️' },
];

interface EndUserLayoutProps {
  children: ReactNode;
}

export default function EndUserLayout({ children }: EndUserLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Sun className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">SELCO Solar</h1>
            <p className="text-xs text-white/70">Service Portal</p>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-white/30">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback className="bg-white/20 text-white text-lg">
              {profile?.full_name?.charAt(0) || <User className="w-6 h-6" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white truncate">{profile?.full_name || 'User'}</p>
            <p className="text-xs text-white/70 truncate">{profile?.phone || 'No phone'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-2 px-3">
          {endUserNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-4 px-4 py-4 rounded-xl transition-all',
                  'text-lg font-medium',
                  'hover:bg-sidebar-accent',
                  isActive
                    ? 'bg-white text-primary shadow-lg'
                    : 'text-white/90'
                )}
              >
                <span className="text-2xl">{item.emoji}</span>
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
          className="w-full justify-start gap-3 text-white/80 hover:text-white hover:bg-sidebar-accent py-4 text-lg"
        >
          <LogOut className="w-6 h-6" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col bg-solar-gradient">
        <NavContent />
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-solar-gradient px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sun className="w-8 h-8 text-white" />
          <span className="font-bold text-lg text-white">SELCO Solar</span>
        </Link>
        
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80 bg-solar-gradient border-0">
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
