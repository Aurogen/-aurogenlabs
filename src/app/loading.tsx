export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(0,0,0,0.15)", borderTopColor: "#1D1D1F" }}
        />
        <p className="text-sm" style={{ color: "#9E9EA8" }}>Loading…</p>
      </div>
    </div>
  );
}
