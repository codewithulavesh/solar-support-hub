import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Camera, CheckCircle } from 'lucide-react';

export default function CompleteJob() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📸 Complete Job</h1>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Before Photos</label>
            <Button variant="outline" className="w-full h-20"><Camera className="mr-2" />Take Before Photo</Button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">After Photos</label>
            <Button variant="outline" className="w-full h-20"><Camera className="mr-2" />Take After Photo</Button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Work Summary</label>
            <Textarea placeholder="Describe work performed..." className="min-h-[100px]" />
          </div>
          <Button className="w-full h-14 bg-success"><CheckCircle className="mr-2" />Submit & Complete</Button>
        </CardContent>
      </Card>
    </div>
  );
}
