"use client";

import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import awardPhoto from "@/_prototype/reference/1778287109296.jpeg";
import pitchPhoto from "@/_prototype/reference/1778287109088.jpeg";
import presentationPhoto from "@/_prototype/reference/1778287109130.jpeg";
import teamPhoto from "@/_prototype/reference/1778287139763.jpeg";

type RecognitionPhoto = {
  src: StaticImageData;
  alt: string;
  caption: string;
};

const photos: RecognitionPhoto[] = [
  {
    src: awardPhoto,
    alt: "The Power of Play team holding a second-prize cheque on stage",
    caption: "Power of Play receiving second prize at the Fowler Global Social Innovation Challenge.",
  },
  {
    src: pitchPhoto,
    alt: "A Power of Play team member presenting on stage",
    caption: "Sharing the Power of Play vision at the New Venture Championships.",
  },
  {
    src: presentationPhoto,
    alt: "Power of Play presenting to a seated panel",
    caption: "Presenting Power of Play to an entrepreneurship judging panel.",
  },
  {
    src: teamPhoto,
    alt: "A Power of Play team member with two event organizers",
    caption: "Celebrating recognition at the New Venture Championships.",
  },
];

export function RecognitionCarousel() {
  const [active, setActive] = useState(0);

  function move(direction: -1 | 1) {
    setActive((current) => (current + direction + photos.length) % photos.length);
  }

  return (
    <div className="mt-12" role="region" aria-roledescription="carousel" aria-label="Recognition highlights">
      <div className="overflow-hidden rounded-[var(--radius-xl)] bg-green-950 shadow-hero">
        <div
          className="flex transition-transform duration-700 ease-[var(--ease-brand)]"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {photos.map((photo, index) => (
            <figure
              key={photo.src.src}
              className="relative min-w-full"
              aria-hidden={index !== active}
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/8]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/85 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-6 font-display text-sm font-semibold text-white sm:p-8 sm:text-base">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-muted" aria-live="polite">
          {active + 1} of {photos.length}
        </p>

        <div className="flex items-center gap-3">
          <div className="mr-2 hidden gap-2 sm:flex" aria-label="Choose a slide">
            {photos.map((photo, index) => (
              <button
                key={photo.src.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                className={`h-2.5 rounded-full transition-[width,background-color] ${
                  index === active ? "w-8 bg-green-700" : "w-2.5 bg-green-200 hover:bg-green-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Show previous recognition image"
            className="inline-flex size-11 items-center justify-center rounded-full border border-green-800 text-green-800 transition-colors hover:bg-green-800 hover:text-white"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Show next recognition image"
            className="inline-flex size-11 items-center justify-center rounded-full border border-green-800 text-green-800 transition-colors hover:bg-green-800 hover:text-white"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
