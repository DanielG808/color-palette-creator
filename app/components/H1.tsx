export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-5xl font-bold hover:text-black duration-200">
      {children}
    </h1>
  );
}
