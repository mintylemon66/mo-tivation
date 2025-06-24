
import React, { useState, useEffect } from 'react';
import { Quote, Heart, Shuffle, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const motivationalQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "success" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "leadership" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown", category: "mindset" },
  { text: "Great things never come from comfort zones.", author: "Unknown", category: "growth" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown", category: "achievement" },
  { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown", category: "success" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown", category: "perseverance" },
  { text: "Dream bigger. Do bigger.", author: "Unknown", category: "ambition" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown", category: "perseverance" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown", category: "daily" },
  { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery", category: "growth" },
  { text: "Little things make big days.", author: "Unknown", category: "daily" },
  { text: "It's going to be hard, but hard does not mean impossible.", author: "Unknown", category: "resilience" },
  { text: "Don't wait for opportunity. Create it.", author: "Unknown", category: "action" },
  { text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.", author: "Unknown", category: "strength" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "dreams" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "resilience" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "action" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "opportunity" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "confidence" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "action" },
  { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt", category: "life" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
  { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa", category: "love" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt", category: "perseverance" },
  { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead", category: "individuality" },
  { text: "Don't judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson", category: "growth" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "action" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", category: "authenticity" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", category: "authenticity" },
  { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein", category: "wisdom" },
  { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero", category: "knowledge" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West", category: "life" },
  { text: "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.", author: "J.K. Rowling", category: "character" },
  { text: "Friendship is the only cement that will ever hold the world together.", author: "Woodrow Wilson", category: "friendship" },
  { text: "The only way out of the labyrinth of suffering is to forgive.", author: "John Green", category: "forgiveness" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien", category: "journey" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "persistence" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", category: "courage" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "courage" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson", category: "self-development" }
];

const Index = () => {
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const getNewQuote = (category?: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      const filteredQuotes = category 
        ? motivationalQuotes.filter(q => q.category === category)
        : motivationalQuotes;
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      setCurrentQuote(filteredQuotes[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  const toggleFavorite = () => {
    const quoteText = currentQuote.text;
    setFavorites(prev => 
      prev.includes(quoteText) 
        ? prev.filter(fav => fav !== quoteText)
        : [...prev, quoteText]
    );
  };

  const getRandomCategory = () => {
    const categories = ['success', 'growth', 'resilience', 'action', 'dreams', 'courage'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    getNewQuote(randomCategory);
  };

  useEffect(() => {
    // Auto-change quote every 45 seconds
    const interval = setInterval(() => {
      getNewQuote();
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle system
  useEffect(() => {
    const createParticle = () => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 6 + 2,
        opacity: Math.random() * 0.7 + 0.3
      };
      
      setParticles(prev => [...prev.slice(-20), newParticle]);
    };

    const particleInterval = setInterval(createParticle, 2000);
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Multi-layered Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-rose-50 to-cyan-100 animate-gradient-shift"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-purple-200/40 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-pink-100/50 via-transparent to-blue-100/50 animate-gradient-shift" style={{ animationDelay: '2s' }}></div>
      
      {/* Interactive Mouse Follow Effect */}
      <div 
        className="absolute w-96 h-96 bg-gradient-radial from-purple-300/20 to-transparent rounded-full pointer-events-none transition-all duration-1000 ease-out"
        style={{ 
          left: mousePosition.x - 192, 
          top: mousePosition.y - 192,
          transform: 'translate3d(0, 0, 0)'
        }}
      ></div>

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDuration: `${Math.random() * 10 + 8}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        ></div>
      ))}
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-gradient-shift">
            Inspire
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light mb-4">
            Your daily dose of motivation
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-purple-500">
            <Sparkles className="w-4 h-4" />
            <span>{motivationalQuotes.length} inspiring quotes</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Quote Card */}
        <Card className={`max-w-4xl mx-auto p-8 md:p-12 backdrop-blur-xl bg-white/60 border-white/30 shadow-2xl transition-all duration-700 hover:shadow-3xl hover:scale-105 hover:bg-white/70 ${isAnimating ? 'opacity-0 transform scale-95 rotate-1' : 'opacity-100 transform scale-100 rotate-0'}`}>
          <div className="text-center">
            <Quote className="w-12 h-12 text-purple-400 mx-auto mb-6 animate-pulse" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-700 leading-relaxed mb-8 transition-all duration-500">
              "{currentQuote.text}"
            </blockquote>
            <div className="flex items-center justify-center gap-4 mb-6">
              <p className="text-lg md:text-xl text-purple-600 font-medium">
                — {currentQuote.author}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFavorite}
                className={`hover:scale-110 transition-all duration-200 ${
                  favorites.includes(currentQuote.text) 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${favorites.includes(currentQuote.text) ? 'fill-current' : ''}`} />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {currentQuote.category}
              </span>
              {favorites.includes(currentQuote.text) && (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Favorite
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center animate-fade-in">
          <Button 
            onClick={() => getNewQuote()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <Shuffle className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            New Inspiration
          </Button>
          
          <Button 
            onClick={getRandomCategory}
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50 px-6 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/50"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Random Category
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8 text-center animate-fade-in">
          <p className="text-sm text-gray-500">
            {favorites.length > 0 && `${favorites.length} quotes saved to favorites • `}
            Refreshes automatically every 45 seconds
          </p>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="fixed top-16 left-8 w-24 h-24 bg-gradient-to-br from-violet-300 to-purple-300 rounded-full opacity-70 animate-float blur-sm"></div>
        <div className="fixed bottom-16 right-8 w-20 h-20 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full opacity-70 animate-float-delayed blur-sm"></div>
        <div className="fixed top-1/3 left-16 w-16 h-16 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full opacity-60 animate-float-slow blur-sm"></div>
        <div className="fixed bottom-1/3 right-20 w-14 h-14 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-60 animate-float blur-sm"></div>
        <div className="fixed top-2/3 left-1/4 w-18 h-18 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full opacity-50 animate-float-delayed blur-sm"></div>
        <div className="fixed bottom-2/3 right-1/4 w-12 h-12 bg-gradient-to-br from-indigo-300 to-blue-300 rounded-full opacity-50 animate-float-slow blur-sm"></div>
      </div>
    </div>
  );
};

export default Index;
