import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, Wrench, AlertTriangle, CreditCard, Megaphone, 
  Settings, Check, Trash2, ChevronRight
} from 'lucide-react';

// Mock notifications
const mockNotifications = [
  {
    id: '1',
    type: 'service_update' as const,
    title: 'Technician Assigned',
    message: 'Lakshmi Devi has been assigned to your service request TKT-240115-0042',
    is_read: false,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    action_url: '/service-status',
  },
  {
    id: '2',
    type: 'system_alert' as const,
    title: 'Maintenance Due Soon',
    message: 'Your solar system is due for maintenance in 15 days. Schedule now for optimal performance.',
    is_read: false,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    action_url: '/my-system',
  },
  {
    id: '3',
    type: 'service_update' as const,
    title: 'Service Completed',
    message: 'Your service request TKT-240110-0038 has been completed. Please rate your experience.',
    is_read: true,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    action_url: '/service-status',
  },
  {
    id: '4',
    type: 'promotional' as const,
    title: 'New Battery Offer!',
    message: 'Upgrade to a new high-capacity battery with 20% discount. Limited time offer!',
    is_read: true,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    action_url: null,
  },
];

// Notification preferences
const defaultPreferences = {
  service_updates: true,
  system_alerts: true,
  payment_reminders: true,
  promotional: false,
  push_enabled: true,
  sms_enabled: true,
};

const notificationIcons: Record<string, React.ReactNode> = {
  service_update: <Wrench className="w-5 h-5" />,
  system_alert: <AlertTriangle className="w-5 h-5" />,
  payment_reminder: <CreditCard className="w-5 h-5" />,
  promotional: <Megaphone className="w-5 h-5" />,
};

const notificationColors: Record<string, string> = {
  service_update: 'bg-primary/10 text-primary',
  system_alert: 'bg-warning/10 text-warning',
  payment_reminder: 'bg-info/10 text-info',
  promotional: 'bg-success/10 text-success',
};

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);
  const [preferences, setPreferences] = useState(defaultPreferences);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, is_read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.is_read);

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🔔 Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">Stay updated on your services</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            <Check className="w-4 h-4 mr-1" />
            Mark all read
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${!notification.is_read ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="pt-4">
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-full ${notificationColors[notification.type]}`}>
                      {notificationIcons[notification.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium">{notification.title}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTime(notification.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      {notification.action_url && (
                        <Button variant="link" className="p-0 h-auto mt-2 text-primary" asChild>
                          <a href={notification.action_url}>
                            View Details <ChevronRight className="w-4 h-4 ml-1" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="shrink-0 opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-8 pb-8 text-center">
                <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-3 mt-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className="cursor-pointer transition-all hover:shadow-md border-primary bg-primary/5"
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="pt-4">
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-full ${notificationColors[notification.type]}`}>
                      {notificationIcons[notification.type]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="font-medium">{notification.title}</p>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(notification.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-8 pb-8 text-center">
                <Check className="w-12 h-12 text-success/30 mx-auto mb-4" />
                <p className="text-muted-foreground">All caught up!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Service Updates</p>
                  <p className="text-sm text-muted-foreground">Technician assignments, status changes</p>
                </div>
                <Switch 
                  checked={preferences.service_updates}
                  onCheckedChange={() => togglePreference('service_updates')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Alerts</p>
                  <p className="text-sm text-muted-foreground">Maintenance reminders, health warnings</p>
                </div>
                <Switch 
                  checked={preferences.system_alerts}
                  onCheckedChange={() => togglePreference('system_alerts')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Reminders</p>
                  <p className="text-sm text-muted-foreground">Due dates and payment confirmations</p>
                </div>
                <Switch 
                  checked={preferences.payment_reminders}
                  onCheckedChange={() => togglePreference('payment_reminders')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Promotional</p>
                  <p className="text-sm text-muted-foreground">Offers, new services, updates</p>
                </div>
                <Switch 
                  checked={preferences.promotional}
                  onCheckedChange={() => togglePreference('promotional')}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivery Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">In-app and mobile notifications</p>
                </div>
                <Switch 
                  checked={preferences.push_enabled}
                  onCheckedChange={() => togglePreference('push_enabled')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Important updates via text message</p>
                </div>
                <Switch 
                  checked={preferences.sms_enabled}
                  onCheckedChange={() => togglePreference('sms_enabled')}
                />
              </div>
            </CardContent>
          </Card>

          <Button className="w-full h-12">
            Save Preferences
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
