import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'How do I report an issue?', a: 'Go to "Report Issue" and select your problem type or describe it.' },
  { q: 'How long until a technician arrives?', a: 'Normal issues: 48 hours. Urgent: 24 hours. Emergency: 4 hours.' },
  { q: 'Is service free during warranty?', a: 'Yes, all services and parts are free during warranty period.' },
];

export default function HelpInfo() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">ℹ️ Help & Info</h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
