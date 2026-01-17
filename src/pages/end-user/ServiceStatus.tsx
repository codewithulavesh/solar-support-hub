import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServiceStatus() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📍 My Service Status</h1>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center py-8">No active service requests</p>
        </CardContent>
      </Card>
    </div>
  );
}
