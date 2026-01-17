import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Briefcase, Star, Wallet } from 'lucide-react';

const notifications = [
  { id: '1', type: 'job', title: 'New Job Available', message: 'Emergency job near you - 1.5km away', time: '5m ago', unread: true },
  { id: '2', type: 'payment', title: 'Payment Credited', message: '₹3,200 credited to your account', time: '2h ago', unread: true },
  { id: '3', type: 'rating', title: 'New Rating Received', message: 'Ramesh Kumar rated you 5 stars!', time: '1d ago', unread: false },
];

const icons: Record<string, React.ReactNode> = {
  job: <Briefcase className="w-5 h-5" />,
  payment: <Wallet className="w-5 h-5" />,
  rating: <Star className="w-5 h-5" />,
};

export default function TechNotifications() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🔔 Notifications</h1>
      {notifications.map((n) => (
        <Card key={n.id} className={n.unread ? 'border-primary bg-primary/5' : ''}>
          <CardContent className="pt-4 flex gap-3">
            <div className="p-2 bg-muted rounded-full h-fit">{icons[n.type]}</div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">{n.title}</p>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{n.message}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
