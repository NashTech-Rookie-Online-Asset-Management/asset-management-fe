export default function DataRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <p className="w-1/4">{label}</p>
      <p className="w-3/4">{value}</p>
    </div>
  );
}
