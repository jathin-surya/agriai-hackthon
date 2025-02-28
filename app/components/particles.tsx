"use client"

import { useEffect, useRef } from "react"

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle configuration
    const particleConfig = {
      number: 50,
      color: "#ffffff",
      size: 3,
      opacity: 0.5,
      speed: 0.5,
    }

    // Create particles
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
    }[] = []

    for (let i = 0; i < particleConfig.number; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * particleConfig.size + 1,
        speedX: (Math.random() - 0.5) * particleConfig.speed,
        speedY: (Math.random() - 0.5) * particleConfig.speed,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${particleConfig.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Handle mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      particles.forEach((particle) => {
        // Calculate distance between mouse and particle
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          // Repel particle from mouse
          const angle = Math.atan2(dy, dx)
          const force = (100 - distance) / 100

          particle.speedX -= Math.cos(angle) * force * 0.5
          particle.speedY -= Math.sin(angle) * force * 0.5
        }
      })
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // Handle click to add particles
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Add 5 new particles at click position
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: x,
          y: y,
          size: Math.random() * particleConfig.size + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
        })
      }
    }

    canvas.addEventListener("click", handleClick)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

