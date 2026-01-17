import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export default function Profile() {
  const [isOnline, setIsOnline] = useState(true);
  
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">⚙️ Profile & Availability</h1>
      
      <Card className="border-primary">
        <CardContent className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success' : 'bg-muted'}`} />
            <span className="font-medium">{isOnline ? 'Online - Accepting Jobs' : 'Offline'}</span>
          </div>
          <Switch checked={isOnline} onCheckedChange={setIsOnline} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4 flex items-center gap-4">
          <Avatar className="w-16 h-16"><AvatarFallback className="text-xl">LD</AvatarFallback></Avatar>
          <div>
            <p className="font-bold text-lg">Lakshmi Devi</p>
            <p className="text-sm text-muted-foreground">EMP-2024-0042</p>
            <Badge className="mt-1 bg-pink-500/20 text-pink-700">Women-led</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Working Hours</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between"><span>Monday - Saturday</span><span className="font-medium">9:00 AM - 6:00 PM</span></div>
          <div className="flex justify-between"><span>Sunday</span><span className="text-muted-foreground">Off</span></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Service Area</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Belgaum City, Hindwadi, Vadgaon</p>
          <p className="text-sm text-muted-foreground mt-1">Radius: 10 km</p>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full h-12">Edit Profile</Button>
    </div>
  );
}
