"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { urlFor } from "@/lib/sanity/client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images?: any[];
  productName: string;
  fallbackImage?: string | null;
}

export default function ImageCarousel({ images, productName, fallbackImage }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // If no images array or empty, show fallback
  const hasImages = images && images.length > 0;

  if (!hasImages) {
    if (fallbackImage) {
      return (
        <div className="relative w-full h-full">
          <Image
            src={fallbackImage}
            alt={productName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      );
    }
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
        <Image src="/logo.png" alt="Batela Foods" fill className="object-contain opacity-20 p-8" />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setShowNav(true)}
      onMouseLeave={() => setShowNav(false)}
    >
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((img: any, idx: number) => (
            <div key={idx} className="relative min-w-full h-full">
              <Image
                src={urlFor(img).width(800).height(600).fit("crop").url()!}
                alt={`${productName} ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollPrev(); }}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                       bg-white/80 backdrop-blur-sm flex items-center justify-center
                       shadow-glass hover:bg-white hover:shadow-glass-lg
                       transition-all duration-300 z-10
                       ${showNav ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollNext(); }}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                       bg-white/80 backdrop-blur-sm flex items-center justify-center
                       shadow-glass hover:bg-white hover:shadow-glass-lg
                       transition-all duration-300 z-10
                       ${showNav ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); emblaApi?.scrollTo(idx); }}
                className={`rounded-full transition-all duration-300 ${
                  idx === selectedIndex
                    ? 'w-6 h-2 bg-neon-red shadow-neon-red-sm'
                    : 'w-2 h-2 bg-white/60 hover:bg-white/90'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
