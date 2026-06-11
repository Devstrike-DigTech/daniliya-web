export default function SectionTag({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="flex items-center gap-2.5 text-lg  text-brand">
      <span aria-hidden className="h-px w-6 bg-brand" />
      {children}
    </p>
  );
}
