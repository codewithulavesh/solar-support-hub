import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function JobAssignment() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Job Assignment</h1>
      <Card>
        <CardHeader><CardTitle>Auto-Assignment Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="font-medium">Enable Auto-Assignment</p><p className="text-sm text-muted-foreground">Automatically assign jobs based on proximity and skills</p></div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="font-medium">Prioritize Women Technicians</p><p className="text-sm text-muted-foreground">Give preference to women-led technicians when available</p></div>
            <Switch />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Unassigned Jobs (3)</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Drag and drop interface for manual assignment would appear here</p>
        </CardContent>
      </Card>
    </div>
  );
}
