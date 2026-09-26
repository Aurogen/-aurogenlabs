export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="aspect-square rounded-2xl animate-pulse" style={{ background: "rgba(0,0,0,0.06)" }} />
        <div className="space-y-4">
          <div className="h-4 w-24 rounded-full animate-pulse" style={{ background: "rgba(0,0,0,0.06)" }} />
          <div className="h-10 w-3/4 rounded-lg animate-pulse" style={{ background: "rgba(0,0,0,0.08)" }} />
          <div className="h-6 w-24 rounded-full animate-pulse" style={{ background: "rgba(0,0,0,0.06)" }} />
          <div className="h-24 rounded-xl animate-pulse" style={{ background: "rgba(0,0,0,0.05)" }} />
          <div className="h-14 w-full rounded-full animate-pulse" style={{ background: "rgba(0,0,0,0.08)" }} />
        </div>
      </div>
    </div>
  );
}
