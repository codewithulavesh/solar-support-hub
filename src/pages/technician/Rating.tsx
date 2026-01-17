import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, TrendingUp, Award } from 'lucide-react';

export default function Rating() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">⭐ My Rating</h1>
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} className={`w-8 h-8 ${i <= 4 ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`} />)}
          </div>
          <p className="text-4xl font-bold">4.8</p>
          <p className="text-muted-foreground">Based on 127 ratings</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-lg">Performance</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div><div className="flex justify-between text-sm mb-1"><span>On-Time Rate</span><span>96%</span></div><Progress value={96} /></div>
          <div><div className="flex justify-between text-sm mb-1"><span>First-Fix Rate</span><span>92%</span></div><Progress value={92} /></div>
          <div><div className="flex justify-between text-sm mb-1"><span>Customer Satisfaction</span><span>98%</span></div><Progress value={98} /></div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50">
        <CardContent className="pt-4 flex items-center gap-3">
          <Award className="w-10 h-10 text-yellow-600" />
          <div><p className="font-bold">Gold Performer</p><p className="text-sm text-muted-foreground">Top 10% this month!</p></div>
        </CardContent>
      </Card>
    </div>
  );
}
