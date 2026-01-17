import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp } from 'lucide-react';

export default function Earnings() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">💰 Earnings</h1>
      <Card className="bg-eco-gradient text-white">
        <CardContent className="pt-6">
          <p className="text-white/70">This Month</p>
          <p className="text-4xl font-bold">₹12,450</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-white/80">
            <TrendingUp className="w-4 h-4" />+15% from last month
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-3">
        <Card><CardContent className="pt-4 text-center"><p className="text-2xl font-bold">₹850</p><p className="text-sm text-muted-foreground">Today</p></CardContent></Card>
        <Card><CardContent className="pt-4 text-center"><p className="text-2xl font-bold">₹3,200</p><p className="text-sm text-muted-foreground">This Week</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Pending</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-warning">₹1,250</p><p className="text-sm text-muted-foreground">Will be paid on Friday</p></CardContent>
      </Card>
    </div>
  );
}
