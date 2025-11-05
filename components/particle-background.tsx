"use client";

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  pulsePhase: number;
  trail: { x: number; y: number }[];
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if theme is dark
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize particles with enhanced properties
    const particleCount = 150;
    const particles: Particle[] = [];
    const colors = isDark
      ? ['#6366f1', '#8b5cf6', '#ec4899', '#3b82f6', '#06b6d4']
      : ['#4f46e5', '#7c3aed', '#db2777', '#2563eb', '#0891b2'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        trail: []
      });
    }

    particlesRef.current = particles;

    const animate = () => {
      // Create trail effect
      ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.1)' : 'rgba(248, 250, 252, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction - particles are attracted to mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.02;
          particle.vx += dx * force;
          particle.vy += dy * force;
        }

        // Apply some friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Bounce off walls
        if (particle.x < particle.radius || particle.x > canvas.width - particle.radius) {
          particle.vx *= -0.9;
          particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        }
        if (particle.y < particle.radius || particle.y > canvas.height - particle.radius) {
          particle.vy *= -0.9;
          particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
        }

        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 10) {
          particle.trail.shift();
        }

        // Update pulse
        particle.pulsePhase += 0.05;
        const pulseFactor = 1 + Math.sin(particle.pulsePhase) * 0.2;

        // Draw trail
        particle.trail.forEach((point, i) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, (i / particle.trail.length) * particle.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + Math.floor((i / particle.trail.length) * 50).toString(16);
          ctx.fill();
        });

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * pulseFactor * 3
        );
        gradient.addColorStop(0, particle.color + 'ff');
        gradient.addColorStop(0.5, particle.color + '40');
        gradient.addColorStop(1, particle.color + '00');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * pulseFactor * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16);
        ctx.fill();

        // Draw connections with enhanced visibility
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.6;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color + Math.floor(opacity * 255).toString(16);
            ctx.lineWidth = 2 * (1 - distance / 200);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
