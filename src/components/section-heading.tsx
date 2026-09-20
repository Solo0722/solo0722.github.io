import { MaskText } from "@/components/motion/mask-text";
import { RevealRule } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Omitted for sections that aren't in the nav, so the numbering stays in step. */
  index?: string;
  label: string;
  title?: string;
  className?: string;
};

/**
 * The masthead above every section: a numbered mono label, a rule that draws
 * itself across the page, then a short serif title. Repeating the same three
 * parts is what makes the page read as one publication.
 */
export function SectionHeading({
  index,
  label,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-4">
        {index && <span className="t-label shrink-0 text-amber">{index}</span>}
        <span className="t-label shrink-0 text-bone-2">{label}</span>
        <RevealRule className="ml-1" />
      </div>

      {title && <MaskText as="h2" lines={[title]} className="t-h1 mt-5" />}
    </div>
  );
}
