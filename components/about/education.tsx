import { GraduationCap, Shield, Lock } from "lucide-react";
import type { ReactNode } from "react";

type Entry = {
  school: string;
  degree: string;
  period: string;
  slug?: string;
  icon: React.ComponentType<{ className?: string }>;
};

const ENTRIES: Entry[] = [
  {
    school: "St. Francis PU College",
    degree: "CEBA (PUC)",
    period: "2021 – 2023",
    icon: GraduationCap,
  },
  {
    school: "St. Francis College",
    degree: "BCA, 3rd Year (5th Semester)",
    period: "2023 – Present",
    icon: GraduationCap,
  },
  {
    school: "Ethical Hacking",
    degree: "Certification Course",
    period: "2024",
    icon: Shield,
  },
  {
    school: "Cyber Security",
    degree: "Certification Course",
    period: "2024",
    icon: Lock,
  },
];

const ROW_HEIGHT = 64;

export function Education(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Education
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {ENTRIES.map((entry) => (
            <li
              key={`${entry.school}-${entry.period}`}
              className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2"
              style={{ minHeight: ROW_HEIGHT }}
            >
              <SchoolLogo entry={entry} />
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                  {entry.school}
                </span>
                <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                  {entry.degree}
                  <span className="text-foreground/30 mx-2">•</span>
                  <span className="text-foreground/55">{entry.period}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SchoolLogo({ entry }: { entry: Entry }): ReactNode {
  const Icon = entry.icon;
  return (
    <span
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-foreground/10 bg-foreground/5"
      aria-hidden="true"
      style={{
        borderRadius: 14,
        boxShadow: "0 0 15px rgba(150,150,150,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Icon className="h-5 w-5 text-foreground/70" aria-hidden="true" />
    </span>
  );
}
