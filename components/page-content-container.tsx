export default function PageContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center items-center w-full">{children}</main>
  );
}
