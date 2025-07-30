import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Heart, AlertTriangle, Brain, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotionalState?: 'calm' | 'anxious' | 'distressed' | 'crisis';
  therapyMode?: 'supportive' | 'cbt' | 'crisis';
}

interface TherapyChatProps {
  onEmotionalStateChange?: (state: string) => void;
}

const TherapyChat: React.FC<TherapyChatProps> = ({ onEmotionalStateChange }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello, I'm here to listen and support you. How are you feeling today? Please remember that I'm an AI assistant and cannot replace professional therapy or emergency services.",
      sender: 'ai',
      timestamp: new Date(),
      therapyMode: 'supportive'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentEmotionalState, setCurrentEmotionalState] = useState<string>('calm');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectEmotionalState = (text: string): 'calm' | 'anxious' | 'distressed' | 'crisis' => {
    const lowerText = text.toLowerCase();
    
    // Crisis keywords
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'die', 'can\'t go on'];
    if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'crisis';
    }
    
    // Distressed keywords
    const distressedKeywords = ['hopeless', 'worthless', 'desperate', 'overwhelmed', 'can\'t cope', 'breaking down'];
    if (distressedKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'distressed';
    }
    
    // Anxious keywords
    const anxiousKeywords = ['anxious', 'worried', 'scared', 'nervous', 'panic', 'stress'];
    if (anxiousKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'anxious';
    }
    
    return 'calm';
  };

  const generateTherapeuticResponse = (userMessage: string, emotionalState: 'calm' | 'anxious' | 'distressed' | 'crisis'): { content: string; mode: 'supportive' | 'cbt' | 'crisis' } => {
    switch (emotionalState) {
      case 'crisis':
        return {
          content: "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please consider contacting a crisis helpline immediately:\n\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• Emergency Services: 911\n\nI'm here to listen, but please reach out to professional help right away. You matter, and there are people who want to help you through this.",
          mode: 'crisis'
        };
      
      case 'distressed':
        return {
          content: "I can hear that you're going through something really difficult right now. That takes courage to share. Let's take this one step at a time. Can you tell me about one small thing that might help you feel a bit more stable right now? Sometimes when we're overwhelmed, focusing on our breathing or grounding ourselves in the present moment can help.",
          mode: 'cbt'
        };
      
      case 'anxious':
        return {
          content: "Anxiety can feel overwhelming, and I want you to know that what you're experiencing is valid. Let's try a quick grounding technique: Can you name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste? This can help bring you back to the present moment.",
          mode: 'cbt'
        };
      
      default:
        const supportiveResponses = [
          "Thank you for sharing that with me. How does it feel to put those thoughts into words?",
          "I appreciate you opening up. What do you think might be helpful for you right now?",
          "It sounds like you're processing a lot. What's been on your mind most lately?",
          "I'm here to listen. Would you like to explore those feelings a bit more?"
        ];
        return {
          content: supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)],
          mode: 'supportive'
        };
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Detect emotional state
    const emotionalState = detectEmotionalState(inputValue);
    setCurrentEmotionalState(emotionalState);
    onEmotionalStateChange?.(emotionalState);

    // Generate response
    setTimeout(() => {
      const { content, mode } = generateTherapeuticResponse(inputValue, emotionalState);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content,
        sender: 'ai',
        timestamp: new Date(),
        emotionalState,
        therapyMode: mode
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'crisis': return 'bg-destructive text-destructive-foreground';
      case 'distressed': return 'bg-warning text-warning-foreground';
      case 'anxious': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-success text-success-foreground';
    }
  };

  const getModeIcon = (mode?: 'supportive' | 'cbt' | 'crisis') => {
    switch (mode) {
      case 'crisis': return <AlertTriangle className="w-4 h-4" />;
      case 'cbt': return <Brain className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-gradient-therapeutic rounded-xl shadow-warm border">
      {/* Header */}
      <div className="p-4 border-b bg-card rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-calm rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Therapist</h3>
              <p className="text-sm text-muted-foreground">Here to listen and support</p>
            </div>
          </div>
          <Badge className={getStateColor(currentEmotionalState)}>
            {currentEmotionalState}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-therapeutic">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card
              className={`max-w-[80%] p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground shadow-gentle'
                  : 'bg-card shadow-gentle border-primary-soft/20'
              }`}
            >
              {message.sender === 'ai' && message.therapyMode && (
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  {getModeIcon(message.therapyMode)}
                  <span className="capitalize">{message.therapyMode} mode</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              <span className="text-xs opacity-70 mt-2 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className="bg-card shadow-gentle border-primary-soft/20 p-3">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-muted-foreground">Thinking...</span>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-card rounded-b-xl">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Share what's on your mind..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 shadow-gentle"
          />
          <Button 
            onClick={handleSendMessage} 
            variant="therapeutic"
            size="icon"
            disabled={!inputValue.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapyChat;