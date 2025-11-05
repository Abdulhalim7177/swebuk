"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Code, Calendar, BookOpen, Trophy, Zap } from 'lucide-react';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900" />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Animated badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
          <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30 transition-all duration-300 animate-pulse-slow">
            <Users className="w-3 h-3 mr-1" />
            500+ Students
          </Badge>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30 transition-all duration-300 animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
            <Code className="w-3 h-3 mr-1" />
            50+ Projects
          </Badge>
          <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 border-pink-500/30 hover:bg-pink-500/30 transition-all duration-300 animate-pulse-slow" style={{ animationDelay: '1s' }}>
            <Calendar className="w-3 h-3 mr-1" />
            20+ Events
          </Badge>
        </div>

        {/* Main heading */}
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          SWEBUK
        </h1>

        <h2 className={`text-2xl md:text-3xl font-semibold mb-4 text-gray-300 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Software Engineering Student Community
        </h2>

        <p className={`text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Connect, collaborate, and innovate with fellow software engineering students.
          Join clusters, work on projects, attend events, and build your portfolio in our vibrant tech ecosystem.
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 text-lg group">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg">
            Explore Features
          </Button>
        </div>

        {/* Feature highlights */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
            <div className="bg-indigo-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Join Clusters</h3>
            <p className="text-gray-400 text-sm">Connect with like-minded students in specialized tech clusters</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
            <div className="bg-purple-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <Code className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Build Projects</h3>
            <p className="text-gray-400 text-sm">Collaborate on real projects and build your portfolio</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
            <div className="bg-pink-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <Trophy className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">FYP Management</h3>
            <p className="text-gray-400 text-sm">Complete your final year project with expert guidance</p>
          </div>
        </div>
      </div>
    </section>
  );
}