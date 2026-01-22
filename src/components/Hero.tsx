import { ArrowDown, Linkedin, Mail } from "lucide-react";
import EntropyBackground from "./ui/entropy-background";
import { CartoonButton } from "./ui/cartoon-button";
const Hero = () => {
  return <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden px-6 py-12 sm:py-20">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <EntropyBackground />
      </div>
      
      {/* Readability Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/20 via-transparent to-background/90 pointer-events-none" />
      
      <div className="container relative z-20 mx-auto max-w-5xl flex flex-col items-center md:items-start text-center md:text-left">
        
        {/* Badge */}
        <div className="animate-fade-up opacity-0">
          <span className="inline-block py-1.5 mb-6 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase bg-fuchsia-300 text-fuchsia-950 rounded-full shadow-sm px-[12px]">
            Applied AI Engineer & Independent Consultant
          </span>
        </div>

        {/* Name */}
        <h1 className="animate-fade-up opacity-0 [animation-delay:200ms] sm:text-7xl lg:text-9xl font-bold tracking-tight text-foreground mb-6 leading-[0.85] font-mono text-7xl">
          Inga K.
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up opacity-0 [animation-delay:400ms] sm:text-xl md:text-2xl font-light mb-10 max-w-2xl leading-relaxed text-balance text-xl text-slate-800">
          I translate{" "}
          <span className="relative inline-block">
            <span className="relative z-10 font-semibold text-foreground italic">
              policy into deployable controls
            </span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-fuchsia-400/20 -z-10" />
          </span>{" "}
          and build AI systems that hold up under compliance, security, and real-world pressure.
        </p>

        {/* Social Actions */}
        <div className="animate-fade-up opacity-0 [animation-delay:600ms] md:justify-start mb-12 flex items-start justify-center gap-[10px]">
          <a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-[#0077b5] hover:bg-[#005c8d] text-white transition-all hover:scale-110 active:scale-95 shadow-md rounded-sm" aria-label="LinkedIn Profile">
            <Linkedin className="w-5 h-5 fill-current" />
          </a>
          <a href="mailto:altruisticxai@gmail.com" className="flex items-center justify-center w-12 h-12 text-white transition-all hover:scale-110 active:scale-95 shadow-md rounded-sm bg-border" aria-label="Send Email">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* CTA Buttons: Corrected Grid Implementation */}
        <div className="animate-fade-up opacity-0 [animation-delay:800ms] grid-cols-2 xsm:flex sm:flex-wrap md:justify-start min-w-full max-w-sm sm:max-w-none flex items-start justify-center gap-[10px]">
          <CartoonButton label="Experience" href="#experience" className="w-full sm:w-auto" />
          <CartoonButton label="Portfolio" href="#portfolio" className="w-full sm:w-auto" />
          <CartoonButton label="About" href="#about" className="w-full sm:w-auto" />
          <CartoonButton label="Contact" href="#contact" className="w-full sm:w-auto" />
        </div>

        {/* Floating Scroll Indicator */}
        <div className="animate-fade-up opacity-0 [animation-delay:1000ms] mt-20 md:mt-16 flex justify-center md:justify-start w-full">
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-all group">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-popover-foreground">Explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce text-fuchsia-500" />
          </a>
        </div>
      </div>
    </section>;
};
export default Hero;