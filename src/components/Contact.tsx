import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faRobot, faLightbulb, faPalette } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "./ContactForm";
import { ScrollFade } from "./ui/scroll-fade";
const Contact = () => {
  const services = [{
    text: "Full-stack web development",
    icon: faCode
  }, {
    text: "AI/ML integration & consulting",
    icon: faRobot
  }, {
    text: "Technical architecture & review",
    icon: faLightbulb
  }, {
    text: "UI/UX implementation",
    icon: faPalette
  }];
  return <section id="contact" className="relative py-16 sm:py-20 px-4 bg-background">
      <div className="mx-auto max-w-4xl space-y-12">

        {/* Header */}
        <ScrollFade>
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-accent text-xl animate-spin" style={{
              animationDuration: '3s'
            }}>✱</span>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Contact
              </span>
            </div>
            
          </div>
        </ScrollFade>

        {/* Layout */}
        <div className="grid gap-8 sm:grid-cols-2">

          {/* Form Panel */}
          <ScrollFade>
            <motion.div whileHover={{
            y: -3
          }} transition={{
            duration: 0.25
          }} className="relative rounded-2xl border border-border/40
                         bg-card/40
                         backdrop-blur-xl
                         shadow-[0_8px_30px_-10px_hsl(var(--foreground)/0.1)]
                         p-5 sm:p-6">
              {/* Subtle 3D highlight */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-background/40 to-transparent opacity-30 pointer-events-none" />

              <div className="relative">
                <h3 className="text-sm font-semibold mb-4">
                  Send a Message
                </h3>

                <ContactForm />
              </div>
            </motion.div>
          </ScrollFade>

          {/* Services Panel */}
          <ScrollFade>
            <motion.div whileHover={{
            y: -3
          }} transition={{
            duration: 0.25
          }} className="relative rounded-2xl border border-border/40
                         bg-card/40
                         backdrop-blur-xl
                         shadow-[0_8px_30px_-10px_hsl(var(--foreground)/0.1)]
                         p-5 sm:p-6">
              {/* Subtle 3D highlight */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-background/40 to-transparent opacity-30 pointer-events-none" />

              <div className="relative">
                <h3 className="text-sm font-semibold mb-5">
                  Areas of Focus
                </h3>

                <ul className="space-y-4">
                  {services.map((service, index) => <motion.li key={index} initial={{
                  opacity: 0,
                  y: 8
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  delay: index * 0.08
                }} className="flex items-start gap-3">
                      <FontAwesomeIcon icon={service.icon} className="text-primary w-4 h-4 mt-1" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {service.text}
                      </span>
                    </motion.li>)}
                </ul>
              </div>
            </motion.div>
          </ScrollFade>

        </div>
      </div>
    </section>;
};
export default Contact;