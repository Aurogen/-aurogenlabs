export default function CheckoutLoading() {
  return (
    <div className="min-h-screen py-12" style={{ background: "#F6F6F8" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <div className="h-4 w-32 rounded-full mx-auto mb-3 animate-pulse" style={{ background: "rgba(0,0,0,0.08)" }} />
          <div className="h-10 w-48 rounded-full mx-auto animate-pulse" style={{ background: "rgba(0,0,0,0.08)" }} />
        </div>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 rounded-2xl animate-pulse" style={{ background: "rgba(0,0,0,0.06)" }} />
            ))}
          </div>
          <div className="lg:col-span-2">
            <div className="h-80 rounded-2xl animate-pulse" style={{ background: "rgba(0,0,0,0.06)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
