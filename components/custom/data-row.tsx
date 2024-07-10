export default function DataRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex max-w-64 items-center gap-4">
      <p className="min-w-fit break-all">{label}</p>
      <p className="overflow-hidden text-ellipsis text-pretty break-words font-medium text-foreground">
        {value}
      </p>
    </div>
  );
}
