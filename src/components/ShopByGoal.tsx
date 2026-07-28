import Link from "next/link";
import { GOALS } from "@/data/products";

const GOAL_COLORS: Record<string, string> = {
  "Fat Loss": "from-orange-600/20 to-red-900/10",
  "Muscle Growth": "from-blue-600/20 to-blue-900/10",
  "Recovery": "from-green-600/20 to-green-900/10",
  "Anti-Aging": "from-purple-600/20 to-purple-900/10",
  "Skin & Hair": "from-pink-600/20 to-pink-900/10",
  "Brain Health": "from-cyan-600/20 to-cyan-900/10",
  "Performance": "from-yellow-600/20 to-yellow-900/10",
};

const GOAL_BORDER: Record<string, string> = {
  "Fat Loss": "rgba(234, 88, 12, 0.3)",
  "Muscle Growth": "rgba(37, 99, 235, 0.3)",
  "Recovery": "rgba(22, 163, 74, 0.3)",
  "Anti-Aging": "rgba(147, 51, 234, 0.3)",
  "Skin & Hair": "rgba(236, 72, 153, 0.3)",
  "Brain Health": "rgba(6, 182, 212, 0.3)",
  "Performance": "rgba(234, 179, 8, 0.3)",
};

export default function ShopByGoal() {
  return (
    <section className="py-20 px-4" style={{ background: "#050D1A" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">Browse by objective</p>
          <h2
            className="text-white text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading, sans-serif)" }}
          >
            SHOP BY GOAL
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Find the right peptide compounds for your specific research objectives
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {GOALS.map((goal) => (
            <Link
              key={goal.label}
              href={`/shop?goal=${encodeURIComponent(goal.label)}`}
              className="group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer"
              style={{
                background: "#0A1628",
                borderColor: GOAL_BORDER[goal.label] || "rgba(27, 107, 222, 0.2)",
                minHeight: "120px",
              }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${GOAL_COLORS[goal.label]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative p-4 flex flex-col items-center justify-center text-center h-full gap-2">
                <span className="text-3xl">{goal.icon}</span>
                <p className="text-white text-sm font-bold leading-tight" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                  {goal.label.toUpperCase()}
                </p>
                <p className="text-gray-500 text-[10px]">{goal.count} Products</p>
              </div>

              {/* Bottom shine */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${GOAL_BORDER[goal.label]?.replace("0.3", "0.8")}, transparent)` }} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
