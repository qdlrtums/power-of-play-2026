import { approach } from "@/content/home";
import { Band } from "./Rail";
import { OverlapPhoto } from "./OverlapPhoto";

/**
 * Wide heading with a photograph tucked under its right edge, then the three
 * steps in a row underneath.
 */
export function ApproachList() {
  return (
    <Band labelledBy="approach-heading" ruled={false}>
      <div className="relative overflow-x-hidden sm:min-h-[17rem] lg:min-h-[19rem]">
        <h2
          id="approach-heading"
          className="relative z-10 max-w-4xl text-d2 font-bold text-ink-warm lg:max-w-5xl"
        >
          {approach.title}
        </h2>

        <OverlapPhoto
          src="/team/deena-and-rooaa.jpg"
          alt="Deena Al-Sammak and Rooaa Shanshal working together"
          sizes="(min-width: 1024px) 18rem, 70vw"
          fade="west"
          objectPosition="48% 32%"
          className="relative z-0 mx-auto mt-[-2.75rem] aspect-[4/5] w-[min(100%,16rem)] rotate-0 sm:absolute sm:right-0 sm:top-[-0.5rem] sm:mx-0 sm:mt-0 sm:w-52 sm:rotate-3 md:w-60 lg:w-72 lg:rotate-[4deg]"
        />

        <p className="relative z-10 mt-8 max-w-2xl text-lede leading-relaxed text-ink-warm-2 sm:mt-10 sm:max-w-xl lg:max-w-2xl">
          {approach.body}
        </p>
      </div>

      <ol className="relative z-10 mt-16 grid gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-8 lg:gap-12">
        {approach.steps.map((step, i) => (
          <li key={step.title} className="border-t border-line pt-7">
            <span
              aria-hidden="true"
              className="font-display text-d3 font-bold leading-none text-green-700"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-d3 font-bold text-ink-warm">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-warm-2">{step.body}</p>
          </li>
        ))}
      </ol>
    </Band>
  );
}
