import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Download,
  AlertCircle,
  FileText,
  MapPin,
  Users2,
  ArrowRight,
} from 'lucide-react';

export const OrganizationPortal: React.FC = () => {
  const { organizations, issues, initiatives, setSelectedIssue, showNotification, currentRole } = useApp();

  const [activeOrgId, setActiveOrgId] = useState(organizations[0]?.id || 'org-1');
  const [isApplyingVerification, setIsApplyingVerification] = useState(false);
  const [certNumber, setCertNumber] = useState('');

  const currentOrg = organizations.find((o) => o.id === activeOrgId) || organizations[0];

  // Assigned issues
  const assignedIssues = issues.filter(
    (i) => i.assignedOrgId === currentOrg.id || i.assignedOrgName?.includes(currentOrg.name)
  );

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNumber.trim()) return;
    setIsApplyingVerification(false);
    showNotification(
      'success',
      'Organization accreditation documents submitted for UNJANI trust audit.'
    );
  };

  const exportReport = () => {
    const reportData = `UNJANI KENYA - CIVIC LIAISON REPORT
Organization: ${currentOrg.name}
County: ${currentOrg.county}
Verification Status: ${currentOrg.verificationStatus}
Total Assigned Issues: ${assignedIssues.length}
Resolved Issues: ${currentOrg.resolvedIssuesCount}
Median Response Time: ${currentOrg.medianResponseDays} days

Date Generated: ${new Date().toISOString()}
Data Protection Notice: Generated in compliance with the Kenya Data Protection Act, 2019.`;

    const blob = new Blob([reportData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentOrg.name.replace(/\s+/g, '_')}_Civic_Report.txt`;
    link.click();
    showNotification('success', 'Civic liaison report downloaded.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Org Selector */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#DDE8DE] pb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C77852] mb-1">
            Institutional Workspace
          </div>
          <h1 className="font-display text-3xl font-extrabold text-[#103D32]">
            Community Organization Desk
          </h1>
          <p className="text-sm text-[#4A574E] mt-1">
            Authorized portal for community-based organizations, public utility liaisons, and environmental NGOs in Kenya.
          </p>
        </div>

        {/* Org Selector & Export Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-[#5A685D]">Liaison Entity:</label>
            <select
              value={activeOrgId}
              onChange={(e) => setActiveOrgId(e.target.value)}
              className="text-xs p-2 bg-white border border-[#CAD8CC] rounded-md text-[#202923] focus:ring-1 focus:ring-[#103D32]"
            >
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name} ({org.county})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={exportReport}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#103D32] bg-white hover:bg-[#F2EFE9] border border-[#CAD8CC] rounded-md transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Civic Log</span>
          </button>
        </div>
      </div>

      {/* Organization Profile Overview Card */}
      <div className="p-6 rounded-xl bg-white border border-[#DDE8DE] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-[#103D32]">
                {currentOrg.name}
              </h2>
              {currentOrg.verificationStatus === 'verified' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#20B486] bg-[#20B486]/10 px-2 py-0.5 rounded border border-[#20B486]/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Civic Entity</span>
                </span>
              ) : currentOrg.verificationStatus === 'pending' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Verification Pending Audit</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                  <span>Unverified Organization</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A685D]">
              <span>{currentOrg.type}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentOrg.county} County Jurisdiction</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>Liaison: {currentOrg.contactPerson}</span>
            </div>
          </div>

          {currentOrg.verificationStatus !== 'verified' && (
            <button
              onClick={() => setIsApplyingVerification(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#103D32] hover:bg-[#0B2C24] rounded-md transition-colors cursor-pointer shrink-0"
            >
              Submit Registration Documents
            </button>
          )}
        </div>

        <p className="text-xs text-[#4A574E] leading-relaxed pt-2 border-t border-[#DDE8DE]">
          {currentOrg.description}
        </p>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#DDE8DE]">
          <div className="p-3 rounded bg-[#FBF9F5] border border-[#CAD8CC]/60">
            <div className="text-[11px] text-[#5A685D]">Assigned Queue</div>
            <div className="font-mono-data text-xl font-bold text-[#103D32] mt-0.5 tabular-nums">
              {assignedIssues.length}
            </div>
          </div>
          <div className="p-3 rounded bg-[#FBF9F5] border border-[#CAD8CC]/60">
            <div className="text-[11px] text-[#5A685D]">Audited Resolutions</div>
            <div className="font-mono-data text-xl font-bold text-[#20B486] mt-0.5 tabular-nums">
              {currentOrg.resolvedIssuesCount}
            </div>
          </div>
          <div className="p-3 rounded bg-[#FBF9F5] border border-[#CAD8CC]/60">
            <div className="text-[11px] text-[#5A685D]">Median Response</div>
            <div className="font-mono-data text-xl font-bold text-[#103D32] mt-0.5 tabular-nums">
              {currentOrg.medianResponseDays}d
            </div>
          </div>
          <div className="p-3 rounded bg-[#FBF9F5] border border-[#CAD8CC]/60">
            <div className="text-[11px] text-[#5A685D]">Active Initiatives</div>
            <div className="font-mono-data text-xl font-bold text-[#C77852] mt-0.5 tabular-nums">
              {currentOrg.activeInitiativesCount}
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Issues Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-[#103D32]">
            Assigned Community Issues ({assignedIssues.length})
          </h3>
          <span className="text-xs text-[#5A685D]">
            Official responses require authorized credentials
          </span>
        </div>

        {assignedIssues.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg border border-[#DDE8DE] text-xs text-[#5A685D]">
            No issues currently assigned to this liaison desk.
          </div>
        ) : (
          <div className="grid gap-3">
            {assignedIssues.map((issue) => (
              <div
                key={issue.id}
                className="p-4 rounded-lg bg-white border border-[#DDE8DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#103D32]/40 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#5A685D]">
                    <span className="font-mono-data font-semibold text-[#103D32]">
                      {issue.referenceNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{issue.neighborhood}, {issue.county}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize font-semibold text-[#103D32]">{issue.currentStatus.replace('_', ' ')}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-[#103D32]">
                    {issue.title}
                  </h4>
                  <p className="text-xs text-[#4A574E] line-clamp-1">
                    {issue.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedIssue(issue)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#103D32] bg-[#DDE8DE] hover:bg-[#CAD8CC] rounded-md transition-colors cursor-pointer shrink-0 self-start sm:self-center"
                >
                  <span>Open Dossier & Update</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verification Modal */}
      {isApplyingVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#103D32]/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl border border-[#DDE8DE] space-y-4 text-xs">
            <h3 className="font-display text-base font-bold text-[#103D32]">
              Civic Entity Verification Application
            </h3>
            <p className="text-[#5A685D]">
              In accordance with Kenyan non-profit regulations, provide your CBO registration certificate or NGO coordination board reference number.
            </p>
            <form onSubmit={handleVerificationSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold text-[#103D32] mb-1">
                  Registration / Gazette Reference Number
                </label>
                <input
                  type="text"
                  value={certNumber}
                  onChange={(e) => setCertNumber(e.target.value)}
                  placeholder="e.g. CBO/NRB/WEST/2024/091"
                  className="w-full p-2 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsApplyingVerification(false)}
                  className="px-3 py-1.5 text-[#5A685D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#103D32] text-white rounded-md font-semibold"
                >
                  Submit for Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
