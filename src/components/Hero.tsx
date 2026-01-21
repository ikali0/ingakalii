import { ArrowDown, Linkedin, Mail } from "lucide-react";
import EntropyBackground from "./ui/entropy-background";
import { CartoonButton } from "./ui/cartoon-button";
const Hero = () => {
  return <section className="relative min-h-[100svh] sm:min-h-[90svh] flex items-center justify-center pt-20 sm:pt-16 pb-16 sm:pb-12 px-5 sm:px-6 overflow-hidden">
      {/* Enhanced Entropy Particle Background */}
      <EntropyBackground className="z-0" />
      
      {/* Gradient overlay for text readability - mobile optimized */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background/70 z-10 pointer-events-none" />
      
      {/* Mobile-first container */}
      <div className="container mx-auto max-w-3xl relative z-20 text-center sm:text-left">
        <div className="animate-fade-up opacity-0">
          <p className="inline-block text-xs uppercase tracking-widest mb-4 sm:mb-3 text-slate-800 bg-fuchsia-300 py-1 rounded-sm px-[4px] text-center sm:text-xs">​Applied AI Engineer & Independent Consultant </p>
        </div>

        <h1 className="animate-fade-up opacity-0 delay-100 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-5 sm:mb-4 text-balance leading-tight">
          Inga K. 
        </h1>

        <p className="animate-fade-up opacity-0 delay-200 text-base sm:text-lg md:text-xl font-light mb-8 sm:mb-6 max-w-xl mx-auto sm:mx-0 leading-relaxed text-slate-950">
          I translate{" "}
          <span className="highlight-text text-foreground font-medium">
            policy into deployable controls
          </span>{" "}
          and build AI systems that hold up under compliance, security, and real-world pressure.
        </p>

        {/* Social links - centered on mobile */}
        <div className="animate-fade-up opacity-0 delay-300 mb-8 sm:mb-6 sm:justify-start flex items-start justify-center gap-[12px] border border-fuchsia-400 border-solid">
          <a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-2 border border-border text-muted-foreground hover:text-foreground hover:border-accent hover:scale-110 transition-all duration-200 bg-fuchsia-700 rounded-sm">
            <Linkedin className="w-5 h-5 sm:w-4 sm:h-4 text-slate-50" />
          </a>
          <a href="mailto:altruisticxai@gmail.com" className="p-3 sm:p-2 border border-border text-muted-foreground hover:text-foreground hover:border-accent hover:scale-110 transition-all duration-200 bg-orange-400 rounded-sm">
            <Mail className="w-5 h-5 sm:w-4 sm:h-4 text-slate-50" />
          </a>
        </div>

        {/* Buttons - mobile-first grid layout */}
        <div className="animate-fade-up opacity-0 delay-400 grid-cols-2 sm:flex sm:flex-wrap sm:gap-2 max-w-xs sm:max-w-none mx-auto sm:mx-0 items-start justify-center gap-[11px] flex flex-row bg-transparent">
          <CartoonButton label="Experience" href="#experience" size="lg" />
          <CartoonButton label="Portfolio" href="#portfolio" size="lg" />
          <CartoonButton label="About" href="#about" size="lg" />
          <CartoonButton label="Contact" href="#contact" size="lg" />
        </div>

        <div className="animate-fade-up opacity-0 delay-500 mt-16 sm:mt-12 flex justify-center">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors p-2">
            <ArrowDown className="w-5 h-5 sm:w-4 sm:h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>;
};
export default Hero;