import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2, MapPin, Users2, ShieldCheck, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, setIsReportModalOpen, setIsInitiativeModalOpen, issues, initiatives } = useApp();

  const activeIssuesCount = issues.filter(
    (i) => i.currentStatus === 'in_progress' || i.currentStatus === 'acknowledged'
  ).length;
  const verifiedCount = issues.filter((i) => i.verifiedResolution).length;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#DDE8DE]">
      {/* Subtle organic background accent */}
      <div
        className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#20B486]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#C77852]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Launch Context Label - Clean text without pill enclosing */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#103D32]">
              <span className="font-semibold uppercase tracking-wider text-[#C77852]">KENYA CIVIC ACTION PLATFORM</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#4A574E]">NAIROBI · MOMBASA · KISUMU · ELDORET</span>
            </div>

            {/* Hero Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#103D32] tracking-tight leading-[1.08] text-balance">
              Your community deserves more than promises.
            </h1>

            {/* Supporting Text */}
            <p className="text-lg text-[#3B483F] leading-relaxed max-w-2xl">
              Discover local challenges, connect with people who care, and turn collective action into measurable progress. From broken water mains to riverbank restoration, coordinate solutions with transparent accountability.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('pulse')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-[#F7F2E8] bg-[#103D32] hover:bg-[#0B2C24] active:scale-[0.98] rounded-md shadow-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20B486]"
              >
                <span>Explore Community</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsInitiativeModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-base font-semibold text-[#103D32] bg-white hover:bg-[#F2EFE9] border border-[#CAD8CC] active:scale-[0.98] rounded-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#103D32]"
              >
                <span>Start an Initiative</span>
              </button>
            </div>

            {/* Trust Markers - Clean typography with dot separators */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#4A574E] border-t border-[#DDE8DE]/80">
              <div className="flex items-center gap-1.5 font-medium text-[#103D32]">
                <ShieldCheck className="w-4 h-4 text-[#20B486]" />
                <span>Generalized GPS Protection</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5 font-medium text-[#103D32]">
                <CheckCircle2 className="w-4 h-4 text-[#20B486]" />
                <span>Verified vs Resident Reports</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5 font-medium text-[#103D32]">
                <Users2 className="w-4 h-4 text-[#C77852]" />
                <span>Grassroots Action Circles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset & Live State Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-[#DDE8DE] shadow-sm bg-white">
              {/* 16:9 Authentic Documentary Photo from Nairobi community water blueprint session */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#103D32]/10">
                <img
                  src="/src/assets/images/hero_community_action_1792616747635.jpg"
                  alt="Kenyan community action group reviewing local water infrastructure plans in Nairobi"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#103D32]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#20B486]" />
                    <span>Nairobi · Kangemi Community Water Action</span>
                  </div>
                  <span className="font-mono-data opacity-90">UNJ-KE-2026-041</span>
                </div>
              </div>

              {/* Real Operational Snapshot Strip below image */}
              <div className="p-4 space-y-3 bg-[#FBF9F5]">
                <div className="flex items-center justify-between text-xs text-[#4A574E]">
                  <span className="font-semibold text-[#103D32]">Live Platform Coordination</span>
                  <span className="font-mono-data text-xs">Updated 2h ago</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded bg-white border border-[#DDE8DE]">
                    <div className="font-mono-data text-lg font-bold text-[#103D32] tabular-nums">
                      {issues.length}
                    </div>
                    <div className="text-[11px] text-[#5A685D] leading-tight">Total Reports</div>
                  </div>
                  <div className="p-2 rounded bg-white border border-[#DDE8DE]">
                    <div className="font-mono-data text-lg font-bold text-[#C77852] tabular-nums">
                      {activeIssuesCount}
                    </div>
                    <div className="text-[11px] text-[#5A685D] leading-tight">In Progress</div>
                  </div>
                  <div className="p-2 rounded bg-white border border-[#DDE8DE]">
                    <div className="font-mono-data text-lg font-bold text-[#20B486] tabular-nums">
                      {verifiedCount}
                    </div>
                    <div className="text-[11px] text-[#5A685D] leading-tight">Verified Done</div>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-[#5A685D]">Next volunteer action:</span>
                  <button
                    onClick={() => setActiveTab('initiatives')}
                    className="text-[#103D32] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Water Point Dig (Kangemi)</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
