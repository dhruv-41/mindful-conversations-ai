import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafetyDisclaimer from '@/components/SafetyDisclaimer';
import TherapyChat from '@/components/TherapyChat';
import EmergencyResources from '@/components/EmergencyResources';
import MoodTracker from '@/components/MoodTracker';
import heroImage from '@/assets/hero-therapy.jpg';
import { Heart, Shield, Brain, MessageSquare, Phone, TrendingUp } from 'lucide-react';

const Index = () => {
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
  const [currentMood, setCurrentMood] = useState('calm');
  const [showEmergencyResources, setShowEmergencyResources] = useState(false);

  if (!hasAcceptedDisclaimer) {
    return <SafetyDisclaimer onAccept={() => setHasAcceptedDisclaimer(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-therapeutic">
      {/* Header */}
      <header className="bg-card shadow-gentle border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-calm rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Therapy Assistant</h1>
                <p className="text-sm text-muted-foreground">Empathetic AI support for your mental wellbeing</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-primary-soft text-primary">
                Safe & Confidential
              </Badge>
              <Button 
                variant="crisis" 
                size="sm"
                onClick={() => setShowEmergencyResources(!showEmergencyResources)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency Help
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-calm">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Calming therapeutic background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Your Mental Health Matters
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              An AI companion designed to listen, understand, and provide supportive guidance through therapeutic conversations tailored to your emotional needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground">Private & Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Brain className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground">CBT Techniques</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <MessageSquare className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showEmergencyResources && (
          <div className="mb-8">
            <EmergencyResources />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <TherapyChat onEmotionalStateChange={setCurrentMood} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mood Tracker */}
            <MoodTracker currentMood={currentMood} />
            
            {/* Features Card */}
            <Card className="p-6 bg-card shadow-gentle">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                How I Help
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Heart className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Empathetic Listening</h4>
                    <p className="text-xs text-muted-foreground">Non-judgmental support and validation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">CBT Techniques</h4>
                    <p className="text-xs text-muted-foreground">Evidence-based coping strategies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Progress Tracking</h4>
                    <p className="text-xs text-muted-foreground">Monitor your emotional wellbeing over time</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Safety Reminder */}
            <Card className="p-4 bg-primary-soft/20 border-primary/20">
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Remember</h4>
                  <p className="text-xs text-muted-foreground">
                    This AI provides support but cannot replace professional therapy. If you're in crisis, please contact emergency services immediately.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
