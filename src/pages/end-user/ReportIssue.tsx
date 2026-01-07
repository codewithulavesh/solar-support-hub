import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Lightbulb, Battery, Sun, Zap, AlertTriangle, HelpCircle, 
  Camera, Mic, MapPin, Loader2, CheckCircle 
} from 'lucide-react';
import { ISSUE_CATEGORY_LABELS, type IssueCategory, type TicketPriority } from '@/types/database';

const quickIssues = [
  { category: 'no_light' as IssueCategory, icon: Lightbulb, label: 'Light Not Working', emoji: '💡' },
  { category: 'battery_problem' as IssueCategory, icon: Battery, label: 'Battery Issue', emoji: '🔋' },
  { category: 'panel_damage' as IssueCategory, icon: Sun, label: 'Panel Damaged', emoji: '☀️' },
];

export default function ReportIssue() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  
  const [issueCategory, setIssueCategory] = useState<IssueCategory | ''>('');
  const [priority, setPriority] = useState<TicketPriority>('normal');
  const [description, setDescription] = useState('');

  const handleQuickSubmit = async (category: IssueCategory) => {
    await submitTicket(category, 'normal', `Quick report: ${ISSUE_CATEGORY_LABELS[category]}`);
  };

  const submitTicket = async (category: IssueCategory, ticketPriority: TicketPriority, desc: string) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    const { data, error } = await supabase
      .from('tickets')
      .insert({
        customer_id: user.id,
        issue_category: category,
        priority: ticketPriority,
        issue_description: desc,
      })
      .select('ticket_number')
      .single();
    
    setIsSubmitting(false);
    
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit service request. Please try again.',
        variant: 'destructive',
      });
    } else {
      setTicketNumber(data.ticket_number);
      setSubmitted(true);
      toast({
        title: 'Request Submitted!',
        description: `Ticket ${data.ticket_number} created successfully.`,
      });
    }
  };

  const handleFormSubmit = async () => {
    if (!issueCategory) {
      toast({
        title: 'Please select an issue type',
        variant: 'destructive',
      });
      return;
    }
    await submitTicket(issueCategory, priority, description);
  };

  const resetForm = () => {
    setSubmitted(false);
    setTicketNumber('');
    setIssueCategory('');
    setPriority('normal');
    setDescription('');
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-lg mx-auto">
        <Card className="border-success bg-success/5">
          <CardContent className="pt-8 pb-8 text-center">
            <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
            <p className="text-lg text-muted-foreground mb-4">Your ticket number is:</p>
            <p className="text-3xl font-bold text-primary mb-6">{ticketNumber}</p>
            <p className="text-muted-foreground mb-6">
              A technician will be assigned soon. You can track the status in "My Service Status".
            </p>
            <div className="space-y-3">
              <Button onClick={resetForm} className="w-full h-14 text-lg">
                Report Another Issue
              </Button>
              <Button variant="outline" className="w-full h-14 text-lg" asChild>
                <a href="tel:+918310000000">📞 Call Support Now</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🆘 Report Issue
        </h1>
        <p className="text-muted-foreground mt-1">Tell us what's wrong with your solar system</p>
      </div>

      {/* Quick Issue Buttons */}
      <div className="space-y-3">
        <h2 className="font-semibold text-lg">Quick Report (One Tap)</h2>
        <div className="grid gap-3">
          {quickIssues.map((issue) => (
            <Button
              key={issue.category}
              variant="outline"
              className="h-20 text-left justify-start gap-4 text-lg hover:bg-primary/5 hover:border-primary"
              onClick={() => handleQuickSubmit(issue.category)}
              disabled={isSubmitting}
            >
              <span className="text-3xl">{issue.emoji}</span>
              <span>{issue.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Detailed Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Or Describe Your Issue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Issue Type *</label>
            <Select value={issueCategory} onValueChange={(v) => setIssueCategory(v as IssueCategory)}>
              <SelectTrigger className="h-14 text-base">
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ISSUE_CATEGORY_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value} className="py-3 text-base">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <Select value={priority} onValueChange={(v) => setPriority(v as TicketPriority)}>
              <SelectTrigger className="h-14 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal" className="py-3">🟢 Normal</SelectItem>
                <SelectItem value="urgent" className="py-3">🟡 Urgent</SelectItem>
                <SelectItem value="emergency" className="py-3">🔴 Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description (Optional)</label>
            <Textarea
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] text-base"
            />
          </div>

          <Button 
            onClick={handleFormSubmit}
            className="w-full h-14 text-lg bg-solar-gradient"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Service Request'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
