import {
  AlertTriangle,
  Bell,
  Brain,
  Check,
  ChevronRight,
  Lightbulb,
  Menu,
  Rocket,
  Search,
  Shield,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ─── Telegram SVG Icon ────────────────────────────────────────────────────────
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="Telegram"
      role="img"
    >
      <title>Telegram</title>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

// ─── Candlestick Chart ────────────────────────────────────────────────────────
function CandlestickChart() {
  const candles = [
    { o: 220, h: 228, l: 218, c: 225 },
    { o: 225, h: 232, l: 222, c: 230 },
    { o: 230, h: 235, l: 225, c: 226 },
    { o: 226, h: 230, l: 220, c: 222 },
    { o: 222, h: 228, l: 218, c: 227 },
    { o: 227, h: 234, l: 224, c: 232 },
    { o: 232, h: 238, l: 228, c: 236 },
    { o: 236, h: 240, l: 232, c: 234 },
    { o: 234, h: 238, l: 228, c: 230 },
    { o: 230, h: 235, l: 226, c: 233 },
    { o: 233, h: 240, l: 230, c: 238 },
    { o: 238, h: 244, l: 235, c: 242 },
    { o: 242, h: 248, l: 238, c: 240 },
    { o: 240, h: 246, l: 236, c: 243 },
    { o: 243, h: 250, l: 240, c: 248 },
    { o: 248, h: 254, l: 244, c: 246 },
    { o: 246, h: 252, l: 242, c: 250 },
    { o: 250, h: 258, l: 246, c: 255 },
    { o: 255, h: 260, l: 250, c: 253 },
    { o: 253, h: 262, l: 249, c: 258 },
  ];

  const width = 400;
  const height = 200;
  const padding = { top: 16, right: 16, bottom: 16, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const allPrices = candles.flatMap((c) => [c.h, c.l]);
  const minPrice = Math.min(...allPrices) - 3;
  const maxPrice = Math.max(...allPrices) + 3;
  const priceRange = maxPrice - minPrice;

  const candleWidth = chartW / candles.length;
  const bodyWidth = candleWidth * 0.55;

  const toY = (price: number) =>
    padding.top + ((maxPrice - price) / priceRange) * chartH;
  const toX = (i: number) => padding.left + i * candleWidth + candleWidth / 2;

  const trendLinePoints = `${toX(0)},${toY(candles[0].c)} ${toX(candles.length - 1)},${toY(candles[candles.length - 1].c)}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="AAPL candlestick chart showing bullish trend"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        borderRadius: "12px",
        width: "100%",
        height: "auto",
      }}
    >
      <title>AAPL Candlestick Chart</title>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = padding.top + t * chartH;
        const price = maxPrice - t * priceRange;
        return (
          <g key={t}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            <text
              x={padding.left - 4}
              y={y + 4}
              textAnchor="end"
              fontSize="8"
              fill="rgba(255,255,255,0.35)"
            >
              {price.toFixed(0)}
            </text>
          </g>
        );
      })}

      {candles.map((c, i) => {
        const x = toX(i);
        const isUp = c.c >= c.o;
        const color = isUp ? "#34d399" : "#f87171";
        const bodyTop = toY(Math.max(c.o, c.c));
        const bodyBottom = toY(Math.min(c.o, c.c));
        const bodyH = Math.max(bodyBottom - bodyTop, 1);
        return (
          <g key={`${c.o}-${c.h}-${c.l}-${c.c}`}>
            <line
              x1={x}
              y1={toY(c.h)}
              x2={x}
              y2={toY(c.l)}
              stroke={color}
              strokeWidth="1.5"
            />
            <rect
              x={x - bodyWidth / 2}
              y={bodyTop}
              width={bodyWidth}
              height={bodyH}
              fill={color}
              opacity={0.85}
              rx={1}
            />
          </g>
        );
      })}

      <polyline
        points={trendLinePoints}
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        strokeDasharray="4 3"
        opacity={0.7}
      />

      <line
        x1={padding.left}
        y1={toY(245.5)}
        x2={width - padding.right}
        y2={toY(245.5)}
        stroke="#60a5fa"
        strokeWidth="1"
        strokeDasharray="3 2"
        opacity={0.5}
      />
      <text
        x={width - padding.right + 2}
        y={toY(245.5) + 4}
        fontSize="7"
        fill="#60a5fa"
        opacity={0.7}
      >
        Entry
      </text>
    </svg>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#telegram", label: "Telegram" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-glow">
              <Rocket size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-blue-purple">
              TradePilot AI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-ocid={`nav.${l.label.toLowerCase()}.link`}
                className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#pricing"
              data-ocid="nav.trial.primary_button"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-glow hover:-translate-y-0.5"
            >
              Start Free Trial
            </a>
          </div>

          <button
            type="button"
            data-ocid="nav.menu.toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/70 hover:text-white transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/80 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/70 hover:text-white transition-colors py-2 text-sm font-medium"
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  window.location.hash = "pricing";
                }}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl text-center"
              >
                Start Free Trial
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden gradient-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f23] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Powered by Advanced AI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-gradient"
          >
            AI Trading Co-Pilot
            <br />
            for Smarter Trades
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Analyze stocks, detect opportunities, and avoid costly mistakes with
            AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#pricing"
              data-ocid="hero.trial.primary_button"
              className="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-lg rounded-2xl transition-all duration-300 shadow-glow hover:shadow-glow-purple hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <TrendingUp size={20} />
              <span>Start Free Trial</span>
            </a>
            <a
              href="#telegram"
              data-ocid="hero.telegram.secondary_button"
              className="w-full sm:w-auto px-10 py-5 border border-white/20 hover:border-blue-400/60 text-white/70 hover:text-blue-300 font-semibold text-lg rounded-2xl transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3"
            >
              <TelegramIcon className="w-6 h-6" />
              <span>Connect Telegram Bot</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "87%", label: "Avg. Accuracy" },
              { value: "12K+", label: "Active Traders" },
              { value: "$2.4M", label: "Profits Tracked" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-white/40 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      icon: Search,
      gradient: "from-blue-500 to-purple-500",
      step: "1",
      title: "Enter a Stock",
      desc: "Type any stock ticker and let our AI start analyzing instantly",
    },
    {
      icon: Brain,
      gradient: "from-green-500 to-blue-500",
      step: "2",
      title: "AI Analyzes",
      desc: "AI detects trends, support/resistance levels, and high-probability setups",
    },
    {
      icon: Lightbulb,
      gradient: "from-purple-500 to-pink-500",
      step: "3",
      title: "Get Trade Ideas",
      desc: "Receive complete trade setups with entry, stop-loss, and targets",
    },
  ];

  return (
    <section id="how" className="py-32" style={{ background: "#0d0d1f" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gradient mb-4"
          >
            How It Works
          </motion.h2>
          <p className="text-white/50 text-xl">
            Three simple steps to smarter trading
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center group"
            >
              <div
                className={`w-24 h-24 bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-glow`}
              >
                <s.icon size={32} className="text-white" />
              </div>
              <div className="text-white/30 text-sm font-bold uppercase tracking-widest mb-2">
                Step {s.step}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-white/50 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    {
      icon: TrendingUp,
      gradient: "from-blue-500 to-blue-600",
      border: "hover:border-blue-500/50",
      title: "Market Trend Analysis",
      desc: "AI-powered trend detection across multiple timeframes with confidence scores",
      barColor: "from-blue-500 to-purple-500",
    },
    {
      icon: Zap,
      gradient: "from-green-500 to-blue-600",
      border: "hover:border-green-500/50",
      title: "Smart Trade Setup",
      desc: "Breakout detection and high-probability trade setups with precise levels",
      barColor: "from-green-500 to-blue-500",
    },
    {
      icon: Shield,
      gradient: "from-purple-500 to-pink-500",
      border: "hover:border-purple-500/50",
      title: "Risk Control",
      desc: "Dynamic position sizing, stop-loss optimization, and risk/reward analysis",
      barColor: "from-purple-500 to-pink-500",
    },
    {
      icon: AlertTriangle,
      gradient: "from-orange-500 to-red-500",
      border: "hover:border-orange-500/50",
      title: "AI Mistake Detection",
      desc: "Real-time detection of common trading mistakes before they cost you money",
      barColor: "from-orange-500 to-red-500",
    },
    {
      icon: Bell,
      gradient: "from-indigo-500 to-purple-500",
      border: "hover:border-indigo-500/50",
      title: "Telegram Alerts",
      desc: "Instant notifications for breakouts, trends, and hot stock opportunities",
      barColor: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section id="features" className="py-32 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gradient mb-4"
          >
            Powerful AI Features
          </motion.h2>
          <p className="text-white/50 text-xl">
            Everything you need to trade like a pro
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group glass bg-black/30 border border-white/10 ${f.border} rounded-3xl p-8 hover:-translate-y-2 hover:bg-black/50 transition-all duration-300 shadow-xl cursor-default`}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${f.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow`}
              >
                <f.icon size={26} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-white/50 mb-6 leading-relaxed text-sm">
                {f.desc}
              </p>
              <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${f.barColor} rounded-full`}
                  style={{
                    width: "80%",
                    animation: "progressPulse 2s ease-in-out infinite",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Live Example ─────────────────────────────────────────────────────────────
function LiveExample() {
  const tradeData = [
    { label: "Trend", value: "🟢 Strong Bullish", color: "text-emerald-400" },
    { label: "Entry", value: "$245.50", color: "text-blue-400" },
    { label: "Stop Loss", value: "$238.20", color: "text-red-400" },
    {
      label: "Target 1",
      value: "$258.00 (R:R 2.1)",
      color: "text-emerald-400",
    },
    { label: "Risk", value: "1.2% of account", color: "text-orange-400" },
  ];

  return (
    <section id="example" style={{ background: "#0d0d1f" }} className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gradient mb-4"
          >
            Live Example Analysis
          </motion.h2>
          <p className="text-white/50 text-xl">
            See TradePilot AI in action — AAPL analysis
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass bg-black/30 border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-glow">
                    <TrendingUp size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      AAPL — Bullish Breakout Setup
                    </h3>
                    <p className="text-emerald-400 text-sm font-semibold">
                      Confidence: 87% | Timeframe: Daily
                    </p>
                  </div>
                </div>
                <div className="space-y-5">
                  {tradeData.map((d) => (
                    <div key={d.label} className="flex items-center gap-4">
                      <span className="w-28 text-white/40 text-sm shrink-0">
                        {d.label}:
                      </span>
                      <span className={`font-bold ${d.color}`}>{d.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/50">AI Confidence</span>
                    <span className="text-emerald-400 font-bold">87%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "87%" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="rounded-2xl overflow-hidden border border-white/10">
                  <CandlestickChart />
                </div>
                <div className="flex gap-4 mt-3 text-xs text-white/40">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" />
                    Bullish
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-red-400 inline-block" />
                    Bearish
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 border-t-2 border-dashed border-blue-400 inline-block" />
                    Trend
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      desc: "Perfect for getting started",
      features: [
        "5 stock analyses/day",
        "Basic trend detection",
        "Email alerts",
        "1-day delayed data",
        "Community support",
      ],
      cta: "Get Started Free",
      highlight: false,
      ctaStyle:
        "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
    },
    {
      name: "Pro",
      price: "$29",
      period: "/mo",
      desc: "For serious traders",
      features: [
        "Unlimited stock analyses",
        "Advanced AI setups",
        "Real-time Telegram alerts",
        "Risk management tools",
        "Priority support",
        "Mistake detection",
      ],
      cta: "Start Pro Trial",
      highlight: true,
      ctaStyle:
        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-glow",
    },
    {
      name: "Elite",
      price: "$79",
      period: "/mo",
      desc: "For professional traders",
      features: [
        "Everything in Pro",
        "Portfolio-level AI analysis",
        "Custom alert strategies",
        "API access",
        "White-glove onboarding",
        "Dedicated account manager",
      ],
      cta: "Go Elite",
      highlight: false,
      ctaStyle:
        "border border-white/20 text-white hover:border-purple-400/60 hover:bg-purple-500/5",
    },
  ];

  return (
    <section id="pricing" className="py-32 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gradient mb-4"
          >
            Simple Pricing
          </motion.h2>
          <p className="text-white/50 text-xl">
            Choose the plan that fits your trading goals
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative glass rounded-3xl p-8 border transition-all duration-300 ${
                t.highlight
                  ? "bg-gradient-to-b from-blue-600/20 to-purple-600/20 border-blue-500/50 scale-105 shadow-glow"
                  : "bg-black/30 border-white/10 hover:border-white/20"
              }`}
              data-ocid={`pricing.${t.name.toLowerCase()}.card`}
            >
              {t.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{t.name}</h3>
                <p className="text-white/40 text-sm mb-4">{t.desc}</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-white">
                    {t.price}
                  </span>
                  <span className="text-white/40 mb-2">{t.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    <span className="text-white/70">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                data-ocid={`pricing.${t.name.toLowerCase()}.primary_button`}
                className={`block w-full py-3 px-6 rounded-xl text-center font-semibold text-sm transition-all duration-200 cursor-pointer ${t.ctaStyle}`}
              >
                {t.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Telegram Section ─────────────────────────────────────────────────────────
function TelegramSection() {
  const mockMessages = [
    {
      text: "🚨 AAPL BREAKOUT ALERT\nBullish breakout above $245.50 resistance\nEntry: $245.50 | Target: $258 | Stop: $238",
      time: "09:32 AM",
      type: "alert",
    },
    {
      text: "📈 NVDA — Strong momentum detected\nConfidence: 91% | Trend: Bullish\nMultiple timeframe confirmation",
      time: "10:15 AM",
      type: "trend",
    },
    {
      text: "⚠️ TSLA — Overbought warning\nRSI at 78 — risk of pullback\nConsider tightening stops",
      time: "11:04 AM",
      type: "warning",
    },
  ];

  return (
    <section id="telegram" style={{ background: "#0d0d1f" }} className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-8 shadow-glow animate-float">
              <TelegramIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Real-Time Alerts
              <br />
              on Telegram
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Connect our Telegram bot and receive instant notifications for
              breakouts, trend changes, and high-confidence trade setups —
              directly to your phone.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Instant breakout alerts",
                "Entry, stop-loss & target levels",
                "AI confidence scores",
                "Portfolio watchlist monitoring",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-white/70"
                >
                  <Check size={16} className="text-blue-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="telegram.connect.primary_button"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all duration-200 shadow-glow hover:-translate-y-0.5"
            >
              <TelegramIcon className="w-5 h-5" />
              Connect Telegram Bot
              <ChevronRight size={16} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="glass bg-black/40 border border-white/10 rounded-3xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-black/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <TelegramIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    TradePilot AI Bot
                  </div>
                  <div className="text-emerald-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    Online
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-4 max-h-80 overflow-y-auto scrollbar-thin">
                {mockMessages.map((msg, i) => (
                  <motion.div
                    key={msg.time}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 mt-1">
                      <TelegramIcon className="w-4 h-4 text-white" />
                    </div>
                    <div
                      className={`flex-1 rounded-2xl rounded-tl-sm px-4 py-3 ${
                        msg.type === "alert"
                          ? "bg-blue-500/15 border border-blue-500/20"
                          : msg.type === "warning"
                            ? "bg-orange-500/15 border border-orange-500/20"
                            : "bg-emerald-500/15 border border-emerald-500/20"
                      }`}
                    >
                      <p className="text-white/80 text-sm whitespace-pre-line leading-relaxed">
                        {msg.text}
                      </p>
                      <span className="text-white/30 text-xs mt-1 block">
                        {msg.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-16 border-t border-white/10"
      style={{ background: "#0a0a18" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Rocket size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-blue-purple">
              TradePilot AI
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <a
              href="#features"
              className="hover:text-white/70 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-white/70 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#telegram"
              className="hover:text-white/70 transition-colors"
            >
              Telegram
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-center">
            <p className="text-white/30">
              Designed & Built by{" "}
              <span className="text-blue-400 font-semibold">Hanan Mir</span>
            </p>
            <p className="text-white/30">
              © {year}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-blue-400 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Scroll-to-top button ─────────────────────────────────────────────────────
function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-glow hover:-translate-y-1 transition-transform duration-200"
          aria-label="Scroll to top"
        >
          <ChevronRight size={18} className="-rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <LiveExample />
        <Pricing />
        <TelegramSection />
      </main>
      <Footer />
      <ScrollTopButton />
    </div>
  );
}
