import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Phone, MessageCircle, MapPin, Clock, Star, CheckCircle, 
  AlertCircle, Truck, Wrench, XCircle 
} from 'lucide-react';
import { TICKET_STATUS_LABELS, ISSUE_CATEGORY_LABELS } from '@/types/database';

// Mock active ticket
const mockActiveTicket = {
  id: '1',
  ticket_number: 'TKT-240115-0042',
  issue_category: 'no_light' as const,
  priority: 'urgent' as const,
  status: 'on_the_way' as const,
  issue_description: 'Main light in the bedroom not working since morning',
  created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  technician: {
    name: 'Lakshmi Devi',
    phone: '+91 98765 43210',
    rating: 4.8,
    distance: 2.5,
    eta: '15 mins',
    photo: null,
  },
};

// Mock past tickets
const mockPastTickets = [
  {
    id: '2',
    ticket_number: 'TKT-240110-0038',
    issue_category: 'battery_problem' as const,
    status: 'completed' as const,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 4.5 * 24 * 60 * 60 * 1000).toISOString(),
    customer_rating: 5,
    technician_name: 'Raju M.',
  },
  {
    id: '3',
    ticket_number: 'TKT-240105-0021',
    issue_category: 'panel_damage' as const,
    status: 'closed' as const,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    customer_rating: 4,
    technician_name: 'Suma K.',
  },
];

const statusProgress: Record<string, number> = {
  submitted: 10,
  assigned: 25,
  accepted: 40,
  on_the_way: 60,
  arrived: 75,
  in_progress: 85,
  completed: 100,
};

const statusIcons: Record<string, React.ReactNode> = {
  submitted: <AlertCircle className="w-5 h-5" />,
  assigned: <Clock className="w-5 h-5" />,
  accepted: <CheckCircle className="w-5 h-5" />,
  on_the_way: <Truck className="w-5 h-5" />,
  arrived: <MapPin className="w-5 h-5" />,
  in_progress: <Wrench className="w-5 h-5" />,
  completed: <CheckCircle className="w-5 h-5" />,
  cancelled: <XCircle className="w-5 h-5" />,
};

export default function ServiceStatus() {
  const [activeTab, setActiveTab] = useState('active');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'bg-red-500';
      case 'urgent': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📍 My Service Status
        </h1>
        <p className="text-muted-foreground mt-1">Track your service requests</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 h-14">
          <TabsTrigger value="active" className="text-base">Active Request</TabsTrigger>
          <TabsTrigger value="history" className="text-base">Past Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-4">
          {mockActiveTicket ? (
            <>
              {/* Ticket Header */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket</p>
                      <CardTitle className="text-xl">{mockActiveTicket.ticket_number}</CardTitle>
                    </div>
                    <Badge className={getPriorityColor(mockActiveTicket.priority)}>
                      {mockActiveTicket.priority.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Issue</p>
                    <p className="font-medium">{ISSUE_CATEGORY_LABELS[mockActiveTicket.issue_category]}</p>
                    <p className="text-sm text-muted-foreground mt-1">{mockActiveTicket.issue_description}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Created</p>
                    <p className="text-sm">{formatDate(mockActiveTicket.created_at)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {statusIcons[mockActiveTicket.status]}
                    {TICKET_STATUS_LABELS[mockActiveTicket.status]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={statusProgress[mockActiveTicket.status] || 0} className="h-3 mb-4" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Submitted</span>
                    <span>Assigned</span>
                    <span>On Way</span>
                    <span>Resolved</span>
                  </div>
                </CardContent>
              </Card>

              {/* Technician Info */}
              {mockActiveTicket.technician && (
                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Technician</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="text-xl bg-primary/20">
                          {mockActiveTicket.technician.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-bold text-lg">{mockActiveTicket.technician.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span>{mockActiveTicket.technician.rating}</span>
                          <span>•</span>
                          <MapPin className="w-4 h-4" />
                          <span>{mockActiveTicket.technician.distance} km away</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                      <p className="text-2xl font-bold text-primary">{mockActiveTicket.technician.eta}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button className="h-14" asChild>
                        <a href={`tel:${mockActiveTicket.technician.phone}`}>
                          <Phone className="mr-2 w-5 h-5" />
                          Call
                        </a>
                      </Button>
                      <Button variant="secondary" className="h-14 bg-green-600 hover:bg-green-700 text-white">
                        <MessageCircle className="mr-2 w-5 h-5" />
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-12">
                  Reschedule
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1 h-12"
                  onClick={() => setShowCancelConfirm(true)}
                >
                  Cancel Request
                </Button>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <CheckCircle className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No active service requests</p>
                <p className="text-sm text-muted-foreground mt-1">All your issues have been resolved!</p>
                <Button className="mt-6" asChild>
                  <a href="/report-issue">Report New Issue</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-4">
          {mockPastTickets.map((ticket) => (
            <Card key={ticket.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-mono text-sm text-muted-foreground">{ticket.ticket_number}</p>
                    <p className="font-medium">{ISSUE_CATEGORY_LABELS[ticket.issue_category]}</p>
                  </div>
                  <Badge variant={ticket.status === 'completed' ? 'default' : 'secondary'}>
                    {TICKET_STATUS_LABELS[ticket.status]}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-3">
                  <span>{formatDate(ticket.created_at)}</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: ticket.customer_rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  Serviced by {ticket.technician_name}
                </p>
              </CardContent>
            </Card>
          ))}

          {mockPastTickets.length === 0 && (
            <Card>
              <CardContent className="pt-8 pb-8 text-center">
                <p className="text-muted-foreground">No past tickets found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
