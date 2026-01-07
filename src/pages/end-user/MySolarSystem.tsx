import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MySolarSystem() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">☀️ My Solar System</h1>
      <Card>
        <CardContent className="pt-6 text-center py-8">
          <p className="text-muted-foreground mb-4">No solar systems registered yet</p>
          <Button>Register Your System</Button>
        </CardContent>
      </Card>
    </div>
  );
}
