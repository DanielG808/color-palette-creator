import { cn } from "@/lib/utils/cn";

export default function Home({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-lg md:text-xl font-bold text-calm-5 dark:text-calm-2",
        className
      )}
    >
      {children}
    </h1>
  );
}
