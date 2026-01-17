import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Phone, MapPin } from 'lucide-react';

const technicians = [
  { id: '1', name: 'Lakshmi Devi', status: 'online', rating: 4.8, jobs: 127, area: 'Belgaum City', womenLed: true },
  { id: '2', name: 'Raju M.', status: 'busy', rating: 4.5, jobs: 98, area: 'Hindwadi', womenLed: false },
  { id: '3', name: 'Suma K.', status: 'offline', rating: 4.9, jobs: 156, area: 'Vadgaon', womenLed: true },
];

export default function TechnicianManagement() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Technician Management</h1>
        <Button>Add Technician</Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {technicians.map((tech) => (
          <Card key={tech.id}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar><AvatarFallback>{tech.name.charAt(0)}</AvatarFallback></Avatar>
                <div>
                  <p className="font-bold">{tech.name}</p>
                  <Badge className={tech.status === 'online' ? 'bg-success' : tech.status === 'busy' ? 'bg-warning' : 'bg-muted'}>{tech.status}</Badge>
                  {tech.womenLed && <Badge className="ml-1 bg-pink-500/20 text-pink-700">Women-led</Badge>}
                </div>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />{tech.rating} • {tech.jobs} jobs</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" />{tech.area}</p>
              </div>
              <Button variant="outline" className="w-full mt-3" size="sm">View Profile</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
