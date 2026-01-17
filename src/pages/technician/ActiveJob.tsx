import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Phone, MapPin, Navigation, MessageCircle, Clock, CheckCircle } from 'lucide-react';

const mockActiveJob = {
  ticket: 'TKT-240115-0042', customer: 'Ramesh Kumar', phone: '+91 98765 43210',
  issue: 'Light Not Working', address: 'House 42, Main Road, Belgaum 590001',
  status: 'on_the_way', startTime: '10:30 AM', description: 'Main bedroom light not working since morning',
};

const statusSteps = ['accepted', 'on_the_way', 'arrived', 'in_progress', 'completed'];

export default function ActiveJob() {
  const currentStep = statusSteps.indexOf(mockActiveJob.status);
  const progress = ((currentStep + 1) / statusSteps.length) * 100;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🔧 My Active Job</h1>
      
      <Card className="border-primary bg-primary/5">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{mockActiveJob.ticket}</p>
              <CardTitle>{mockActiveJob.customer}</CardTitle>
            </div>
            <Badge>In Progress</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">{mockActiveJob.issue}</p>
            <p className="text-sm text-muted-foreground">{mockActiveJob.description}</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{mockActiveJob.address}</span>
          </div>

          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Accepted</span><span>On Way</span><span>Arrived</span><span>Working</span><span>Done</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button className="h-12" asChild>
              <a href={`tel:${mockActiveJob.phone}`}><Phone className="mr-2 w-4 h-4" />Call</a>
            </Button>
            <Button variant="secondary" className="h-12">
              <Navigation className="mr-2 w-4 h-4" />Navigate
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="h-12">Mark Arrived</Button>
            <Button variant="outline" className="h-12">Start Work</Button>
          </div>

          <Button className="w-full h-14 bg-success hover:bg-success/90">
            <CheckCircle className="mr-2 w-5 h-5" />Complete Job
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
