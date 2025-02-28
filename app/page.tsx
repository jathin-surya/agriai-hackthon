"use client"
import Link from "next/link"
import { Particles } from "./components/particles"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Particle Effect Background */}
      <div className="header relative">
        <div className="absolute inset-0 z-0" id="ParticlesHeader">
          <Particles />
        </div>

        <header className="relative z-10 py-6 bg-gradient-to-r from-[#4CAF50] to-[#81C784] text-white">
          <h1 className="text-4xl font-bold">AGRI GUARD AI</h1>
        </header>

        <nav className="navbar relative z-10 py-4 bg-gradient-to-r from-[#4CAF50] to-[#81C784]">
          <Link href="/" className="mx-4 text-white font-semibold hover:text-[#ffeb3b] transition-colors">
            Home
          </Link>
          <Link href="/weather" className="mx-4 text-white font-semibold hover:text-[#ffeb3b] transition-colors">
            Weather
          </Link>
          <Link href="/about" className="mx-4 text-white font-semibold hover:text-[#ffeb3b] transition-colors">
            About
          </Link>
          <Link href="/contact" className="mx-4 text-white font-semibold hover:text-[#ffeb3b] transition-colors">
            Contact
          </Link>
        </nav>
      </div>

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8">Smart Agriculture Solutions</h2>

          <div className="flex justify-center gap-6 flex-wrap">
            <Link
              href="/weather"
              className="button bg-gradient-to-r from-[#007BFF] to-[#00BFFF] hover:from-[#0056b3] hover:to-[#0099cc] transform hover:scale-105 transition-all"
            >
              Weather Forecast
            </Link>
            <Link
              href="/soil"
              className="button bg-gradient-to-r from-[#007BFF] to-[#00BFFF] hover:from-[#0056b3] hover:to-[#0099cc] transform hover:scale-105 transition-all"
            >
              Soil Analysis
            </Link>
            <Link
              href="/crops"
              className="button bg-gradient-to-r from-[#007BFF] to-[#00BFFF] hover:from-[#0056b3] hover:to-[#0099cc] transform hover:scale-105 transition-all"
            >
              Crop Recommendations
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-[#333] text-white py-4">
        <div className="container mx-auto px-4">
          <p>© 2025 AGRI GUARD AI - Smart Agriculture Solutions</p>
        </div>
      </footer>
    </div>
  )
}

