import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, AlertCircle } from 'lucide-react';

export default function MapView() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Live Map View</h1>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-4 flex items-center gap-3"><MapPin className="text-primary" /><div><p className="text-2xl font-bold">23</p><p className="text-sm text-muted-foreground">Active Tickets</p></div></CardContent></Card>
        <Card><CardContent className="pt-4 flex items-center gap-3"><Users className="text-success" /><div><p className="text-2xl font-bold">8</p><p className="text-sm text-muted-foreground">Technicians Online</p></div></CardContent></Card>
        <Card><CardContent className="pt-4 flex items-center gap-3"><AlertCircle className="text-destructive" /><div><p className="text-2xl font-bold">3</p><p className="text-sm text-muted-foreground">Unassigned</p></div></CardContent></Card>
      </div>
      <Card className="h-[500px] flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Map integration would display here with live technician and ticket locations</p>
      </Card>
    </div>
  );
}
