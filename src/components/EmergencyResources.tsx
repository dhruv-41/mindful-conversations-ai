import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Globe, AlertTriangle } from 'lucide-react';

const EmergencyResources: React.FC = () => {
  const resources = [
    {
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 crisis support and suicide prevention",
      icon: Phone,
      color: "crisis"
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "24/7 crisis support via text message",
      icon: MessageSquare,
      color: "crisis"
    },
    {
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Mental health and substance abuse help",
      icon: Phone,
      color: "calm"
    },
    {
      name: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      description: "24/7 domestic violence support",
      icon: Phone,
      color: "calm"
    }
  ];

  const getButtonVariant = (color: string) => {
    return color === "crisis" ? "crisis" : "calm";
  };

  return (
    <Card className="p-6 bg-card shadow-warm border-destructive/20">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-destructive" />
        <h2 className="text-xl font-semibold text-foreground">Emergency Resources</h2>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <p className="text-sm text-foreground">
            <strong>If you're in immediate danger, call 911 or go to your nearest emergency room.</strong>
          </p>
        </div>
        
        {resources.map((resource, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <resource.icon className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-medium text-foreground">{resource.name}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </div>
            </div>
            <Button 
              variant={getButtonVariant(resource.color)}
              size="sm"
              onClick={() => window.open(`tel:${resource.phone.replace(/\D/g, '')}`)}
            >
              {resource.phone}
            </Button>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Online Resources</span>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• <a href="https://www.betterhelp.com" className="text-primary hover:underline">BetterHelp</a> - Professional online therapy</p>
          <p>• <a href="https://www.crisistextline.org" className="text-primary hover:underline">Crisis Text Line</a> - Free crisis counseling</p>
          <p>• <a href="https://www.nami.org" className="text-primary hover:underline">NAMI</a> - Mental health information and support</p>
        </div>
      </div>
    </Card>
  );
};

export default EmergencyResources;