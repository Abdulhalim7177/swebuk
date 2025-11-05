"use client";

import { useState, useEffect } from 'react';
import { Users, Code, Calendar, BookOpen, TrendingUp, Award } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Active Students",
    description: "From all academic levels",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Code,
    value: "50+",
    label: "Live Projects",
    description: "Collaborative development",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Calendar,
    value: "20+",
    label: "Monthly Events",
    description: "Workshops & meetups",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: BookOpen,
    value: "100+",
    label: "Blog Articles",
    description: "Student & staff contributions",
    gradient: "from-green-500 to-teal-500"
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Success Rate",
    description: "FYP completion rate",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: Award,
    value: "15+",
    label: "Tech Clusters",
    description: "Specialized communities",
    gradient: "from-yellow-500 to-orange-500"
  }
];

export function StatsSection() {
  const [mounted, setMounted] = useState(false);
  const [visibleStats, setVisibleStats] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleStats(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-stat-index]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Impact in Numbers
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our growing community is making a real difference in software engineering education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              data-stat-index={index}
              className={`text-center transition-all duration-1000 ${
                visibleStats.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {stat.label}
                </h3>
                <p className="text-gray-400 text-sm">
                  {stat.description}
                </p>
              </div>

              {/* Progress bar animation */}
              <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1500 delay-300 ${
                    visibleStats.includes(index) ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional impact statement */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:from-white/15 hover:to-white/10 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">
              Building the Future of Tech Education
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              SWEBUK is more than just a platform—it's a movement to transform software engineering education through
              collaboration, innovation, and community-driven learning. Join us in shaping the next generation of tech leaders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}