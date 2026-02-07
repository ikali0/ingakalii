"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  problem?: string;
  approach?: string;
  outcome?: string;
  techStack?: string[];
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

const Gallery4 = ({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences.",
  items,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Gallery4Item | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay plugin with pause on hover
  const autoplayPlugin = useCallback(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const handleCardClick = (item: Gallery4Item, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedItem(item);
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between lg:mb-12">
          <div className="flex flex-col gap-2 md:gap-3">
            <h2 className="font-display text-xl leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl text-foreground">
              {title}
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div 
        className="relative w-full min-w-0 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          maskImage: 'linear-gradient(to right, black 0%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, black 85%, transparent 100%)',
        }}
      >
        <Carousel
          setApi={setCarouselApi}
          plugins={[autoplayPlugin()]}
          opts={{
            loop: true,
            align: "start",
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="-ml-3 md:-ml-4 px-4 md:px-6 lg:px-8">
            {items.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="pl-3 md:pl-4 basis-[85%] sm:basis-[75%] md:basis-1/2 lg:basis-1/3"
              >
                <motion.button 
                  onClick={(e) => handleCardClick(item, e)} 
                  className="group rounded-xl block text-left w-full cursor-pointer min-w-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="group relative w-full min-w-0 aspect-[4/5] sm:aspect-[5/4] overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-auto min-h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.85)_100%)] mix-blend-multiply" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-4 sm:p-5 md:p-6 text-primary-foreground">
                      <h3 className="mb-1.5 text-base font-semibold leading-tight sm:text-lg sm:mb-2 md:text-xl">
                        {item.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-xs leading-relaxed opacity-90 sm:text-sm sm:mb-6 md:mb-8">
                        {item.description}
                      </p>
                      <span className="flex items-center text-xs font-medium sm:text-sm">
                        View Case Study{" "}
                        <ArrowRight className="ml-1.5 size-3.5 sm:size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-4 flex justify-center gap-1.5 sm:mt-6 sm:gap-2 md:mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-colors sm:h-2 sm:w-2 ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          {selectedItem && (
            <>
              <DialogHeader className="space-y-1.5 sm:space-y-2">
                <DialogTitle className="text-lg leading-tight sm:text-xl md:text-2xl font-display">
                  {selectedItem.title}
                </DialogTitle>
                <DialogDescription className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-3 space-y-4 sm:mt-4 sm:space-y-5 md:space-y-6">
                {/* Project Image */}
                <div className="rounded-lg overflow-hidden aspect-video min-w-0">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-auto min-h-full object-cover"
                  />
                </div>

                {/* Case Study Details */}
                <div className="grid gap-4 sm:gap-5 md:gap-6">
                  {selectedItem.problem && (
                    <div className="space-y-1.5 sm:space-y-2">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 sm:text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive sm:w-2 sm:h-2" />
                        Problem / Challenge
                      </h4>
                      <p className="text-muted-foreground text-xs leading-relaxed pl-3.5 sm:text-sm sm:pl-4">
                        {selectedItem.problem}
                      </p>
                    </div>
                  )}

                  {selectedItem.approach && (
                    <div className="space-y-1.5 sm:space-y-2">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 sm:text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent sm:w-2 sm:h-2" />
                        Approach / Methodology
                      </h4>
                      <p className="text-muted-foreground text-xs leading-relaxed pl-3.5 sm:text-sm sm:pl-4">
                        {selectedItem.approach}
                      </p>
                    </div>
                  )}

                  {selectedItem.outcome && (
                    <div className="space-y-1.5 sm:space-y-2">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 sm:text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary sm:w-2 sm:h-2" />
                        Measurable Outcomes
                      </h4>
                      <p className="text-muted-foreground text-xs leading-relaxed pl-3.5 sm:text-sm sm:pl-4">
                        {selectedItem.outcome}
                      </p>
                    </div>
                  )}

                  {selectedItem.techStack && selectedItem.techStack.length > 0 && (
                    <div className="space-y-1.5 sm:space-y-2">
                      <h4 className="text-sm font-semibold text-foreground sm:text-base">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1.5 pl-3.5 sm:gap-2 sm:pl-4">
                        {selectedItem.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] rounded-full bg-muted text-muted-foreground sm:px-3 sm:py-1 sm:text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA */}
                {selectedItem.href && selectedItem.href !== "#" && (
                  <div className="pt-3 border-t sm:pt-4">
                    <a
                      href={selectedItem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline sm:gap-2 sm:text-sm"
                    >
                      Visit Project <ArrowRight className="size-3.5 sm:size-4" />
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export { Gallery4 };
