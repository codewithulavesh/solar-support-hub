import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { LANGUAGE_LABELS, type LanguagePreference } from '@/types/database';
import { Check, Volume2, Globe } from 'lucide-react';

const languageEmojis: Record<LanguagePreference, string> = {
  kannada: '🇮🇳',
  english: '🇬🇧',
  hindi: '🇮🇳',
  marathi: '🇮🇳',
  tamil: '🇮🇳',
};

const languageNative: Record<LanguagePreference, string> = {
  kannada: 'ಕನ್ನಡ',
  english: 'English',
  hindi: 'हिंदी',
  marathi: 'मराठी',
  tamil: 'தமிழ்',
};

export default function Language() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<LanguagePreference>('kannada');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [voiceNavEnabled, setVoiceNavEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    
    toast({
      title: 'Language Updated',
      description: `App language changed to ${LANGUAGE_LABELS[selected]}`,
    });
  };

  const playAudioSample = (lang: LanguagePreference) => {
    toast({
      title: `🔊 ${LANGUAGE_LABELS[lang]}`,
      description: 'Playing audio sample...',
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🌐 Language
        </h1>
        <p className="text-muted-foreground mt-1">Choose your preferred language</p>
      </div>

      {/* Language Selection */}
      <div className="space-y-3">
        {(Object.entries(LANGUAGE_LABELS) as [LanguagePreference, string][]).map(([code, label]) => (
          <Card 
            key={code} 
            className={`cursor-pointer transition-all ${selected === code ? 'border-primary bg-primary/5 shadow-md' : 'hover:border-primary/50'}`}
            onClick={() => setSelected(code)}
          >
            <CardContent className="flex items-center justify-between py-4 px-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{languageEmojis[code]}</span>
                <div>
                  <p className="font-medium text-lg">{label}</p>
                  <p className="text-sm text-muted-foreground">{languageNative[code]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudioSample(code);
                  }}
                >
                  <Volume2 className="w-5 h-5 text-muted-foreground" />
                </Button>
                {selected === code && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Audio Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Audio Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Audio Labels</p>
              <p className="text-sm text-muted-foreground">Hear button names when tapped</p>
            </div>
            <Switch 
              checked={audioEnabled}
              onCheckedChange={setAudioEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Voice Navigation</p>
              <p className="text-sm text-muted-foreground">Navigate using voice commands</p>
            </div>
            <Switch 
              checked={voiceNavEnabled}
              onCheckedChange={setVoiceNavEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-center">
            <p className="text-lg font-medium">
              {selected === 'kannada' && 'ನಮಸ್ಕಾರ, SELCO Solar ಗೆ ಸ್ವಾಗತ'}
              {selected === 'english' && 'Hello, Welcome to SELCO Solar'}
              {selected === 'hindi' && 'नमस्ते, SELCO Solar में आपका स्वागत है'}
              {selected === 'marathi' && 'नमस्कार, SELCO Solar मध्ये आपले स्वागत आहे'}
              {selected === 'tamil' && 'வணக்கம், SELCO Solar க்கு வரவேற்கிறோம்'}
            </p>
            <p className="text-sm text-muted-foreground">
              {selected === 'kannada' && 'ನಿಮ್ಮ ಸೇವಾ ಅನುಭವ ಸುಧಾರಿಸಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ'}
              {selected === 'english' && "We're here to improve your service experience"}
              {selected === 'hindi' && 'हम आपके सेवा अनुभव को बेहतर बनाने के लिए यहाँ हैं'}
              {selected === 'marathi' && 'तुमचा सेवा अनुभव सुधारण्यासाठी आम्ही येथे आहोत'}
              {selected === 'tamil' && 'உங்கள் சேவை அனுபவத்தை மேம்படுத்த நாங்கள் இங்கே இருக்கிறோம்'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Button 
        className="w-full h-14 text-lg" 
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Language'}
      </Button>
    </div>
  );
}
