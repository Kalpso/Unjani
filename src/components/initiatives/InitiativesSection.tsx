import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InitiativeItem } from '../../types';
import {
  Calendar,
  Users2,
  CheckCircle2,
  Clock,
  Plus,
  MapPin,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Package,
} from 'lucide-react';

export const InitiativesSection: React.FC = () => {
  const { initiatives, joinInitiative, setIsInitiativeModalOpen } = useApp();
  const [selectedInit, setSelectedInit] = useState<InitiativeItem | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DDE8DE] pb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C77852] mb-1">
            Action Circles & Projects
          </div>
          <h1 className="font-display text-3xl font-extrabold text-[#103D32]">
            Community-Led Initiatives
          </h1>
          <p className="text-sm text-[#4A574E] mt-1 max-w-2xl">
            Coordinated action teams working together on tangible neighborhood improvements — from clean water feeder repairs to riparian reforestations.
          </p>
        </div>

        <button
          onClick={() => setIsInitiativeModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#F7F2E8] bg-[#103D32] hover:bg-[#0B2C24] rounded-md transition-colors cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New Action Circle</span>
        </button>
      </div>

      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initiatives.map((init) => {
          const completedMilestones = init.milestones.filter((m) => m.completed).length;
          const progressPercent = Math.round(
            (completedMilestones / Math.max(1, init.milestones.length)) * 100
          );

          return (
            <div
              key={init.id}
              className="rounded-xl bg-white border border-[#DDE8DE] overflow-hidden shadow-xs hover:border-[#103D32]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[16/10] bg-[#103D32]/10 overflow-hidden">
                  <img
                    src={init.imageUrl}
                    alt={init.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="font-mono-data text-[11px] font-bold text-white bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded border border-white/20">
                      {init.referenceNumber}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#20B486]" />
                      <span className="truncate">{init.neighborhood}, {init.county}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-[#5A685D]">
                    <span className="font-semibold text-[#103D32] capitalize">{init.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{init.status}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-data">{init.startDate}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-[#103D32] leading-snug line-clamp-2">
                    {init.title}
                  </h3>

                  {/* Goal */}
                  <p className="text-xs text-[#4A574E] leading-relaxed line-clamp-2">
                    <strong>Goal:</strong> {init.goal}
                  </p>

                  {/* Milestones Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs text-[#5A685D]">
                      <span>Milestones Completed</span>
                      <span className="font-mono-data font-semibold text-[#103D32]">
                        {completedMilestones} / {init.milestones.length} ({progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#EBE5D8] overflow-hidden">
                      <div
                        className="h-full bg-[#20B486] transition-all duration-500 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Volunteer Capacity */}
                  <div className="flex items-center justify-between text-xs text-[#5A685D] pt-2 border-t border-[#DDE8DE]">
                    <div className="flex items-center gap-1.5">
                      <Users2 className="w-4 h-4 text-[#C77852]" />
                      <span>Volunteers:</span>
                      <span className="font-mono-data font-bold text-[#103D32]">
                        {init.volunteersEnrolled} / {init.volunteerCapacity}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#7A8A7F]">
                      Organized by {init.organizerName.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 border-t border-transparent flex items-center justify-between gap-3">
                <button
                  onClick={() => joinInitiative(init.id)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md border transition-colors cursor-pointer text-center ${
                    init.userJoined
                      ? 'bg-[#103D32] text-white border-[#103D32]'
                      : 'bg-[#FBF9F5] text-[#103D32] border-[#CAD8CC] hover:bg-[#EBE5D8]'
                  }`}
                >
                  {init.userJoined ? 'Joined Action Circle' : 'Join Action Circle'}
                </button>

                <button
                  onClick={() => setSelectedInit(init)}
                  className="px-3 py-2 text-xs font-semibold text-[#103D32] hover:bg-[#DDE8DE]/50 rounded border border-[#CAD8CC] cursor-pointer"
                  title="View detailed milestones & materials"
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Initiative Modal */}
      {selectedInit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#103D32]/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl border border-[#DDE8DE] overflow-hidden my-6">
            <div className="px-6 py-4 border-b border-[#DDE8DE] bg-[#FBF9F5] flex items-center justify-between">
              <div>
                <span className="font-mono-data text-xs text-[#20B486] font-bold">
                  {selectedInit.referenceNumber}
                </span>
                <h3 className="font-display text-lg font-bold text-[#103D32]">
                  {selectedInit.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInit(null)}
                className="p-1 text-[#5A685D] hover:text-[#103D32] rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
              <div>
                <h4 className="font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                  Organizer & Governance
                </h4>
                <p className="text-[#4A574E]">
                  Lead: <strong>{selectedInit.organizerName}</strong> ({selectedInit.organizerOrg})
                </p>
                <div className="text-[#5A685D] mt-1">
                  Location: {selectedInit.neighborhood}, {selectedInit.county} County
                </div>
              </div>

              {/* Milestones Checklist */}
              <div>
                <h4 className="font-semibold text-[#103D32] uppercase tracking-wider mb-2">
                  Project Milestones & Verification Timeline
                </h4>
                <div className="space-y-2">
                  {selectedInit.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-2.5 rounded bg-[#FBF9F5] border border-[#DDE8DE] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 ${m.completed ? 'text-[#20B486]' : 'text-[#A3B8A5]'}`}
                        />
                        <span className={m.completed ? 'line-through text-[#7A8A7F]' : 'font-medium text-[#202923]'}>
                          {m.title}
                        </span>
                      </div>
                      <span className="font-mono-data text-[11px] text-[#5A685D]">Due {m.dueDate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials Checklist */}
              <div>
                <h4 className="font-semibold text-[#103D32] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#C77852]" />
                  <span>Required Tools & Materials</span>
                </h4>
                <ul className="space-y-1 list-disc list-inside text-[#4A574E]">
                  {selectedInit.materialsNeeded.map((mat, i) => (
                    <li key={i}>{mat}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-[#FBF9F5] border-t border-[#DDE8DE] flex justify-end">
              <button
                onClick={() => setSelectedInit(null)}
                className="px-4 py-1.5 text-xs font-semibold text-[#103D32] bg-[#DDE8DE] rounded hover:bg-[#CAD8CC] cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
