/**
 * ContactSection Component
 * Footer with contact links and availability status
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, Sparkles } from "lucide-react";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactLinks = [
    {
      icon: Mail,
      label: "hello@inga.dev",
      href: "mailto:hello@inga.dev",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/ingakaltak",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com",
    },
  ];

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-foreground text-background py-section px-container"
    >
      <div className="text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-display-lg md:text-display-xl font-display font-bold tracking-tight"
        >
          SAY HELLO<span className="text-primary">.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8"
        >
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="group flex flex-col items-center gap-3 hover:text-primary transition-colors duration-300"
            >
              <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-foreground transition-all duration-300">
                <link.icon className="w-6 h-6" />
              </div>
              <span className="text-body-sm tracking-wide">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-background/20"
        >
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-body-sm font-medium">Available for Collaboration</span>
          </div>
          <p className="text-caption text-background/60">
            Handcrafted with focus • {new Date().getFullYear()} Inga
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default ContactSection;
