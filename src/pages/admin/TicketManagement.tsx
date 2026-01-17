import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Plus, Eye, UserPlus } from 'lucide-react';

const stats = [
  { label: 'Total Tickets', value: 156, color: 'text-foreground' },
  { label: 'Open', value: 23, color: 'text-warning' },
  { label: 'In Progress', value: 12, color: 'text-info' },
  { label: 'Completed Today', value: 8, color: 'text-success' },
];

const tickets = [
  { id: 'TKT-240115-0042', customer: 'Ramesh Kumar', issue: 'No Light', priority: 'urgent', status: 'on_the_way', technician: 'Lakshmi D.', created: '2h ago' },
  { id: 'TKT-240115-0045', customer: 'Suma Devi', issue: 'Battery Issue', priority: 'normal', status: 'assigned', technician: 'Raju M.', created: '4h ago' },
  { id: 'TKT-240115-0048', customer: 'Raju M.', issue: 'Panel Damage', priority: 'emergency', status: 'submitted', technician: '-', created: '1h ago' },
];

const statusColors: Record<string, string> = {
  submitted: 'bg-yellow-500', assigned: 'bg-blue-500', on_the_way: 'bg-purple-500', completed: 'bg-green-500',
};

export default function TicketManagement() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ticket Management</h1>
        <Button><Plus className="w-4 h-4 mr-2" />New Ticket</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-4">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>All Tickets</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 w-64" />
            </div>
            <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Filter</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono">{ticket.id}</TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>{ticket.issue}</TableCell>
                  <TableCell><Badge className={ticket.priority === 'emergency' ? 'bg-red-500' : ticket.priority === 'urgent' ? 'bg-yellow-500' : 'bg-green-500'}>{ticket.priority}</Badge></TableCell>
                  <TableCell><Badge className={statusColors[ticket.status]}>{ticket.status.replace('_', ' ')}</Badge></TableCell>
                  <TableCell>{ticket.technician}</TableCell>
                  <TableCell>{ticket.created}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon"><UserPlus className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
