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
        "text-5xl font-bold hover:text-black duration-200 cursor-pointer",
        className
      )}
    >
      {children}
    </h1>
  );
}
