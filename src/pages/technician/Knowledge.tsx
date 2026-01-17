import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, PlayCircle, FileText } from 'lucide-react';

const guides = [
  { title: 'Troubleshooting No Light Issues', category: 'Common Issues', difficulty: 'Basic' },
  { title: 'Battery Replacement Guide', category: 'Repairs', difficulty: 'Intermediate' },
  { title: 'Solar Panel Cleaning', category: 'Maintenance', difficulty: 'Basic' },
];

export default function Knowledge() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📚 Knowledge Base</h1>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input placeholder="Search guides..." className="pl-10 h-12" />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Quick Guides</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {guides.map((guide, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{guide.title}</p>
                  <p className="text-xs text-muted-foreground">{guide.category} • {guide.difficulty}</p>
                </div>
              </div>
              <PlayCircle className="w-5 h-5 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">FAQ</CardTitle></CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="1">
              <AccordionTrigger>How to diagnose battery issues?</AccordionTrigger>
              <AccordionContent>Check voltage levels, inspect terminals for corrosion, and test with multimeter.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionTrigger>When to escalate a job?</AccordionTrigger>
              <AccordionContent>Escalate if issue requires specialized equipment or cannot be resolved in first visit.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
