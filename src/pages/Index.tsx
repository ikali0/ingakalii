import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Experience from "@/components/Experience";
import AIEthicsBlog from "@/components/AIEthicsBlog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RetroTaskbar from "@/components/ui/retro-taskbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background crt-screen crt-flicker crt-rgb-shift">
      {/* CRT Scanlines Overlay */}
      <div className="crt-scanlines" aria-hidden="true" />
      
      <Navbar />
      {/* Main content with bottom padding for fixed taskbar */}
      <main className="crt-phosphor pb-14">
        <Hero />
        <About />
        <Skills />
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
