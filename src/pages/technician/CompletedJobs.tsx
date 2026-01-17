import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const mockCompleted = [
  { id: '1', ticket: 'TKT-240114-0038', customer: 'Suma Devi', issue: 'Battery Issue', rating: 5, earned: 400, date: 'Yesterday' },
  { id: '2', ticket: 'TKT-240113-0025', customer: 'Raju M.', issue: 'Panel Damage', rating: 4, earned: 500, date: '2 days ago' },
];

export default function CompletedJobs() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">✅ Completed Jobs</h1>
      {mockCompleted.map((job) => (
        <Card key={job.id}>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-mono text-sm text-muted-foreground">{job.ticket}</p>
                <p className="font-bold">{job.customer}</p>
                <p className="text-sm text-muted-foreground">{job.issue}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-success">₹{job.earned}</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: job.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{job.date}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
