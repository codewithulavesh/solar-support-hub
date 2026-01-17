import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';

const systems = [
  { id: 'SELCO-BLG-2024-0042', owner: 'Ramesh Kumar', type: 'Home Light', capacity: '200W', warranty: 'active', health: 'good' },
  { id: 'SELCO-BLG-2024-0038', owner: 'Suma Devi', type: 'Enterprise', capacity: '1kW', warranty: 'active', health: 'fair' },
  { id: 'SELCO-BLG-2023-0156', owner: 'Raju M.', type: 'Street Light', capacity: '100W', warranty: 'expired', health: 'needs_attention' },
];

export default function SolarSystems() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Solar Systems Database</h1>
        <Button><Plus className="w-4 h-4 mr-2" />Add System</Button>
      </div>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>All Systems (156)</CardTitle>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search..." className="pl-9 w-64" /></div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>System ID</TableHead><TableHead>Owner</TableHead><TableHead>Type</TableHead><TableHead>Capacity</TableHead><TableHead>Warranty</TableHead><TableHead>Health</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {systems.map((sys) => (
                <TableRow key={sys.id}>
                  <TableCell className="font-mono">{sys.id}</TableCell>
                  <TableCell>{sys.owner}</TableCell>
                  <TableCell>{sys.type}</TableCell>
                  <TableCell>{sys.capacity}</TableCell>
                  <TableCell><Badge className={sys.warranty === 'active' ? 'bg-success' : 'bg-muted'}>{sys.warranty}</Badge></TableCell>
                  <TableCell><Badge className={sys.health === 'good' ? 'bg-success' : sys.health === 'fair' ? 'bg-warning' : 'bg-destructive'}>{sys.health}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
