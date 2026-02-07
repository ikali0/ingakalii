import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faRobot, faLightbulb, faPalette } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "./ContactForm";
import { ScrollFade } from "./ui/scroll-fade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const Contact = () => {
  const services = [
    { text: "Full-stack web development", icon: faCode },
    { text: "AI/ML integration", icon: faRobot },
    { text: "Technical architecture", icon: faLightbulb },
    { text: "UI/UX implementation", icon: faPalette },
  ];

  const faqs = [
    {
      id: "1",
      title: "What's your typical response time?",
      content: "I aim to respond within 24–48 hours on weekdays. For urgent inquiries, please indicate so in your message.",
    },
    {
      id: "2",
      title: "Do you take on freelance projects?",
      content: "Yes, I'm open to consulting, short-term contracts, and collaborative research projects in AI ethics and development.",
    },
    {
      id: "3",
      title: "How do we start working together?",
      content: "Send a brief message outlining your project scope. I'll follow up with availability and next steps.",
    },
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-20 px-4 bg-background">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <ScrollFade>
          <div className="mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-accent text-xl animate-spin" style={{ animationDuration: '3s' }}>✱</span>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Contact
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground text-center leading-tight">
              Get In Touch
            </h2>
          </div>
        </ScrollFade>

        {/* Layout */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Form Panel */}
          <ScrollFade>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-xl border border-border/30 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl shadow-sm p-4"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-20 pointer-events-none" />
              <div className="relative">
                <h3 className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                  Send a Message
                </h3>
                <ContactForm />
              </div>
            </motion.div>
          </ScrollFade>

          {/* Right Column: Services + FAQ */}
          <ScrollFade>
            <div className="space-y-4">
              {/* Services Panel */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-xl border border-border/30 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl shadow-sm p-4"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-20 pointer-events-none" />
                <div className="relative">
                  <h3 className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                    Focus Areas
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {services.map((service, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={service.icon} className="text-primary w-3 h-3" />
                        <span className="text-xs text-muted-foreground">{service.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* FAQ Panel */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-xl border border-border/30 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl shadow-sm p-4"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-20 pointer-events-none" />
                <div className="relative">
                  <h3 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
                    FAQ
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                      <AccordionItem value={faq.id} key={faq.id} className="border-border/40">
                        <AccordionTrigger className="py-2 text-xs hover:no-underline text-foreground/90">
                          {faq.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground pb-2">
                          {faq.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            </div>
          </ScrollFade>
        </div>
      </div>
    </section>
  );
};

export default Contact;