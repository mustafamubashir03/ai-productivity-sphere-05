
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

interface ScreenshotCarouselProps {
  screenshots: string[];
  toolName: string;
}

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({ screenshots, toolName }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
        <img
          src="/placeholder.svg"
          alt={`${toolName} screenshot placeholder`}
          className="w-full h-auto rounded-md shadow-sm mb-4"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {toolName} interface screenshot
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Screenshots</h2>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {screenshots.map((screenshot: string, index: number) => (
            <CarouselItem key={index}>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <img
                  src={screenshot}
                  alt={`${toolName} screenshot ${index + 1}`}
                  className="w-full h-auto rounded-md shadow-sm"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      {screenshots.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {screenshots.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === current - 1 
                  ? 'bg-primary' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScreenshotCarousel;
