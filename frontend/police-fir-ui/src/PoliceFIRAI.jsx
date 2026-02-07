import { useState } from "react";
import { ShieldCheck, Search, Phone, LogOut } from "lucide-react";

export default function PoliceFIRAI() {
  const [authenticated, setAuthenticated] = useState(false);
  const [badgeId, setBadgeId] = useState("");
  const [password, setPassword] = useState("");
  const [complaint, setComplaint] = useState("");

  /* ---------------- LOGIN SCREEN ---------------- */
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
        <div className="w-[380px] rounded-2xl border border-neutral-800 bg-neutral-900 p-6 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <ShieldCheck className="text-blue-500" />
            Police Officer Login
          </div>

          <input
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 outline-none"
            placeholder="Badge ID"
            value={badgeId}
            onChange={(e) => setBadgeId(e.target.value)}
          />

          <input
            type="password"
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={() => setAuthenticated(true)}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition py-2 font-medium"
          >
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN DASHBOARD ---------------- */
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-black border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Police FIR Assistant</div>
        <button
          onClick={() => setAuthenticated(false)}
          className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white"
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      {/* HERO */}
      <section
        className="relative h-[280px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1605470207062-b72b5cbe2a87')",
        }}
      >
        <div className="absolute inset-0 bg-black/70 flex items-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-2">
              AI-Assisted FIR Registration
            </h1>
            <p className="text-neutral-300 text-lg">
              Analyze complaints using Bharatiya Nyaya Sanhita (BNS)
            </p>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-4xl mx-auto px-6 mt-8">
        <div className="h-px bg-neutral-800" />
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-4xl mx-auto p-8 space-y-8">
        {/* COMPLAINT INPUT */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-4">
          <h2 className="text-xl font-semibold">Complaint Text</h2>

          <textarea
            rows={6}
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 outline-none resize-none"
            placeholder="Describe the incident in detail..."
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          />

          <button
            className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition px-4 py-2 font-medium"
          >
            <Search size={18} />
            Analyze Complaint
          </button>
        </div>

        {/* RESULTS */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 text-neutral-400">
          No analysis yet. Submit a complaint to generate applicable BNS
          sections.
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 bg-black mt-10">
        <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-1">Emergency</h3>
            <p className="flex items-center gap-2">
              <Phone size={14} /> 112
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Women Helpline</h3>
            <p>181</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Cyber Crime</h3>
            <p>1930</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
