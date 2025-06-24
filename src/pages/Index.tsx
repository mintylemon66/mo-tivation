
import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const motivationalQuotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown"
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Unknown"
  },
  {
    text: "Dream it. Wish it. Do it.",
    author: "Unknown"
  },
  {
    text: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown"
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown"
  },
  {
    text: "Dream bigger. Do bigger.",
    author: "Unknown"
  },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown"
  },
  {
    text: "Wake up with determination. Go to bed with satisfaction.",
    author: "Unknown"
  },
  {
    text: "Do something today that your future self will thank you for.",
    author: "Sean Patrick Flanery"
  },
  {
    text: "Little things make big days.",
    author: "Unknown"
  },
  {
    text: "It's going to be hard, but hard does not mean impossible.",
    author: "Unknown"
  },
  {
    text: "Don't wait for opportunity. Create it.",
    author: "Unknown"
  },
  {
    text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    author: "Unknown"
  }
];

const Index = () => {
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    // Auto-change quote every 30 seconds
    const interval = setInterval(() => {
      getNewQuote();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 animate-gradient-shift"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-purple-200/30 animate-pulse-slow"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Inspire
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            Your daily dose of motivation
          </p>
        </div>

        {/* Quote Card */}
        <Card className={`max-w-4xl mx-auto p-8 md:p-12 backdrop-blur-sm bg-white/70 border-white/20 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
          <div className="text-center">
            <Quote className="w-12 h-12 text-purple-400 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-700 leading-relaxed mb-8">
              "{currentQuote.text}"
            </blockquote>
            <p className="text-lg md:text-xl text-purple-600 font-medium">
              — {currentQuote.author}
            </p>
          </div>
        </Card>

        {/* Action Button */}
        <div className="mt-12 animate-fade-in">
          <Button 
            onClick={getNewQuote}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            New Inspiration
          </Button>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-60 animate-float"></div>
        <div className="fixed bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full opacity-60 animate-float-delayed"></div>
        <div className="fixed top-1/2 left-20 w-12 h-12 bg-gradient-to-br from-pink-300 to-blue-300 rounded-full opacity-50 animate-float-slow"></div>
      </div>
    </div>
  );
};

export default Index;
