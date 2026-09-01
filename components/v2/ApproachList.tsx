import { approach } from "@/content/home";
import { Band } from "./Rail";
import { PlacedPhoto } from "./PlacedPhoto";

/**
 * The claim and the photograph side by side, then the three steps in a row
 * underneath. The photograph used to sit under the heading's right edge, which
 * meant washing it out to paper so the words survived; giving each a column
 * costs nothing and lets the picture stay a picture.
 */
export function ApproachList() {
  return (
    <Band labelledBy="approach-heading" ruled={false}>
      <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-12 lg:gap-16">
        <div>
          <h2
            id="approach-heading"
            className="max-w-2xl text-d2 font-bold text-ink-warm"
          >
            {approach.title}
          </h2>

          <p className="mt-8 max-w-xl text-lede leading-relaxed text-ink-warm-2 sm:mt-10">
            {approach.body}
          </p>
        </div>

        <PlacedPhoto
          src="/team/deena-and-rooaa.jpg"
          alt="Deena Al-Sammak and Rooaa Shanshal working together"
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 15rem, 70vw"
          objectPosition="48% 32%"
          className="aspect-[4/5] w-[min(100%,16rem)] rotate-[2deg] justify-self-center sm:w-52 md:w-60 lg:w-72 lg:rotate-[3.5deg]"
        />
      </div>

      <ol className="mt-16 grid gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-8 lg:gap-12">
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
