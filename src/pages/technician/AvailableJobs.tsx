import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, Star, ChevronRight } from 'lucide-react';

const mockJobs = [
  { id: '1', ticket: 'TKT-240115-0042', customer: 'Ramesh Kumar', issue: 'no_light', priority: 'urgent', distance: 2.5, address: 'House 42, Main Road', eta: '15 min', payment: 350 },
  { id: '2', ticket: 'TKT-240115-0045', customer: 'Suma Devi', issue: 'battery_problem', priority: 'normal', distance: 4.2, address: '15 Temple Street', eta: '25 min', payment: 400 },
  { id: '3', ticket: 'TKT-240115-0048', customer: 'Raju M.', issue: 'panel_damage', priority: 'emergency', distance: 1.8, address: 'Near Bus Stand', eta: '10 min', payment: 500 },
];

const issueLabels: Record<string, string> = {
  no_light: '💡 No Light', battery_problem: '🔋 Battery Issue', panel_damage: '☀️ Panel Damage',
};

export default function AvailableJobs() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">🧰 Available Jobs</h1>
        <Badge variant="secondary">{mockJobs.length} jobs</Badge>
      </div>
      
      {mockJobs.map((job) => (
        <Card key={job.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-mono text-sm text-muted-foreground">{job.ticket}</p>
                <p className="font-bold text-lg">{job.customer}</p>
              </div>
              <Badge className={job.priority === 'emergency' ? 'bg-red-500' : job.priority === 'urgent' ? 'bg-yellow-500' : 'bg-green-500'}>
                {job.priority.toUpperCase()}
              </Badge>
            </div>
            <p className="text-base mb-3">{issueLabels[job.issue]}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.distance} km</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.eta}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg text-success">₹{job.payment}</span>
              <Button>Accept Job <ChevronRight className="w-4 h-4 ml-1" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
