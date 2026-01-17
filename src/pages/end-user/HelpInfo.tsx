import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle, PlayCircle, Book, AlertTriangle, Building2,
  MapPin, Phone, Mail, ExternalLink, Volume2, CheckCircle
} from 'lucide-react';

const faqs = [
  { 
    q: 'How do I report an issue?', 
    a: 'Go to "Report Issue" from the menu. You can either tap a quick issue button or fill in the detailed form. You can also add photos and voice notes to help us understand your problem better.',
  },
  { 
    q: 'How long until a technician arrives?', 
    a: 'Response times depend on priority: Emergency issues: within 4 hours. Urgent issues: within 24 hours. Normal issues: within 48 hours.',
  },
  { 
    q: 'Is service free during warranty?', 
    a: 'Yes! All services, repairs, and parts replacements are completely free during your warranty period. Check your warranty status in "My Solar System".',
  },
  { 
    q: 'How do I know my warranty status?', 
    a: 'Go to "My Solar System" and check the warranty section. It shows your warranty start date, end date, and current status.',
  },
  { 
    q: 'Can I reschedule a technician visit?', 
    a: 'Yes, you can reschedule from the "My Service Status" page. Click on "Reschedule" button and select a new time that works for you.',
  },
  { 
    q: 'What if the technician cannot fix my issue?', 
    a: 'If the issue cannot be resolved on the first visit, the technician will escalate it to our technical team. A senior technician will be assigned for complex issues.',
  },
];

const maintenanceTips = [
  { title: 'Clean Solar Panels Monthly', description: 'Use soft cloth and water to remove dust and debris', icon: '🧹' },
  { title: 'Check Battery Water Levels', description: 'For lead-acid batteries, check every 2 months', icon: '💧' },
  { title: 'Inspect Wiring Connections', description: 'Look for loose or corroded connections quarterly', icon: '🔌' },
  { title: 'Keep Panels Unshaded', description: 'Trim trees or objects that may cast shadows', icon: '☀️' },
  { title: 'Monitor Performance', description: 'Notice if lights are dimmer than usual', icon: '👁️' },
];

const dosDonts = {
  dos: [
    'Clean panels regularly with soft materials',
    'Report issues as soon as you notice them',
    'Keep the battery area well-ventilated',
    'Schedule regular maintenance checks',
    'Keep warranty documents safe',
  ],
  donts: [
    'Don\'t use harsh chemicals on panels',
    'Don\'t attempt repairs yourself',
    'Don\'t overload the system with extra appliances',
    'Don\'t ignore warning signs like dim lights',
    'Don\'t cover or shade the solar panels',
  ],
};

const offices = [
  {
    name: 'SELCO Belgaum (Main)',
    address: '123 Main Street, Belgaum, Karnataka 590001',
    phone: '+91 831 000 0000',
    email: 'belgaum@selco.in',
  },
  {
    name: 'SELCO Hubli',
    address: '456 Station Road, Hubli, Karnataka 580020',
    phone: '+91 836 000 0000',
    email: 'hubli@selco.in',
  },
];

export default function HelpInfo() {
  const [activeTab, setActiveTab] = useState('faq');

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          ℹ️ Help & Info
        </h1>
        <p className="text-muted-foreground mt-1">Learn how to use the app and care for your system</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="faq" className="text-xs">FAQ</TabsTrigger>
          <TabsTrigger value="care" className="text-xs">Care</TabsTrigger>
          <TabsTrigger value="tutorial" className="text-xs">Tutorial</TabsTrigger>
          <TabsTrigger value="about" className="text-xs">About</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-base">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                        <Volume2 className="w-4 h-4 mr-1" />
                        Listen
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="care" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Book className="w-5 h-5" />
                Maintenance Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {maintenanceTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <p className="font-medium">{tip.title}</p>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Do's and Don'ts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-success flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4" /> Do's
                  </p>
                  <ul className="space-y-2">
                    {dosDonts.dos.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-success">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-destructive flex items-center gap-2 mb-2">
                    ✕ Don'ts
                  </p>
                  <ul className="space-y-2">
                    {dosDonts.donts.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-destructive">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full h-12">
            <PlayCircle className="mr-2 w-5 h-5" />
            Watch Maintenance Video Guide
          </Button>
        </TabsContent>

        <TabsContent value="tutorial" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                How to Use This App
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Button variant="secondary" size="lg">
                  <PlayCircle className="mr-2 w-6 h-6" />
                  Play Tutorial
                </Button>
              </div>

              <div className="space-y-3">
                <p className="font-medium">Quick Start Guide:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <p className="font-medium">Report an Issue</p>
                      <p className="text-sm text-muted-foreground">Tap "Report Issue" and describe your problem</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <p className="font-medium">Track Status</p>
                      <p className="text-sm text-muted-foreground">View technician assignment and arrival time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <p className="font-medium">Get Help</p>
                      <p className="text-sm text-muted-foreground">Call or chat with support anytime</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full h-12">
            <Volume2 className="mr-2 w-5 h-5" />
            Listen to Audio Guide
          </Button>
        </TabsContent>

        <TabsContent value="about" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                About SELCO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                SELCO Foundation is a not-for-profit organization that works to provide sustainable energy access to underserved communities. Since 1995, we have been bringing clean energy solutions to rural India.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://selcofoundation.org" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Website
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Our Offices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {offices.map((office, i) => (
                <div key={i} className="border-b last:border-0 pb-4 last:pb-0">
                  <p className="font-medium">{office.name}</p>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {office.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {office.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {office.email}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <p className="text-center text-sm text-muted-foreground">
                App Version 1.0.0
                <br />
                © 2024 SELCO Foundation. All rights reserved.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
