import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Heart, AlertTriangle, Smile, Frown } from 'lucide-react';

interface MoodData {
  date: string;
  mood: 'crisis' | 'distressed' | 'anxious' | 'calm' | 'positive';
  score: number;
}

interface MoodTrackerProps {
  currentMood: string;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ currentMood }) => {
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);
  const [weeklyAverage, setWeeklyAverage] = useState(0);

  useEffect(() => {
    // Simulate mood history data
    const today = new Date();
    const mockData: MoodData[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const moods = ['crisis', 'distressed', 'anxious', 'calm', 'positive'] as const;
      const scores = [1, 2, 3, 4, 5];
      const randomIndex = Math.floor(Math.random() * moods.length);
      
      mockData.push({
        date: date.toISOString().split('T')[0],
        mood: moods[randomIndex],
        score: scores[randomIndex]
      });
    }
    
    setMoodHistory(mockData);
    setWeeklyAverage(mockData.reduce((acc, day) => acc + day.score, 0) / mockData.length);
  }, []);

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'crisis': return 'bg-destructive';
      case 'distressed': return 'bg-warning';
      case 'anxious': return 'bg-secondary';
      case 'calm': return 'bg-primary';
      case 'positive': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'crisis': return <AlertTriangle className="w-4 h-4" />;
      case 'distressed': return <Frown className="w-4 h-4" />;
      case 'anxious': return <Heart className="w-4 h-4" />;
      case 'calm': return <Heart className="w-4 h-4" />;
      case 'positive': return <Smile className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const getCurrentMoodScore = () => {
    switch (currentMood) {
      case 'crisis': return 1;
      case 'distressed': return 2;
      case 'anxious': return 3;
      case 'calm': return 4;
      case 'positive': return 5;
      default: return 4;
    }
  };

  return (
    <Card className="p-6 bg-card shadow-gentle">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Mood Tracking</h3>
      </div>

      {/* Current Mood */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Current Mood</span>
          <div className="flex items-center gap-2">
            {getMoodIcon(currentMood)}
            <span className="text-sm capitalize text-foreground">{currentMood}</span>
          </div>
        </div>
        <Progress 
          value={getCurrentMoodScore() * 20} 
          className="h-2"
        />
      </div>

      {/* Weekly Average */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Weekly Average</span>
          <span className="text-sm text-muted-foreground">{weeklyAverage.toFixed(1)}/5.0</span>
        </div>
        <Progress 
          value={weeklyAverage * 20} 
          className="h-2"
        />
      </div>

      {/* Mood History */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Past 7 Days</h4>
        <div className="grid grid-cols-7 gap-2">
          {moodHistory.map((day, index) => (
            <div key={index} className="text-center">
              <div 
                className={`w-8 h-8 rounded-full ${getMoodColor(day.mood)} flex items-center justify-center mb-1 mx-auto`}
              >
                <div className="text-white text-xs font-bold">{day.score}</div>
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-primary-soft/20 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-2">Weekly Insight</h4>
        <p className="text-xs text-muted-foreground">
          {weeklyAverage >= 4 
            ? "You've been maintaining good emotional balance this week. Keep up the positive momentum!"
            : weeklyAverage >= 3
            ? "Your mood has been variable this week. Consider what factors might be affecting your wellbeing."
            : "This week seems challenging. Remember that reaching out for support is a sign of strength."
          }
        </p>
      </div>
    </Card>
  );
};

export default MoodTracker;