import type { CSSProperties } from "react";
import { Illustration } from "@/lib/types";
import { cn } from "@/lib/utils";

// Original, hand-authored duotone illustrations rather than stock photography
// or generic clipart — keeps the demo self-contained with no licensing
// concerns, while giving each dish a distinct, on-brand silhouette. Swap
// this component's output for <Image> once real food photography exists.

const PALETTES: Record<Illustration, { base: string; accent: string; deep: string }> = {
  jollof: { base: "#E2661A", accent: "#F4A15B", deep: "#8F3A0C" },
  "jollof-grilled": { base: "#D9581A", accent: "#F2A25C", deep: "#7A3212" },
  "fried-rice": { base: "#C9A227", accent: "#E9CE6C", deep: "#7A611A" },
  "chicken-chips": { base: "#D99A3B", accent: "#F0C787", deep: "#8A5A17" },
  pasta: { base: "#E0B23A", accent: "#F3D584", deep: "#8C6A15" },
  plantain: { base: "#D98C1E", accent: "#F0C267", deep: "#7A4E0E" },
  coleslaw: { base: "#8FAE5C", accent: "#D6E6B8", deep: "#4C6529" },
  chapman: { base: "#C23B4E", accent: "#F0A0AD", deep: "#7A1E2C" },
};

function Shape({ id }: { id: Illustration }) {
  switch (id) {
    case "jollof":
    case "jollof-grilled":
      return (
        <>
          <ellipse cx="100" cy="118" rx="72" ry="34" fill="var(--deep)" />
          <ellipse cx="100" cy="110" rx="64" ry="28" fill="var(--base)" />
          {[...Array(9)].map((_, i) => (
            <circle
              key={i}
              cx={58 + (i % 3) * 32 + (Math.floor(i / 3) % 2) * 10}
              cy={96 + Math.floor(i / 3) * 12}
              r="3.2"
              fill="var(--accent)"
            />
          ))}
          <path
            d="M70 96c10-14 34-18 46-6 6 6 3 14-6 16-14 3-46-1-40-10Z"
            fill="var(--deep)"
          />
        </>
      );
    case "fried-rice":
      return (
        <>
          <ellipse cx="100" cy="116" rx="72" ry="32" fill="var(--deep)" />
          <ellipse cx="100" cy="108" rx="64" ry="26" fill="var(--base)" />
          {[...Array(10)].map((_, i) => (
            <rect
              key={i}
              x={56 + (i % 5) * 20}
              y={90 + Math.floor(i / 5) * 14}
              width="6"
              height="5"
              rx="1.5"
              fill="var(--accent)"
              transform={`rotate(${(i * 13) % 40} ${56 + (i % 5) * 20} ${90 + Math.floor(i / 5) * 14})`}
            />
          ))}
        </>
      );
    case "chicken-chips":
      return (
        <>
          <ellipse cx="100" cy="118" rx="70" ry="30" fill="var(--deep)" />
          <path
            d="M66 92c8-16 34-20 44-6 6 8 0 18-12 20-14 2-38-2-32-14Z"
            fill="var(--base)"
          />
          {[...Array(6)].map((_, i) => (
            <rect
              key={i}
              x={116 + i * 8}
              y={96 - (i % 2) * 6}
              width="6"
              height="26"
              rx="2"
              fill="var(--accent)"
            />
          ))}
        </>
      );
    case "pasta":
      return (
        <>
          <ellipse cx="100" cy="116" rx="70" ry="30" fill="var(--deep)" />
          <ellipse cx="100" cy="108" rx="60" ry="24" fill="var(--base)" />
          <path
            d="M60 100c20-16 60-16 80 2M64 112c22-12 54-12 74 0M70 122c18-8 44-8 62 0"
            stroke="var(--accent)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    case "plantain":
      return (
        <>
          <ellipse cx="100" cy="122" rx="68" ry="26" fill="var(--deep)" />
          {[...Array(5)].map((_, i) => (
            <ellipse
              key={i}
              cx={70 + i * 16}
              cy={108 - (i % 2) * 4}
              rx="13"
              ry="9"
              fill="var(--base)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
          ))}
        </>
      );
    case "coleslaw":
      return (
        <>
          <ellipse cx="100" cy="120" rx="68" ry="28" fill="var(--deep)" />
          <ellipse cx="100" cy="112" rx="58" ry="22" fill="var(--accent)" />
          {[...Array(14)].map((_, i) => (
            <line
              key={i}
              x1={54 + i * 7}
              y1={100 + (i % 3) * 4}
              x2={60 + i * 7}
              y2={122 + (i % 3) * 4}
              stroke="var(--base)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          ))}
        </>
      );
    case "chapman":
      return (
        <>
          <path
            d="M78 60h44l-6 66a4 4 0 0 1-4 3.6H88a4 4 0 0 1-4-3.6L78 60Z"
            fill="var(--base)"
          />
          <path d="M78 60h44l-2.4 20H80.4L78 60Z" fill="var(--accent)" />
          <circle cx="94" cy="52" r="6" fill="var(--deep)" />
          <circle cx="106" cy="50" r="5" fill="var(--deep)" />
          <rect x="98" y="34" width="3" height="18" rx="1.5" fill="var(--deep)" />
        </>
      );
    default:
      return null;
  }
}

export function FoodIllustration({
  illustration,
  className,
}: {
  illustration: Illustration;
  className?: string;
}) {
  const palette = PALETTES[illustration];
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className
      )}
      style={{
        background: `linear-gradient(160deg, ${palette.accent}22, ${palette.base}14)`,
      }}
    >
      <svg
        viewBox="0 0 200 160"
        className="h-full w-full"
        style={
          {
            "--base": palette.base,
            "--accent": palette.accent,
            "--deep": palette.deep,
          } as CSSProperties
        }
      >
        <Shape id={illustration} />
      </svg>
    </div>
  );
}
