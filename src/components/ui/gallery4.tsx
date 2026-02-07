"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";

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
    <section className="py-section-sm md:py-section">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-display-sm md:text-display-md lg:text-display-lg text-foreground">
              {title}
            </h2>
            <p className="max-w-lg text-body text-muted-foreground">{description}</p>
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
        className="w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel
          setApi={setCarouselApi}
          plugins={[autoplayPlugin()]}
          opts={{
            loop: true,
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-4 md:ml-[max(4rem,calc(50vw-600px))] 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[280px] pl-[16px] sm:max-w-[320px] lg:max-w-[360px] lg:pl-[20px]"
              >
                <button 
                  onClick={(e) => handleCardClick(item, e)} 
                  className="group rounded-xl block text-left w-full cursor-pointer"
                >
                  <div className="group relative h-full min-h-[24rem] sm:min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.85)_100%)] mix-blend-multiply" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-5 text-primary-foreground md:p-8">
                      <div className="mb-2 pt-4 text-lg font-semibold md:mb-3 md:pt-4 md:text-xl lg:pt-4">
                        {item.title}
                      </div>
                      <div className="mb-6 line-clamp-2 text-sm md:mb-12 md:text-base lg:mb-9 opacity-90">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        View Case Study{" "}
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-6 flex justify-center gap-2 md:mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
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
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl font-display">
                  {selectedItem.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-6">
                {/* Project Image */}
                <div className="rounded-lg overflow-hidden aspect-video">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Case Study Details */}
                <div className="grid gap-6">
                  {selectedItem.problem && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-destructive" />
                        Problem / Challenge
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed pl-4">
                        {selectedItem.problem}
                      </p>
                    </div>
                  )}

                  {selectedItem.approach && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        Approach / Methodology
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed pl-4">
                        {selectedItem.approach}
                      </p>
                    </div>
                  )}

                  {selectedItem.outcome && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        Measurable Outcomes
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed pl-4">
                        {selectedItem.outcome}
                      </p>
                    </div>
                  )}

                  {selectedItem.techStack && selectedItem.techStack.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2 pl-4">
                        {selectedItem.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
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
                  <div className="pt-4 border-t">
                    <a
                      href={selectedItem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      Visit Project <ArrowRight className="size-4" />
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
