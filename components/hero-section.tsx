"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import logo from "@/public/Copilot_20250910_131844-modified.png"
import {motion} from "framer-motion"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background pt-5">
      <motion.div initial={{y:20, opacity:0}} animate={{opacity:1, y:0}} transition={{duration:0.2}} className="absolute top-5 left-5 h-20 w-20"><img src={logo.src} className="h-full w-full rounded-full " /></motion.div>
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
          }}
        />

        {/* Enhanced floating blobs with better positioning */}
        <div
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-primary/15 to-accent/10 rounded-full blur-3xl transition-all duration-1000 ease-out animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02 - scrollY * 0.5}px) rotate(${mousePosition.x * 0.01}deg)`,
            left: "5%",
            top: "10%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] bg-gradient-to-l from-chart-2/15 to-primary/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015 - scrollY * 0.3}px) rotate(${mousePosition.x * -0.01}deg)`,
            right: "10%",
            bottom: "15%",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] bg-gradient-to-br from-accent/20 to-chart-1/10 rounded-full blur-3xl transition-all duration-1000 ease-out animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01 - scrollY * 0.4}px)`,
            left: "55%",
            top: "50%",
            animationDelay: "1s",
          }}
        />

        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            AI-Powered Traffic Intelligence
          </div>

          <h1 className="text-7xl md:text-9xl font-black text-balance mb-6 bg-gradient-to-r from-foreground via-primary via-accent to-foreground bg-clip-text text-transparent leading-none tracking-tight">
            RUSHSLAYER
          </h1>

          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-primary"></div>
            <div className="w-8 h-0.5 bg-primary mx-2"></div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-8 bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent">
            Reduce Congestion. Rescue Seconds.
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed font-light">
            Revolutionary AI-powered traffic management platform that transforms urban mobility through intelligent
            signal optimization, emergency vehicle prioritization, and citizen-driven insights.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          <Button
            asChild
            size="lg"
            className="text-lg px-10 py-7 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/feedback">
              Customer Feedback
              <span className="ml-2">→</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-10 py-7 rounded-full bg-background/50 backdrop-blur-sm border-2 hover:bg-background/80 transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/admin">
              Admin Dashboard
              <span className="ml-2">⚡</span>
            </Link>
          </Button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-border/50">
            <div className="group text-center p-6 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl md:text-5xl font-black text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                40%
              </div>
              <div className="text-muted-foreground font-medium">Congestion Reduction</div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl md:text-5xl font-black text-accent mb-3 group-hover:scale-110 transition-transform duration-300">
                60s
              </div>
              <div className="text-muted-foreground font-medium">Average Time Saved</div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/50 hover:border-chart-2/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl md:text-5xl font-black text-chart-2 mb-3 group-hover:scale-110 transition-transform duration-300">
                25%
              </div>
              <div className="text-muted-foreground font-medium">Emission Reduction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
