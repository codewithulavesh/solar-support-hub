import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle, Mic, MapPin, Camera } from 'lucide-react';
import { ISSUE_CATEGORY_LABELS, type IssueCategory, type TicketPriority } from '@/types/database';

const quickIssues = [
  { category: 'no_light' as IssueCategory, label: 'Light Not Working', emoji: '💡' },
  { category: 'battery_problem' as IssueCategory, label: 'Battery Issue', emoji: '🔋' },
  { category: 'panel_damage' as IssueCategory, label: 'Panel Damaged', emoji: '☀️' },
];

// Generate mock ticket number
const generateTicketNumber = () => {
  const prefix = 'TKT';
  const date = new Date();
  const dateStr = date.toISOString().slice(2, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${dateStr}-${random}`;
};

export default function ReportIssue() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState<{lat: number; lng: number} | null>(null);
  
  const [issueCategory, setIssueCategory] = useState<IssueCategory | ''>('');
  const [priority, setPriority] = useState<TicketPriority>('normal');
  const [description, setDescription] = useState('');

  const handleQuickSubmit = async (category: IssueCategory) => {
    await submitTicket(category, 'normal', `Quick report: ${ISSUE_CATEGORY_LABELS[category]}`);
  };

  const submitTicket = async (category: IssueCategory, ticketPriority: TicketPriority, desc: string) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newTicketNumber = generateTicketNumber();
    setTicketNumber(newTicketNumber);
    setSubmitted(true);
    setIsSubmitting(false);
    
    toast({
      title: 'Request Submitted!',
      description: `Ticket ${newTicketNumber} created successfully.`,
    });
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
    setHasVoiceNote(false);
    setPhotos([]);
    setLocation(null);
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasVoiceNote(true);
      toast({ title: 'Voice note recorded', description: '30 seconds recorded' });
    } else {
      setIsRecording(true);
      toast({ title: 'Recording...', description: 'Tap again to stop' });
      // Auto stop after 30 seconds
      setTimeout(() => {
        setIsRecording(false);
        setHasVoiceNote(true);
      }, 30000);
    }
  };

  const handlePhotoCapture = () => {
    if (photos.length < 3) {
      const newPhoto = `photo_${Date.now()}`;
      setPhotos([...photos, newPhoto]);
      toast({ title: 'Photo added', description: `${photos.length + 1}/3 photos` });
    } else {
      toast({ title: 'Maximum photos reached', description: 'You can add up to 3 photos', variant: 'destructive' });
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          toast({ title: 'Location captured', description: 'Your location has been added' });
        },
        () => {
          toast({ title: 'Location error', description: 'Could not get your location', variant: 'destructive' });
        }
      );
    }
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

          {/* Media Attachments */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant={isRecording ? "destructive" : hasVoiceNote ? "secondary" : "outline"}
              className="h-14 flex flex-col gap-1"
              onClick={handleVoiceRecord}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
              <span className="text-xs">{isRecording ? 'Stop' : hasVoiceNote ? 'Recorded ✓' : 'Voice'}</span>
            </Button>
            <Button
              type="button"
              variant={photos.length > 0 ? "secondary" : "outline"}
              className="h-14 flex flex-col gap-1"
              onClick={handlePhotoCapture}
            >
              <Camera className="w-5 h-5" />
              <span className="text-xs">{photos.length > 0 ? `${photos.length}/3 Photos` : 'Photo'}</span>
            </Button>
            <Button
              type="button"
              variant={location ? "secondary" : "outline"}
              className="h-14 flex flex-col gap-1"
              onClick={handleGetLocation}
            >
              <MapPin className="w-5 h-5" />
              <span className="text-xs">{location ? 'Located ✓' : 'Location'}</span>
            </Button>
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
