import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IssueItem, IssueStatus } from '../../types';
import {
  X,
  MapPin,
  Calendar,
  ThumbsUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  AlertTriangle,
  Share2,
  Flag,
  FileCheck2,
  Send,
} from 'lucide-react';

interface IssueDetailModalProps {
  issue: IssueItem;
  onClose: () => void;
}

export const IssueDetailModal: React.FC<IssueDetailModalProps> = ({ issue, onClose }) => {
  const { supportIssue, updateIssueStatus, currentRole, currentUser, showNotification } = useApp();

  const [activeTab, setActiveTab] = useState<'timeline' | 'action' | 'report'>('timeline');
  const [newStatus, setNewStatus] = useState<IssueStatus>(issue.currentStatus);
  const [statusComment, setStatusComment] = useState('');
  const [isVerifiedSignoff, setIsVerifiedSignoff] = useState(false);
  const [copied, setCopied] = useState(false);

  // Correction / abuse report state
  const [correctionNote, setCorrectionNote] = useState('');
  const [correctionSubmitted, setCorrectionSubmitted] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    showNotification('info', `Shareable link for ${issue.referenceNumber} copied to clipboard.`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusComment.trim()) {
      showNotification('error', 'Please provide a justification comment for the audit trail.');
      return;
    }
    updateIssueStatus(issue.id, newStatus, statusComment, isVerifiedSignoff);
    setStatusComment('');
    setActiveTab('timeline');
  };

  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionNote.trim()) return;
    setCorrectionSubmitted(true);
    showNotification('success', 'Correction report submitted to moderation review queue.');
  };

  const canManageStatus =
    currentRole === 'admin' || currentRole === 'moderator' || currentRole === 'org_rep';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#103D32]/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-xl border border-[#DDE8DE] overflow-hidden my-8">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#DDE8DE] flex items-center justify-between bg-[#FBF9F5]">
          <div className="flex items-center gap-3">
            <span className="font-mono-data text-xs font-bold text-[#103D32] bg-[#DDE8DE] px-2.5 py-1 rounded">
              {issue.referenceNumber}
            </span>
            <span className="text-xs text-[#5A685D] uppercase tracking-wider font-semibold">
              Civic Issue Dossier
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-[#5A685D] hover:text-[#103D32] rounded hover:bg-[#DDE8DE]/40 transition-colors cursor-pointer"
              title="Share issue reference"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5A685D] hover:text-[#103D32] rounded hover:bg-[#DDE8DE]/40 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A685D] mb-2">
              <span className="font-semibold text-[#103D32] capitalize">{issue.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{issue.neighborhood}, {issue.town}, {issue.county} County</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Observed {issue.dateObserved}</span>
              </span>
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#103D32]">
              {issue.title}
            </h2>
          </div>

          {/* Image Evidence (if present) */}
          {issue.imageUrl && (
            <div className="relative rounded-lg overflow-hidden border border-[#DDE8DE] bg-[#F7F2E8]">
              <img
                src={issue.imageUrl}
                alt={issue.title}
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-2.5 text-[11px] text-[#4A574E] bg-white border-t border-[#DDE8DE] flex items-center justify-between">
                <span>Photographic evidence attached during field submission</span>
                <span className="font-mono-data">Verified unaltered</span>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="p-4 rounded-lg bg-[#FBF9F5] border border-[#DDE8DE] space-y-2">
            <h4 className="text-xs font-semibold text-[#103D32] uppercase tracking-wider">
              Issue Description & Field Context
            </h4>
            <p className="text-sm text-[#3B483F] leading-relaxed whitespace-pre-line">
              {issue.description}
            </p>
            <div className="pt-2 text-xs text-[#5A685D] flex items-center gap-2 border-t border-[#CAD8CC]/50">
              <ShieldCheck className="w-3.5 h-3.5 text-[#20B486]" />
              <span>
                Reported by: {issue.reporterAnonymous ? 'Anonymous Resident (Identity shielded under KDPA 2019)' : issue.reporterName}
              </span>
            </div>
          </div>

          {/* Support and quick action strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-lg bg-white border border-[#DDE8DE]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => supportIssue(issue.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                  issue.userSupported
                    ? 'bg-[#103D32] text-white border-[#103D32]'
                    : 'bg-[#FBF9F5] text-[#202923] border-[#CAD8CC] hover:bg-[#EBE5D8]'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="font-mono-data tabular-nums">{issue.supportCount}</span>
                <span>{issue.userSupported ? 'Endorsed' : 'Endorse Priority'}</span>
              </button>

              {issue.verifiedResolution && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#20B486]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Independently Verified Resolution</span>
                </div>
              )}
            </div>

            {issue.assignedOrgName ? (
              <div className="text-xs text-[#4A574E] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#103D32]" />
                <span>Assigned Liaison: <strong>{issue.assignedOrgName}</strong></span>
              </div>
            ) : (
              <span className="text-xs text-[#7A8A7F] italic">Unassigned · Open for community circle</span>
            )}
          </div>

          {/* Tabs for Timeline vs Management vs Correction */}
          <div className="border-b border-[#DDE8DE] flex items-center gap-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`pb-2.5 transition-colors cursor-pointer ${
                activeTab === 'timeline'
                  ? 'border-b-2 border-[#103D32] text-[#103D32]'
                  : 'text-[#5A685D] hover:text-[#103D32]'
              }`}
            >
              Audit Timeline ({issue.timeline.length})
            </button>
            {canManageStatus && (
              <button
                onClick={() => setActiveTab('action')}
                className={`pb-2.5 transition-colors cursor-pointer ${
                  activeTab === 'action'
                    ? 'border-b-2 border-[#103D32] text-[#103D32]'
                    : 'text-[#5A685D] hover:text-[#103D32]'
                }`}
              >
                Update Lifecycle Status
              </button>
            )}
            <button
              onClick={() => setActiveTab('report')}
              className={`pb-2.5 transition-colors cursor-pointer ${
                activeTab === 'report'
                  ? 'border-b-2 border-[#103D32] text-[#103D32]'
                  : 'text-[#5A685D] hover:text-[#103D32]'
              }`}
            >
              Request Correction / Report Abuse
            </button>
          </div>

          {/* Tab 1: Audit Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE8DE]">
                {issue.timeline.map((event, idx) => (
                  <div key={event.id} className="relative space-y-1">
                    {/* Node bullet */}
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white bg-[#103D32] shadow-xs" />
                    
                    <div className="flex flex-wrap items-center justify-between text-xs text-[#5A685D] gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#103D32] capitalize">
                          {event.status.replace('_', ' ')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#3B483F] font-medium">{event.authorName}</span>
                        <span className="text-[11px] text-[#7A8A7F]">({event.authorRole})</span>
                      </div>
                      <span className="font-mono-data text-[11px]">{event.date}</span>
                    </div>

                    <p className="text-xs text-[#4A574E] bg-[#FBF9F5] p-2.5 rounded border border-[#EBE5D8] leading-relaxed">
                      {event.comment}
                    </p>

                    {event.verified && (
                      <div className="flex items-center gap-1 text-[11px] text-[#20B486] font-medium pt-0.5">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>Sign-off audited and validated against field evidence.</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Update Lifecycle Status */}
          {activeTab === 'action' && canManageStatus && (
            <form onSubmit={handleStatusSubmit} className="space-y-4 p-4 rounded-lg bg-[#FBF9F5] border border-[#CAD8CC]">
              <div className="text-xs font-semibold text-[#103D32]">
                Authorized Status Transition for {currentUser.name} ({currentRole.replace('_', ' ')})
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B483F] mb-1">
                  Select New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as IssueStatus)}
                  className="w-full text-xs p-2.5 bg-white border border-[#CAD8CC] rounded-md text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#103D32]"
                >
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="community_feedback">Community Feedback</option>
                  <option value="reopened">Reopened</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B483F] mb-1">
                  Justification / Work Log (Immutable Audit Entry)
                </label>
                <textarea
                  rows={3}
                  value={statusComment}
                  onChange={(e) => setStatusComment(e.target.value)}
                  placeholder="Detail procurement progress, contractor mobilization, or reasons for rejection..."
                  className="w-full text-xs p-2.5 bg-white border border-[#CAD8CC] rounded-md text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#103D32]"
                  required
                />
              </div>

              {newStatus === 'resolved' && (
                <label className="flex items-center gap-2 text-xs text-[#103D32] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVerifiedSignoff}
                    onChange={(e) => setIsVerifiedSignoff(e.target.checked)}
                    className="rounded text-[#103D32] focus:ring-[#103D32]"
                  />
                  <span>Perform Independent Physical Verification Sign-off</span>
                </label>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('timeline')}
                  className="px-3 py-1.5 text-xs text-[#5A685D] hover:text-[#103D32] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#103D32] hover:bg-[#0B2C24] rounded-md transition-colors cursor-pointer"
                >
                  Commit Status Transition
                </button>
              </div>
            </form>
          )}

          {/* Tab 3: Request Correction / Abuse Report */}
          {activeTab === 'report' && (
            <div className="space-y-4 p-4 rounded-lg bg-[#FBF9F5] border border-[#CAD8CC]">
              {correctionSubmitted ? (
                <div className="p-4 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#20B486] mx-auto" />
                  <h4 className="font-display text-sm font-bold text-[#103D32]">
                    Report Received
                  </h4>
                  <p className="text-xs text-[#5A685D]">
                    Thank you. UNJANI community moderators review all correction requests within 24 hours in adherence to truth in civic reporting standards.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCorrectionSubmit} className="space-y-3">
                  <div className="text-xs font-semibold text-[#103D32]">
                    Report Inaccuracy or Sensitive Private Information
                  </div>
                  <p className="text-xs text-[#5A685D]">
                    If this report accidentally includes private residential details, incorrect photos, or duplicated issues, submit a notice below.
                  </p>
                  <textarea
                    rows={3}
                    value={correctionNote}
                    onChange={(e) => setCorrectionNote(e.target.value)}
                    placeholder="Describe the discrepancy or privacy issue..."
                    className="w-full text-xs p-2.5 bg-white border border-[#CAD8CC] rounded-md text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#103D32]"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#C77852] hover:bg-[#B36440] rounded-md transition-colors cursor-pointer"
                    >
                      Submit Notice
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#FBF9F5] border-t border-[#DDE8DE] flex items-center justify-between text-xs text-[#5A685D]">
          <span>UNJANI Civic Verification Standard · Kenya</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-[#103D32] hover:bg-[#DDE8DE]/50 rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
