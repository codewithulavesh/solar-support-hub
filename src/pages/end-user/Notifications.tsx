import { Card, CardContent } from '@/components/ui/card';

export default function Notifications() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🔔 Notifications</h1>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center py-8">No notifications yet</p>
        </CardContent>
      </Card>
    </div>
  );
}
