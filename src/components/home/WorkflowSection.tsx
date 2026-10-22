import React from 'react';
import { Compass, FileText, Users, Wrench, BarChart3, Award } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      verb: 'Scan Local Needs',
      desc: 'Browse community issues mapped across Kenyan counties, verified by residents living on the ground.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Report',
      verb: 'Document & Protect',
      desc: 'Submit photos and details with generalized coordinates that shield private homes and resident identities.',
      icon: FileText,
    },
    {
      num: '03',
      title: 'Connect',
      verb: 'Unite Stakeholders',
      desc: 'Match affected residents with grassroots volunteers, neighborhood leaders, and licensed service liaisons.',
      icon: Users,
    },
    {
      num: '04',
      title: 'Act',
      verb: 'Mobilize Circles',
      desc: 'Form Action Circles with concrete material lists, scheduled volunteer workdays, and verifiable tasks.',
      icon: Wrench,
    },
    {
      num: '05',
      title: 'Track',
      verb: 'Audit Progress',
      desc: 'Follow status changes backed by photographic evidence and independent community confirmation.',
      icon: BarChart3,
    },
    {
      num: '06',
      title: 'Improve',
      verb: 'Sustain Outcomes',
      desc: 'Establish preventative maintenance charters so resolved public assets remain functional long-term.',
      icon: Award,
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-[#F7F2E8]/60 border-b border-[#DDE8DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C77852] mb-1">
            System Architecture
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#103D32]">
            How UNJANI turns concerns into accountability
          </h2>
          <p className="text-sm text-[#4A574E] mt-2">
            A reliable 6-phase lifecycle that moves community challenges from informal complaints to independently audited public solutions.
          </p>
        </div>

        {/* 6-Phase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-lg bg-white border border-[#DDE8DE] hover:border-[#CAD8CC] transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-data text-xs font-bold text-[#20B486] px-2 py-0.5 rounded bg-[#DDE8DE]/40">
                      Phase {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-md bg-[#FBF9F5] flex items-center justify-center text-[#103D32]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#103D32]">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#C77852] mb-2">{step.verb}</div>
                  <p className="text-xs text-[#4A574E] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
