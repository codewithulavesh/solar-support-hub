import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageCircle } from 'lucide-react';

export default function CallHelp() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📞 Call for Help</h1>
      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle>SELCO Support</CardTitle></CardHeader>
          <CardContent>
            <Button className="w-full h-16 text-lg" asChild>
              <a href="tel:+918310000000">
                <Phone className="mr-3" /> Call Helpline
              </a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>WhatsApp</CardTitle></CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full h-16 text-lg bg-green-600 hover:bg-green-700 text-white" asChild>
              <a href="https://wa.me/918310000000">
                <MessageCircle className="mr-3" /> Chat on WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
