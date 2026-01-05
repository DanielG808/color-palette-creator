export default function PageContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="
        flex-1
        flex
        w-full
        justify-center
        items-start
        lg:items-center
        py-6
      "
    >
      {children}
    </main>
  );
}
