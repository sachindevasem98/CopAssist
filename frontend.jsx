import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, Search, Phone } from "lucide-react";

export default function PoliceFIRAI() {
  const [authenticated, setAuthenticated] = useState(false);
  const [badgeId, setBadgeId] = useState("");
  const [password, setPassword] = useState("");
  const [complaint, setComplaint] = useState("");

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="w-[380px] rounded-2xl shadow-xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <ShieldCheck className="text-blue-600" />
              Police Officer Login
            </div>
            <Input
              placeholder="Badge ID"
              value={badgeId}
              onChange={(e) => setBadgeId(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-full"
              onClick={() => setAuthenticated(true)}
            >
              Authenticate
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Police FIR Assistant</div>
        <div className="text-sm">Authenticated Officer</div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605470207062-b72b5cbe2a87')" }}>
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-3xl px-6 text-white">
            <h1 className="text-4xl font-bold mb-2">AI‑Assisted FIR Registration</h1>
            <p className="text-lg">Search and analyze complaints using Bharatiya Nyaya Sanhita</p>
          </div>
        </div>
      </section>

      {/* Complaint Section */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Complaint Text</h2>
            <Textarea
              rows={6}
              placeholder="Enter complaint details here..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
            />
            <Button className="flex gap-2">
              <Search size={18} /> Analyze Complaint
            </Button>
          </CardContent>
        </Card>

        {/* Results Placeholder */}
        <Card className="rounded-2xl">
          <CardContent className="p-6 text-gray-600">
            Suggested BNS sections will appear here after analysis.
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t p-6 mt-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-1">Emergency</h3>
            <p className="flex items-center gap-2"><Phone size={14} /> 112</p>
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
