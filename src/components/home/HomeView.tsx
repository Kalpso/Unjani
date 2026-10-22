import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hero } from './Hero';
import { WorkflowSection } from './WorkflowSection';
import { IssueCategory } from '../../types';
import {
  Droplets,
  Trash2,
  Construction,
  Lightbulb,
  Trees,
  ShieldAlert,
  Building,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Users2,
  Scale,
  Award,
  ChevronDown,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setActiveTab,
    setIsReportModalOpen,
    setIsInitiativeModalOpen,
    setSelectedCategory,
    setSelectedIssue,
    issues,
    initiatives,
    volunteers,
    organizations,
  } = useApp();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Category cards for section 2
  const categories: {
    id: IssueCategory;
    title: string;
    desc: string;
    icon: any;
    count: number;
  }[] = [
    {
      id: 'water',
      title: 'Water Access',
      desc: 'Boreholes, broken distribution valves, supply rationing, tap repair.',
      icon: Droplets,
      count: issues.filter((i) => i.category === 'water').length,
    },
    {
      id: 'sanitation',
      title: 'Waste & Sanitation',
      desc: 'Blocked culverts, uncollected municipal waste, open stormwater runoff.',
      icon: Trash2,
      count: issues.filter((i) => i.category === 'sanitation').length,
    },
    {
      id: 'roads',
      title: 'Roads & Bridges',
      desc: 'Eroded pedestrian footbridges, dangerous potholes, pedestrian crossings.',
      icon: Construction,
      count: issues.filter((i) => i.category === 'roads').length,
    },
    {
      id: 'lighting',
      title: 'Public Lighting',
      desc: 'High-mast floodlights, transit path security lighting, transformer faults.',
      icon: Lightbulb,
      count: issues.filter((i) => i.category === 'lighting').length,
    },
    {
      id: 'environment',
      title: 'Environment & Trees',
      desc: 'Riparian buffer encroachment, urban deforestation, wetland protection.',
      icon: Trees,
      count: issues.filter((i) => i.category === 'environment').length,
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      desc: 'Community centers, dispensary power backup, public sports grounds.',
      icon: Building,
      count: issues.filter((i) => i.category === 'infrastructure').length,
    },
  ];

  const faqs = [
    {
      q: 'How does UNJANI protect the privacy of reporting residents?',
      a: 'In accordance with the Kenya Data Protection Act, 2019, UNJANI automatically generalizes coordinates into a neighborhood radius (~250m). Private home numbers, personal phone numbers, and resident faces are shielded by default. Reports can also be submitted fully anonymously.',
    },
    {
      q: 'Is UNJANI an official government emergency reporting portal?',
      a: 'No. UNJANI is an independent community coordination and civic action platform. For immediate life-threatening danger, crimes in progress, or urgent medical emergencies, residents must contact Kenya emergency services (999 / 112) directly.',
    },
    {
      q: 'How are issues marked as "Resolved"? Can an organization simply claim victory?',
      a: 'No. UNJANI enforces a two-tier verification model: organization-provided completion notes are distinguished from independently verified outcomes. An issue status requires on-the-ground community confirmation and timestamped photographic evidence before it is recorded as verified.',
    },
    {
      q: 'Can organizations or property developers pay to remove or alter negative reports?',
      a: 'Never. UNJANI maintains an immutable public audit log. Our business model strictly prohibits monetizing resident data or allowing paid entities to suppress legitimate reports or buy favorable resolution ratings.',
    },
    {
      q: 'What is an Action Circle?',
      a: 'An Action Circle is a self-organized group of residents, skilled volunteers, and local CBOs who team up to solve a specific challenge together — such as clearing a blocked storm drain or replanting a riverbank buffer.',
    },
  ];

  // Calculated metrics
  const totalReports = issues.length;
  const verifiedDone = issues.filter((i) => i.verifiedResolution).length;
  const inProgress = issues.filter((i) => i.currentStatus === 'in_progress').length;

  return (
    <div className="space-y-20">
      {/* 1. Hero & Primary Actions */}
      <Hero />

      {/* 2. Challenge Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C77852] mb-1">
            Focus Areas
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#103D32]">
            Community challenge categories
          </h2>
          <p className="text-sm text-[#4A574E] mt-1">
            Explore and report on the issues that directly impact public well-being and neighborhood resilience in Kenya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveTab('pulse');
                }}
                className="p-5 rounded-xl bg-white border border-[#DDE8DE] hover:border-[#103D32] transition-all text-left group shadow-xs cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F7F2E8] group-hover:bg-[#103D32] transition-colors flex items-center justify-center text-[#103D32] group-hover:text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono-data text-xs font-semibold text-[#5A685D] group-hover:text-[#103D32]">
                      {cat.count} Reports
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-[#103D32] group-hover:text-[#20B486] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#5A685D] mt-1 leading-relaxed">{cat.desc}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#CAD8CC]/40 text-xs font-semibold text-[#103D32] flex items-center gap-1">
                  <span>Explore category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. How UNJANI Works */}
      <WorkflowSection />

      {/* 4. Featured Community Issues */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-[#DDE8DE] pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C77852] mb-1">
              Live Issues Under Action
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#103D32]">
              Featured community challenges
            </h2>
            <p className="text-sm text-[#4A574E] mt-1">
              Active citizen reports requiring volunteer coordination, liaison response, or material support.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('pulse')}
            className="text-xs font-semibold text-[#103D32] hover:text-[#20B486] inline-flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>View all issues in registry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {issues.slice(0, 3).map((issue) => (
            <div
              key={issue.id}
              className="p-5 rounded-xl bg-white border border-[#DDE8DE] shadow-xs flex flex-col justify-between hover:border-[#103D32]/40 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5A685D]">
                  <span className="font-mono-data font-semibold text-[#103D32]">
                    {issue.referenceNumber}
                  </span>
                  <span className="font-medium capitalize text-[#202923]">
                    {issue.neighborhood}, {issue.county}
                  </span>
                </div>

                <h3
                  onClick={() => setSelectedIssue(issue)}
                  className="font-display text-base font-bold text-[#103D32] hover:text-[#20B486] transition-colors cursor-pointer line-clamp-2"
                >
                  {issue.title}
                </h3>

                <p className="text-xs text-[#4A574E] line-clamp-3 leading-relaxed">
                  {issue.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DDE8DE] flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  {issue.currentStatus.replace('_', ' ')}
                </span>

                <button
                  onClick={() => setSelectedIssue(issue)}
                  className="text-xs font-semibold text-[#103D32] hover:underline cursor-pointer"
                >
                  View Details & Audit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Initiatives & Action Circles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-[#DDE8DE] pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C77852] mb-1">
              Grassroots Momentum
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#103D32]">
              Active community action circles
            </h2>
            <p className="text-sm text-[#4A574E] mt-1">
              Teams on the ground completing verifiable milestones with scheduled volunteer workdays.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('initiatives')}
            className="text-xs font-semibold text-[#103D32] hover:text-[#20B486] inline-flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Browse all initiatives</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((init) => (
            <div
              key={init.id}
              className="rounded-xl bg-white border border-[#DDE8DE] overflow-hidden shadow-xs hover:border-[#103D32]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#103D32]/10 relative">
                  <img
                    src={init.imageUrl}
                    alt={init.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/50 text-white font-mono-data text-[11px] px-2 py-0.5 rounded">
                    {init.referenceNumber}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#5A685D]">
                    <span className="font-semibold text-[#103D32]">{init.neighborhood}</span>
                    <span aria-hidden="true">·</span>
                    <span>{init.county} County</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-[#103D32] line-clamp-2">
                    {init.title}
                  </h3>

                  <p className="text-xs text-[#4A574E] line-clamp-2">{init.goal}</p>

                  <div className="pt-2 flex items-center justify-between text-xs text-[#5A685D]">
                    <span>Enrolled: <strong>{init.volunteersEnrolled} / {init.volunteerCapacity}</strong></span>
                    <span className="text-[11px] text-[#20B486] font-semibold">Active Circle</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveTab('initiatives')}
                  className="w-full py-2 text-xs font-semibold text-[#103D32] bg-[#FBF9F5] hover:bg-[#EBE5D8] rounded-md border border-[#CAD8CC] transition-colors cursor-pointer text-center"
                >
                  Join Action Circle
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Transparency & Governance Pillar */}
      <section className="bg-[#103D32] text-[#F7F2E8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#20B486] mb-1">
              Ethical Architecture
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Transparency, accountability and trust
            </h2>
            <p className="text-sm text-[#CAD8CC] mt-2 leading-relaxed">
              UNJANI is engineered to prevent favoritism, protect citizen rights, and preserve an unalterable civic record for Kenyan communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-[#0B2C24] border border-[#1F4E42] space-y-3">
              <div className="w-10 h-10 rounded-md bg-[#20B486]/10 flex items-center justify-center text-[#20B486]">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white">
                Kenya Data Protection Act, 2019
              </h3>
              <p className="text-xs text-[#CAD8CC] leading-relaxed">
                We practice data minimization. Exact residential addresses are never broadcast. Residents retain the right to anonymous reporting, data rectification, and deletion.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#0B2C24] border border-[#1F4E42] space-y-3">
              <div className="w-10 h-10 rounded-md bg-[#20B486]/10 flex items-center justify-center text-[#20B486]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white">
                Verified vs Claimed Status
              </h3>
              <p className="text-xs text-[#CAD8CC] leading-relaxed">
                An issue is not resolved simply because an agency declares it fixed. Physical photographic proof and community confirmation must be appended to the permanent log.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#0B2C24] border border-[#1F4E42] space-y-3">
              <div className="w-10 h-10 rounded-md bg-[#20B486]/10 flex items-center justify-center text-[#20B486]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white">
                No Paid Suppression of Truth
              </h3>
              <p className="text-xs text-[#CAD8CC] leading-relaxed">
                Public community reports cannot be bought down, silenced, or hidden. Every moderation action and status shift is recorded in the immutable audit log.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Impact Analytics Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-white border border-[#DDE8DE] shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#C77852]">
                Platform Metrics
              </div>
              <h2 className="font-display text-2xl font-bold text-[#103D32]">
                Verified outcomes vs community demand
              </h2>
            </div>
            <span className="text-xs font-mono-data text-[#5A685D] bg-[#FBF9F5] px-3 py-1.5 rounded border border-[#CAD8CC]">
              Demonstration Telemetry · Kenya Release
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-lg bg-[#FBF9F5] border border-[#CAD8CC]/50">
              <div className="font-mono-data text-3xl font-extrabold text-[#103D32] tabular-nums">
                {totalReports}
              </div>
              <div className="text-xs text-[#5A685D] mt-1">Community Reports Logged</div>
            </div>
            <div className="p-4 rounded-lg bg-[#FBF9F5] border border-[#CAD8CC]/50">
              <div className="font-mono-data text-3xl font-extrabold text-[#C77852] tabular-nums">
                {inProgress}
              </div>
              <div className="text-xs text-[#5A685D] mt-1">Under Coordinated Repair</div>
            </div>
            <div className="p-4 rounded-lg bg-[#FBF9F5] border border-[#CAD8CC]/50">
              <div className="font-mono-data text-3xl font-extrabold text-[#20B486] tabular-nums">
                {verifiedDone}
              </div>
              <div className="text-xs text-[#5A685D] mt-1">Independently Verified Resolutions</div>
            </div>
            <div className="p-4 rounded-lg bg-[#FBF9F5] border border-[#CAD8CC]/50">
              <div className="font-mono-data text-3xl font-extrabold text-[#103D32] tabular-nums">
                2.1d
              </div>
              <div className="text-xs text-[#5A685D] mt-1">Median Liaison Acknowledgment</div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C77852] mb-1">
            Clarity & Guidance
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#103D32]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-lg bg-white border border-[#DDE8DE] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-display text-sm font-bold text-[#103D32] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FBF9F5]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#5A685D] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#4A574E] leading-relaxed border-t border-[#CAD8CC]/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 lg:p-14 rounded-2xl bg-[#F7F2E8] border border-[#DDE8DE] text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#103D32] max-w-xl mx-auto leading-tight">
            Ready to make community progress visible?
          </h2>
          <p className="text-sm text-[#4A574E] max-w-xl mx-auto leading-relaxed">
            Join residents, volunteers, and local organizations building a cleaner, safer, and more accountable Kenya.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-6 py-3 text-sm font-semibold text-white bg-[#103D32] hover:bg-[#0B2C24] rounded-md transition-colors shadow-xs cursor-pointer"
            >
              Report a Local Issue
            </button>
            <button
              onClick={() => setActiveTab('initiatives')}
              className="px-6 py-3 text-sm font-semibold text-[#103D32] bg-white hover:bg-[#EBE5D8] border border-[#CAD8CC] rounded-md transition-colors cursor-pointer"
            >
              Join an Action Circle
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
