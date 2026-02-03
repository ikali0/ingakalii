/**
 * Contact Section Component
 *
 * A retro Windows-styled contact section with:
 * - Contact form with EdgeJS integration
 * - Services list
 */
import ContactForm from "./ContactForm";

const Contact = () => {
  const services = [
    "Full-stack web development",
    "AI/ML integration & consulting",
    "Technical architecture & code review",
    "UI/UX design implementation",
  ];

  return (
    <section
      id="contact"
      className="py-section-sm md:py-section px-4 pb-section bg-background"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-container md:mb-container-lg">
          <p className="text-overline uppercase text-accent font-semibold mb-element-sm">
            Get In Touch
          </p>
          <p className="text-body text-muted-foreground max-w-xl mx-auto leading-relaxed">
            I'm currently open to freelance projects and full-time opportunities.
            Let's talk about how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-container-lg">
          {/* Contact Form Window */}
          <div className="retro-window">
            <div className="retro-title-bar">
              <span className="font-bold text-body-sm">Send a Message</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-secondary" />
                <div className="w-3 h-3 rounded-sm bg-accent" />
              </div>
            </div>
            <div className="p-card bg-card">
              <ContactForm />
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-container">
            {/* Services Window */}
            <div className="retro-window">
              <div className="retro-title-bar">
                <span className="font-bold text-body-sm">What I Can Help With</span>
              </div>
              <div className="p-card bg-card">
                <ul className="space-y-element">
                  {services.map((service, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-element text-foreground"
                    >
                      <span className="text-accent font-medium">→</span>
                      <span className="text-body-sm">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
