import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

export default function Reports() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Reports & Analytics</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card><CardHeader><CardTitle>Daily Operations Report</CardTitle></CardHeader><CardContent><p className="text-muted-foreground mb-4">Tickets, technician performance, SLA compliance</p><Button variant="outline"><Download className="w-4 h-4 mr-2" />Download</Button></CardContent></Card>
        <Card><CardHeader><CardTitle>Weekly Summary</CardTitle></CardHeader><CardContent><p className="text-muted-foreground mb-4">Week-over-week trends and analytics</p><Button variant="outline"><Download className="w-4 h-4 mr-2" />Download</Button></CardContent></Card>
        <Card><CardHeader><CardTitle>Technician Performance</CardTitle></CardHeader><CardContent><p className="text-muted-foreground mb-4">Individual ratings, completion rates</p><Button variant="outline"><Download className="w-4 h-4 mr-2" />Download</Button></CardContent></Card>
        <Card><CardHeader><CardTitle>System Health Report</CardTitle></CardHeader><CardContent><p className="text-muted-foreground mb-4">Warranty status, maintenance schedules</p><Button variant="outline"><Download className="w-4 h-4 mr-2" />Download</Button></CardContent></Card>
      </div>
    </div>
  );
}
