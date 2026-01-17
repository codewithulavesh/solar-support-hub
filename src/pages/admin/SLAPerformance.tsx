import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function SLAPerformance() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">SLA & Performance</h1>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-4"><p className="text-4xl font-bold text-success">94%</p><p className="text-sm text-muted-foreground">SLA Compliance</p></CardContent></Card>
        <Card><CardContent className="pt-4"><p className="text-4xl font-bold">4.2h</p><p className="text-sm text-muted-foreground">Avg Response Time</p></CardContent></Card>
        <Card><CardContent className="pt-4"><p className="text-4xl font-bold">18h</p><p className="text-sm text-muted-foreground">Avg Resolution Time</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>SLA by Priority</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><div className="flex justify-between text-sm mb-1"><span>Emergency (4h target)</span><span>98%</span></div><Progress value={98} className="h-2" /></div>
          <div><div className="flex justify-between text-sm mb-1"><span>Urgent (24h target)</span><span>92%</span></div><Progress value={92} className="h-2" /></div>
          <div><div className="flex justify-between text-sm mb-1"><span>Normal (48h target)</span><span>96%</span></div><Progress value={96} className="h-2" /></div>
        </CardContent>
      </Card>
    </div>
  );
}
