export type TitleColor =
  | "violet"
  | "yellow"
  | "blue"
  | "cyan"
  | "green"
  | "pink"
  | "foreground";

export type TitleSize = "sm" | "md" | "lg";

export interface TitleOptions {
  color?: TitleColor;
  size?: TitleSize;
  fullWidth?: boolean;
  className?: string;
}

export function title(options: TitleOptions = {}): string {
  const { color, size = "md", fullWidth = false, className = "" } = options;

  const base = "tracking-tight inline font-semibold";
  const sizeClass =
    size === "sm"
      ? "text-3xl lg:text-4xl"
      : size === "lg"
      ? "text-4xl lg:text-6xl"
      : "text-[2.3rem] lg:text-5xl";
  const fullWidthClass = fullWidth ? "w-full block" : "";

  const colorBase = color ? "bg-clip-text text-transparent bg-gradient-to-b" : "";
  const colorMap: Record<TitleColor, string> = {
    violet: "from-[#FF1CF7] to-[#b249f8]",
    yellow: "from-[#FF705B] to-[#FFB457]",
    blue: "from-[#5EA2EF] to-[#0072F5]",
    cyan: "from-[#00b7fa] to-[#01cfea]",
    green: "from-[#6FEE8D] to-[#17c964]",
    pink: "from-[#FF72E1] to-[#F54C7A]",
    foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
  };
  const colorClass = color ? colorMap[color] ?? "" : "";

  return [base, sizeClass, fullWidthClass, colorBase, colorClass, className]
    .filter(Boolean)
    .join(" ")
    .trim();
}

export function subtitle(
  options: { class?: string; fullWidth?: boolean } = {}
): string {
  const { class: className = "", fullWidth = true } = options;
  const base =
    "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full";
  const fullWidthClass = fullWidth ? "!w-full" : "";
  return [base, fullWidthClass, className].filter(Boolean).join(" ").trim();
}

export const headingText = "About";