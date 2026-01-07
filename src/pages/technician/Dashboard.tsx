import { Card, CardContent } from '@/components/ui/card';

interface Props { page: string; }

export default function TechnicianDashboard({ page }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize mb-4">{page.replace('-', ' ')}</h1>
      <Card><CardContent className="py-8 text-center text-muted-foreground">
        Technician {page} page - Coming soon
      </CardContent></Card>
    </div>
  );
}
