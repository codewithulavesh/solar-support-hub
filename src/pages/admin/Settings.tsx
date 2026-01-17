import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardHeader><CardTitle>General Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Company Name</label><Input defaultValue="SELCO Foundation" /></div>
          <div><label className="block text-sm font-medium mb-1">Support Phone</label><Input defaultValue="+91 831 000 0000" /></div>
          <div><label className="block text-sm font-medium mb-1">Support Email</label><Input defaultValue="support@selco.in" /></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between"><span>Email notifications for new tickets</span><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><span>SMS alerts for emergencies</span><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><span>Daily summary reports</span><Switch /></div>
        </CardContent>
      </Card>
      <Button className="w-full">Save Settings</Button>
    </div>
  );
}
