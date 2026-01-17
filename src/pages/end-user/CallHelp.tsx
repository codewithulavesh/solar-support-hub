import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Phone, MessageCircle, Clock, MapPin, CheckCircle,
  Calendar, AlertCircle
} from 'lucide-react';
import { ISSUE_CATEGORY_LABELS } from '@/types/database';

// Mock office data
const mockOffice = {
  name: 'SELCO Belgaum',
  phone: '+91 831 000 0000',
  whatsapp: '+91 831 000 0001',
  address: '123 Main Street, Belgaum, Karnataka 590001',
  working_hours: '9:00 AM - 6:00 PM (Mon-Sat)',
};

// Mock call history
const mockCallHistory = [
  { id: '1', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), duration: '5:23', type: 'outgoing' },
  { id: '2', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), duration: '3:45', type: 'incoming' },
];

export default function CallHelp() {
  const { toast } = useToast();
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [callbackData, setCallbackData] = useState({
    phone: '',
    preferredTime: '',
    issueType: '',
    notes: '',
  });

  const handleCallbackSubmit = async () => {
    if (!callbackData.phone) {
      toast({
        title: 'Phone number required',
        variant: 'destructive',
      });
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCallbackSubmitted(true);
    toast({
      title: 'Callback Requested',
      description: 'We will call you back soon!',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📞 Call for Help
        </h1>
        <p className="text-muted-foreground mt-1">Get support from SELCO team</p>
      </div>

      {/* Quick Contact */}
      <div className="space-y-3">
        <Card className="border-primary bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">SELCO Helpline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full h-16 text-lg bg-solar-gradient" asChild>
              <a href={`tel:${mockOffice.phone}`}>
                <Phone className="mr-3 w-6 h-6" />
                Call Now
              </a>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {mockOffice.phone}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">WhatsApp Support</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full h-16 text-lg bg-green-600 hover:bg-green-700 text-white" 
              asChild
            >
              <a href={`https://wa.me/${mockOffice.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-3 w-6 h-6" />
                Chat on WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Callback Request */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Request Callback
          </CardTitle>
        </CardHeader>
        <CardContent>
          {callbackSubmitted ? (
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <p className="font-medium text-lg">Callback Requested!</p>
              <p className="text-muted-foreground mt-2">
                We will call you back within 30 minutes
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setCallbackSubmitted(false);
                  setCallbackData({ phone: '', preferredTime: '', issueType: '', notes: '' });
                }}
              >
                Request Another Callback
              </Button>
            </div>
          ) : showCallbackForm ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={callbackData.phone}
                  onChange={(e) => setCallbackData({ ...callbackData, phone: e.target.value })}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Time</label>
                <Select 
                  value={callbackData.preferredTime} 
                  onValueChange={(v) => setCallbackData({ ...callbackData, preferredTime: v })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">As soon as possible</SelectItem>
                    <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                    <SelectItem value="evening">Evening (4 PM - 6 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Issue Type</label>
                <Select 
                  value={callbackData.issueType} 
                  onValueChange={(v) => setCallbackData({ ...callbackData, issueType: v })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ISSUE_CATEGORY_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                <Textarea
                  placeholder="Brief description of your issue..."
                  value={callbackData.notes}
                  onChange={(e) => setCallbackData({ ...callbackData, notes: e.target.value })}
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12"
                  onClick={() => setShowCallbackForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 h-12"
                  onClick={handleCallbackSubmit}
                >
                  Request Callback
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">
                Can't call now? We'll call you back!
              </p>
              <Button 
                variant="outline" 
                className="w-full h-14"
                onClick={() => setShowCallbackForm(true)}
              >
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Callback
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Office Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{mockOffice.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
            <p className="text-sm">{mockOffice.address}</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <p className="text-sm">{mockOffice.working_hours}</p>
          </div>
        </CardContent>
      </Card>

      {/* Call History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          {mockCallHistory.length > 0 ? (
            <div className="space-y-3">
              {mockCallHistory.map((call) => (
                <div key={call.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${call.type === 'outgoing' ? 'bg-primary/10' : 'bg-success/10'}`}>
                      <Phone className={`w-4 h-4 ${call.type === 'outgoing' ? 'text-primary' : 'text-success'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">SELCO Support</p>
                      <p className="text-xs text-muted-foreground">{formatDate(call.date)}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{call.duration}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">No recent calls</p>
          )}
        </CardContent>
      </Card>

      {/* Emergency */}
      <Card className="border-destructive bg-destructive/5">
        <CardContent className="pt-4 flex items-center gap-4">
          <div className="p-3 rounded-full bg-destructive/20">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
          <div className="flex-1">
            <p className="font-medium">Emergency?</p>
            <p className="text-sm text-muted-foreground">For urgent issues, call our 24/7 emergency line</p>
          </div>
          <Button variant="destructive" size="sm" asChild>
            <a href="tel:+911800000000">Call</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
