/**
 * Contact Section Component
 * 
 * A retro Windows-styled contact section with:
 * - Contact form with EmailJS integration
 * - Social links and quick contact options
 * - Services list
 */
import { Mail, Linkedin, Download, ExternalLink } from "lucide-react";
import ContactForm from "./ContactForm";
const Contact = () => {
  const services = ["Full-stack web development", "AI/ML integration & consulting", "Technical architecture & code review", "UI/UX design implementation"];
  return <section id="contact" className="py-24 px-4 pb-32 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-widest text-accent font-medium mb-3 text-center">
          Get In Touch
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-6 text-center">
          Let's Build Something Great
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto text-center">
          I'm currently open to freelance projects and full-time opportunities.
          Let's talk about how I can help bring your ideas to life.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form Window */}
          <div className="retro-window">
            <div className="retro-title-bar">
              <span className="font-bold text-sm">Send a Message</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-secondary" />
                <div className="w-3 h-3 rounded-sm bg-accent" />
              </div>
            </div>
            <div className="p-4 px-[12px] py-[12px]">
              <ContactForm />
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Services Window */}
            <div className="retro-window">
              <div className="retro-title-bar">
                <span className="font-bold text-sm">What I Can Help With</span>
              </div>
              <div className="p-4 px-[11px] py-px">
                <ul className="space-y-2">
                  {services.map((service, index) => <li key={index} className="flex items-start gap-3 text-foreground">
                      <span className="text-accent font-medium">→</span>
                      <span className="text-sm">{service}</span>
                    </li>)}
                </ul>
              </div>
            </div>

            {/* Quick Links Window */}
            <div className="retro-window">
              <div className="retro-title-bar">
                <span className="font-bold text-sm">Quick Links</span>
              </div>
              <div className="p-4 space-y-3 py-[11px] px-[11px]">
                <a href="mailto:altruisticxai@gmail.com" className="retro-link-button">
                  <Mail className="w-4 h-4" />
                  <span>altruisticxai@gmail.com</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                </a>
                <a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="retro-link-button">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                </a>
                <a href="#" className="retro-link-button">
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;