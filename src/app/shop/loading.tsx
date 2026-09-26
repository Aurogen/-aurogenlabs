export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="h-10 w-48 rounded-lg mx-auto mb-10 animate-pulse" style={{ background: "rgba(0,0,0,0.08)" }} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="aspect-square animate-pulse" style={{ background: "rgba(0,0,0,0.06)" }} />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 rounded animate-pulse" style={{ background: "rgba(0,0,0,0.06)" }} />
              <div className="h-3 w-1/2 rounded animate-pulse" style={{ background: "rgba(0,0,0,0.04)" }} />
              <div className="h-5 w-16 rounded animate-pulse" style={{ background: "rgba(0,0,0,0.06)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
