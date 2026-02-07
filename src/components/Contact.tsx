/**
 * Contact Section Component
 *
 * A retro Windows-styled contact section with glassmorphism, scroll animations, and abstract shapes.
 */
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faRobot, faLightbulb, faPalette } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "./ContactForm";
import { ScrollFade, StaggerContainer, StaggerItem } from "./ui/scroll-fade";
import { BlobShape, CircleShape, SparkleShape, ParallaxShape } from "./ui/abstract-shapes";
const Contact = () => {
  const services = [{
    text: "Full-stack web development",
    icon: faCode
  }, {
    text: "AI/ML integration & consulting",
    icon: faRobot
  }, {
    text: "Technical architecture & code review",
    icon: faLightbulb
  }, {
    text: "UI/UX design implementation",
    icon: faPalette
  }];
  return <section id="contact" className="relative py-section-sm md:py-section px-4 pb-[calc(theme(spacing.section)+3.5rem)] sm:pb-section bg-background overflow-hidden">
      {/* Abstract background shapes with parallax */}
      <ParallaxShape speed={0.15} className="w-80 h-80 -bottom-20 -right-32">
        <BlobShape className="w-full h-full opacity-40" />
      </ParallaxShape>
      <ParallaxShape speed={0.2} className="w-32 h-32 top-20 left-[5%]">
        <CircleShape className="w-full h-full" />
      </ParallaxShape>
      <ParallaxShape speed={0.25} className="w-10 h-10 top-1/3 right-[20%]">
        <SparkleShape className="w-full h-full" />
      </ParallaxShape>
      <ParallaxShape speed={0.35} className="w-6 h-6 bottom-40 left-[25%]">
        <SparkleShape className="w-full h-full" />
      </ParallaxShape>

      <div className="container relative z-10 mx-auto max-w-5xl">
        <ScrollFade>
          <div className="text-center mb-container md:mb-container-lg">
            <p className="text-overline uppercase text-accent font-semibold mb-element-sm">
              Get In Touch
            </p>
            <p className="text-body text-muted-foreground max-w-xl mx-auto leading-relaxed">
              I'm currently open to freelance projects and full-time opportunities.
              Let's talk about how I can help bring your ideas to life.
            </p>
          </div>
        </ScrollFade>

        <StaggerContainer className="grid sm:grid-cols-2 gap-container-lg" staggerDelay={0.15}>
          {/* Contact Form Window */}
          <StaggerItem>
            <motion.div className="retro-window glass-subtle" whileHover={{
            scale: 1.01
          }} transition={{
            type: "spring",
            stiffness: 400,
            damping: 30
          }}>
              <div className="retro-title-bar">
                <span className="font-bold text-body-sm">Send a Message</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-secondary" />
                  <div className="w-3 h-3 rounded-sm bg-accent" />
                </div>
              </div>
              <div className="p-card bg-card/70 backdrop-blur-sm">
                <ContactForm />
              </div>
            </motion.div>
          </StaggerItem>

          {/* Info Panel */}
          <StaggerItem>
            <div className="space-y-container">
              {/* Services Window */}
              <motion.div className="retro-window glass-subtle" whileHover={{
              scale: 1.01
            }} transition={{
              type: "spring",
              stiffness: 400,
              damping: 30
            }}>
                <div className="retro-title-bar">
                  <span className="font-bold text-body-sm">What I Can Help With</span>
                </div>
                <div className="p-card bg-card/70 backdrop-blur-sm">
                  <ul className="space-y-element">
                    {services.map((service, index) => <motion.li key={index} className="flex items-start gap-element text-foreground" initial={{
                    opacity: 0,
                    x: -10
                  }} whileInView={{
                    opacity: 1,
                    x: 0
                  }} viewport={{
                    once: true
                  }} transition={{
                    delay: index * 0.1,
                    duration: 0.3
                  }}>
                        <FontAwesomeIcon icon={service.icon} className="text-accent w-4 h-4 mt-0.5" />
                        <span className="text-xs">{service.text}</span>
                      </motion.li>)}
                  </ul>
                </div>
              </motion.div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>;
};
export default Contact;