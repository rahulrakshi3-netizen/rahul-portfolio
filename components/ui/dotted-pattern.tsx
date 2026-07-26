import type { CSSProperties, ReactNode } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function DottedPattern({
  size = 10,
  className,
  style,
  children,
}: Props): ReactNode {
  return (
    <div
      aria-hidden="true"
      className={`text-foreground/15 shadow-xl/5 ${className ?? ""}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, currentColor 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
