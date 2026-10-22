import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Users2,
  Clock,
  CheckCircle2,
  ThumbsUp,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  UserCircle2,
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    currentUser,
    currentRole,
    issues,
    initiatives,
    volunteers,
    setSelectedIssue,
    setIsReportModalOpen,
    setIsInitiativeModalOpen,
    setActiveTab,
  } = useApp();

  // Issues supported or submitted by user
  const myReports = issues.filter(
    (i) => i.reporterName === currentUser.name || (!i.reporterAnonymous && currentUser.role === 'resident')
  );
  const mySupported = issues.filter((i) => i.userSupported);
  const myInitiatives = initiatives.filter((i) => i.userJoined);
  const myVolunteerApps = volunteers.filter((v) => v.userApplied);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="p-6 rounded-xl bg-white border border-[#DDE8DE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#103D32] text-[#F7F2E8] flex items-center justify-center font-display text-xl font-bold">
            {currentUser.avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-[#103D32]">
                {currentUser.name}
              </h1>
              <span className="text-xs uppercase font-mono-data tracking-wider text-[#C77852] font-semibold">
                ({currentRole.replace('_', ' ')})
              </span>
            </div>
            <p className="text-xs text-[#5A685D] mt-0.5">
              {currentUser.email} · {currentUser.county} County
            </p>
            {currentUser.bio && (
              <p className="text-xs text-[#4A574E] mt-1 max-w-lg">{currentUser.bio}</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#103D32] hover:bg-[#0B2C24] rounded-md transition-colors cursor-pointer"
          >
            Report Local Issue
          </button>
          <button
            onClick={() => setIsInitiativeModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-[#103D32] bg-[#DDE8DE] hover:bg-[#CAD8CC] rounded-md transition-colors cursor-pointer"
          >
            Start Initiative
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white border border-[#DDE8DE] shadow-xs">
          <div className="text-xs text-[#5A685D]">Reports Logged</div>
          <div className="font-mono-data text-2xl font-bold text-[#103D32] mt-1 tabular-nums">
            {myReports.length}
          </div>
        </div>
        <div className="p-4 rounded-lg bg-white border border-[#DDE8DE] shadow-xs">
          <div className="text-xs text-[#5A685D]">Endorsed Priorities</div>
          <div className="font-mono-data text-2xl font-bold text-[#C77852] mt-1 tabular-nums">
            {mySupported.length}
          </div>
        </div>
        <div className="p-4 rounded-lg bg-white border border-[#DDE8DE] shadow-xs">
          <div className="text-xs text-[#5A685D]">Action Circles</div>
          <div className="font-mono-data text-2xl font-bold text-[#20B486] mt-1 tabular-nums">
            {myInitiatives.length}
          </div>
        </div>
        <div className="p-4 rounded-lg bg-white border border-[#DDE8DE] shadow-xs">
          <div className="text-xs text-[#5A685D]">Volunteer Hours</div>
          <div className="font-mono-data text-2xl font-bold text-[#103D32] mt-1 tabular-nums">
            {currentUser.volunteerHours}h
          </div>
        </div>
      </div>

      {/* Two Column Layout: Action Circles & Followed Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: My Action Circles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#DDE8DE] pb-2">
            <h2 className="font-display text-lg font-bold text-[#103D32]">
              Active Action Circles ({myInitiatives.length})
            </h2>
            <button
              onClick={() => setActiveTab('initiatives')}
              className="text-xs text-[#C77852] hover:underline font-semibold cursor-pointer"
            >
              Browse all
            </button>
          </div>

          {myInitiatives.length === 0 ? (
            <div className="p-6 text-center bg-white rounded-lg border border-[#DDE8DE] text-xs text-[#5A685D]">
              You have not joined any community action circles yet.
            </div>
          ) : (
            myInitiatives.map((init) => (
              <div
                key={init.id}
                className="p-4 rounded-lg bg-white border border-[#DDE8DE] space-y-2 hover:border-[#103D32]/40 transition-all"
              >
                <div className="flex items-center justify-between text-xs text-[#5A685D]">
                  <span className="font-mono-data font-semibold text-[#103D32]">
                    {init.referenceNumber}
                  </span>
                  <span>{init.neighborhood}, {init.county}</span>
                </div>
                <h3 className="font-bold text-sm text-[#103D32]">
                  {init.title}
                </h3>
                <p className="text-xs text-[#4A574E] line-clamp-2">
                  {init.goal}
                </p>
                <div className="pt-2 border-t border-[#DDE8DE] flex items-center justify-between text-xs text-[#5A685D]">
                  <span>Organized by {init.organizerName}</span>
                  <span className="font-mono-data text-[#20B486] font-semibold">Enrolled Member ✓</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Followed / Supported Reports */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#DDE8DE] pb-2">
            <h2 className="font-display text-lg font-bold text-[#103D32]">
              Tracked Issues ({mySupported.length})
            </h2>
            <button
              onClick={() => setActiveTab('pulse')}
              className="text-xs text-[#C77852] hover:underline font-semibold cursor-pointer"
            >
              Community pulse
            </button>
          </div>

          {mySupported.length === 0 ? (
            <div className="p-6 text-center bg-white rounded-lg border border-[#DDE8DE] text-xs text-[#5A685D]">
              You have not endorsed any reports yet.
            </div>
          ) : (
            mySupported.map((issue) => (
              <div
                key={issue.id}
                className="p-4 rounded-lg bg-white border border-[#DDE8DE] space-y-2 hover:border-[#103D32]/40 transition-all"
              >
                <div className="flex items-center justify-between text-xs text-[#5A685D]">
                  <span className="font-mono-data font-semibold text-[#103D32]">
                    {issue.referenceNumber}
                  </span>
                  <span className="capitalize font-medium text-[#103D32]">
                    {issue.currentStatus.replace('_', ' ')}
                  </span>
                </div>
                <h3
                  onClick={() => setSelectedIssue(issue)}
                  className="font-bold text-sm text-[#103D32] hover:text-[#20B486] cursor-pointer"
                >
                  {issue.title}
                </h3>
                <div className="pt-2 border-t border-[#DDE8DE] flex items-center justify-between text-xs text-[#5A685D]">
                  <span>{issue.neighborhood}, {issue.county}</span>
                  <button
                    onClick={() => setSelectedIssue(issue)}
                    className="text-[#103D32] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
