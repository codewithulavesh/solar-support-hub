import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LANGUAGE_LABELS, type LanguagePreference } from '@/types/database';
import { Check } from 'lucide-react';
import { useState } from 'react';

export default function Language() {
  const [selected, setSelected] = useState<LanguagePreference>('kannada');
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🌐 Language</h1>
      <div className="space-y-3">
        {(Object.entries(LANGUAGE_LABELS) as [LanguagePreference, string][]).map(([code, label]) => (
          <Card 
            key={code} 
            className={`cursor-pointer transition-all ${selected === code ? 'border-primary bg-primary/5' : ''}`}
            onClick={() => setSelected(code)}
          >
            <CardContent className="flex items-center justify-between py-4">
              <span className="text-lg font-medium">{label}</span>
              {selected === code && <Check className="text-primary" />}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="w-full h-14 text-lg">Save Language</Button>
    </div>
  );
}
