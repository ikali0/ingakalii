import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";

import Portfolio from "@/components/Portfolio";
import Experience from "@/components/Experience";
import AIEthicsBlog from "@/components/AIEthicsBlog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RetroTaskbar from "@/components/ui/retro-taskbar";
import { Waves } from "@/components/ui/wave-background";

const Index = () => {
  return (
    <div className="min-h-screen bg-background crt-screen crt-flicker crt-rgb-shift">
      {/* Wave Background layers - fixed behind all content */}
      <Waves 
        strokeColor="hsl(var(--accent) / 0.25)" 
        backgroundColor="transparent"
        className="opacity-80 dark:opacity-100"
      />
      <Waves 
        strokeColor="hsl(var(--secondary) / 0.18)" 
        backgroundColor="transparent"
        className="opacity-70 dark:opacity-90"
      />
      
      {/* CRT Scanlines Overlay */}
      <div className="crt-scanlines" aria-hidden="true" />
      
      <Navbar />
      {/* Main content with bottom padding for fixed taskbar */}
      <main className="crt-phosphor pb-10 sm:pb-11">
        <Hero />
        <About />
        <Services />
        
        <Portfolio />
        <Experience />
        <AIEthicsBlog />
        <Contact />
      </main>
      <Footer />
      
      {/* Retro Windows-style Taskbar */}
      <RetroTaskbar />
    </div>
  );
};

export default Index;
