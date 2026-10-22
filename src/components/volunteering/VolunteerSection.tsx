import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  MapPin,
  CheckCircle2,
  Users2,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Search,
} from 'lucide-react';

const SKILL_CATEGORIES = [
  'All Skills',
  'Infrastructure & Trades',
  'Environmental Activities',
  'Mentorship & Education',
  'Research & Documentation',
  'Event Coordination & Safety',
  'Community Outreach',
  'Digital Literacy',
];

export const VolunteerSection: React.FC = () => {
  const { volunteers, applyForVolunteer } = useApp();
  const [selectedSkill, setSelectedSkill] = useState('All Skills');
  const [search, setSearch] = useState('');

  const filteredOpportunities = volunteers.filter((vol) => {
    const matchesSkill = selectedSkill === 'All Skills' || vol.skillCategory === selectedSkill;
    const matchesSearch =
      search === '' ||
      vol.title.toLowerCase().includes(search.toLowerCase()) ||
      vol.initiativeTitle.toLowerCase().includes(search.toLowerCase()) ||
      vol.county.toLowerCase().includes(search.toLowerCase());
    return matchesSkill && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#DDE8DE] pb-6 space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#C77852]">
          Skills Exchange & Civic Service
        </div>
        <h1 className="font-display text-3xl font-extrabold text-[#103D32]">
          Volunteer Opportunities
        </h1>
        <p className="text-sm text-[#4A574E] max-w-2xl">
          Lend your technical, organizational, or physical skills to community action teams. All roles are volunteer-led with verified safety and logistical backing.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-lg bg-white border border-[#DDE8DE] shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#5A685D] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role title, initiative, or county..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#FBF9F5] border border-[#CAD8CC] rounded-md focus:outline-none focus:ring-1 focus:ring-[#103D32] text-[#202923]"
          />
        </div>

        {/* Skill Category Selector Tabs (Interactive filter buttons) */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {SKILL_CATEGORIES.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedSkill === skill
                  ? 'bg-[#103D32] text-[#F7F2E8]'
                  : 'bg-[#FBF9F5] text-[#4A574E] hover:bg-[#DDE8DE]/60 border border-[#CAD8CC]'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map((op) => (
          <div
            key={op.id}
            className="p-6 rounded-xl bg-white border border-[#DDE8DE] shadow-xs hover:border-[#103D32]/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Unboxed Metadata */}
              <div className="flex flex-wrap items-center justify-between text-xs text-[#5A685D] gap-2">
                <span className="font-semibold text-[#103D32]">{op.skillCategory}</span>
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#5A685D]" />
                  <span>{op.isRemote ? 'Remote / Online' : `${op.county} County`}</span>
                </div>
              </div>

              {/* Title & Initiative */}
              <div>
                <h3 className="font-display text-lg font-bold text-[#103D32]">
                  {op.title}
                </h3>
                <div className="text-xs text-[#C77852] font-medium mt-0.5">
                  Supporting: {op.initiativeTitle}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#4A574E] leading-relaxed">
                {op.description}
              </p>

              {/* Commitment and slots */}
              <div className="pt-2 border-t border-[#DDE8DE] flex flex-wrap items-center justify-between text-xs text-[#5A685D] gap-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#5A685D]" />
                  <span>{op.timeCommitment}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users2 className="w-3.5 h-3.5 text-[#5A685D]" />
                  <span>
                    Slots: <strong className="font-mono-data text-[#103D32]">{op.appliedSlots} / {op.openSlots}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Application Action Button */}
            <div className="pt-2 border-t border-[#DDE8DE] flex items-center justify-between">
              <span className="text-[11px] text-[#7A8A7F]">
                Organizer: {op.organizer}
              </span>

              <button
                onClick={() => applyForVolunteer(op.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  op.userApplied
                    ? 'bg-[#20B486] text-white'
                    : 'bg-[#103D32] hover:bg-[#0B2C24] text-white'
                }`}
              >
                {op.userApplied ? 'Applied ✓' : 'Express Interest'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
