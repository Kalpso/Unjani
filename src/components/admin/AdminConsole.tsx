import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Building2,
  UserCheck,
  AlertTriangle,
  History,
  Lock,
} from 'lucide-react';

export const AdminConsole: React.FC = () => {
  const {
    issues,
    auditLogs,
    organizations,
    verifyOrganization,
    updateIssueStatus,
    setSelectedIssue,
    currentRole,
    currentUser,
    showNotification,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'queue' | 'orgs' | 'audit'>('queue');

  // Issues pending review
  const pendingIssues = issues.filter(
    (i) => i.currentStatus === 'submitted' || i.currentStatus === 'under_review'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DDE8DE] pb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C77852] mb-1">
            Governance & Trust Engine
          </div>
          <h1 className="font-display text-3xl font-extrabold text-[#103D32]">
            Administration & Content Moderation
          </h1>
          <p className="text-sm text-[#4A574E] mt-1">
            Audit queue, truth-in-reporting compliance, and Kenya Data Protection Act oversight.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#103D32] bg-[#DDE8DE]/60 px-3 py-1.5 rounded-md border border-[#CAD8CC]">
          <Lock className="w-3.5 h-3.5 text-[#103D32]" />
          <span>Active Auditor: <strong>{currentUser.name}</strong> ({currentRole})</span>
        </div>
      </div>

      {/* Navigation Tabs (Interactive filter tabs) */}
      <div className="flex border-b border-[#DDE8DE] gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('queue')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'queue'
              ? 'border-b-2 border-[#103D32] text-[#103D32]'
              : 'text-[#5A685D] hover:text-[#103D32]'
          }`}
        >
          Issue Review Queue ({pendingIssues.length})
        </button>

        <button
          onClick={() => setActiveTab('orgs')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'orgs'
              ? 'border-b-2 border-[#103D32] text-[#103D32]'
              : 'text-[#5A685D] hover:text-[#103D32]'
          }`}
        >
          Organization Verifications ({organizations.length})
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'audit'
              ? 'border-b-2 border-[#103D32] text-[#103D32]'
              : 'text-[#5A685D] hover:text-[#103D32]'
          }`}
        >
          Immutable Audit Log ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: Review Queue */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div className="text-xs text-[#5A685D]">
            Review newly submitted community reports before they are dispatched to county desks. Verify that coordinates are generalized and private phone numbers or personal faces are shielded.
          </div>

          {pendingIssues.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-lg border border-[#DDE8DE] text-xs text-[#5A685D]">
              No reports currently waiting in the moderation review queue.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-5 rounded-lg bg-white border border-[#DDE8DE] space-y-3 hover:border-[#103D32]/40 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#5A685D] gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-data font-bold text-[#103D32]">
                        {issue.referenceNumber}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{issue.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{issue.neighborhood}, {issue.county}</span>
                    </div>

                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Status: {issue.currentStatus}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-[#103D32]">
                    {issue.title}
                  </h3>

                  <p className="text-xs text-[#4A574E] leading-relaxed">
                    {issue.description}
                  </p>

                  <div className="pt-3 border-t border-[#DDE8DE] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-[#5A685D]">
                      Reporter: {issue.reporterAnonymous ? 'Anonymous' : issue.reporterName}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedIssue(issue)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#103D32] bg-[#FBF9F5] border border-[#CAD8CC] rounded hover:bg-[#EBE5D8] cursor-pointer"
                      >
                        Inspect Dossier
                      </button>

                      <button
                        onClick={() =>
                          updateIssueStatus(
                            issue.id,
                            'acknowledged',
                            'Moderator verified location validity and lack of duplication. Dispatched to regional desk.'
                          )
                        }
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#103D32] hover:bg-[#0B2C24] rounded cursor-pointer"
                      >
                        Approve & Dispatch
                      </button>

                      <button
                        onClick={() =>
                          updateIssueStatus(
                            issue.id,
                            'rejected',
                            'Duplicate report or insufficient location specificity.'
                          )
                        }
                        className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Organizations */}
      {activeTab === 'orgs' && (
        <div className="space-y-4">
          <div className="text-xs text-[#5A685D]">
            Review community organizations applying for verified liaison status. Verification requires confirming registration under the Societies Act or NGO Board of Kenya.
          </div>

          <div className="bg-white rounded-lg border border-[#DDE8DE] overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBF9F5] border-b border-[#DDE8DE] text-[#5A685D] uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Organization Name</th>
                  <th className="py-3 px-4">Type & Jurisdiction</th>
                  <th className="py-3 px-4">Contact Liaison</th>
                  <th className="py-3 px-4">Verification Status</th>
                  <th className="py-3 px-4 text-right">Moderator Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE8DE]">
                {organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-[#FBF9F5]/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#103D32]">
                      {org.name}
                    </td>
                    <td className="py-3.5 px-4 text-[#4A574E]">
                      {org.type} · {org.county} County
                    </td>
                    <td className="py-3.5 px-4 text-[#5A685D]">
                      {org.contactPerson} ({org.contactEmail})
                    </td>
                    <td className="py-3.5 px-4">
                      {org.verificationStatus === 'verified' ? (
                        <span className="font-semibold text-[#20B486]">Verified</span>
                      ) : org.verificationStatus === 'pending' ? (
                        <span className="font-semibold text-amber-700">Audit Pending</span>
                      ) : (
                        <span className="text-slate-600">Unverified</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {org.verificationStatus !== 'verified' ? (
                        <button
                          onClick={() => verifyOrganization(org.id, 'verified')}
                          className="px-2.5 py-1 text-xs font-semibold text-white bg-[#20B486] hover:bg-[#1A966F] rounded cursor-pointer"
                        >
                          Approve Verification
                        </button>
                      ) : (
                        <button
                          onClick={() => verifyOrganization(org.id, 'unverified')}
                          className="px-2.5 py-1 text-xs text-slate-700 hover:text-red-700 underline cursor-pointer"
                        >
                          Revoke Badge
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Immutable Audit Log */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="text-xs text-[#5A685D]">
            All status transitions, identity privacy masking, and organization approvals are recorded with immutable timestamps and actor roles.
          </div>

          <div className="bg-white rounded-lg border border-[#DDE8DE] overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBF9F5] border-b border-[#DDE8DE] text-[#5A685D] uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Timestamp (EAT)</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Action Type</th>
                  <th className="py-3 px-4">Target Ref</th>
                  <th className="py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE8DE]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#FBF9F5]/60 transition-colors">
                    <td className="py-3 px-4 font-mono-data text-[#5A685D] whitespace-nowrap tabular-nums">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4 font-medium text-[#103D32]">
                      {log.actorName}
                    </td>
                    <td className="py-3 px-4 text-[#5A685D] capitalize">
                      {log.actorRole.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#202923]">
                      {log.action}
                    </td>
                    <td className="py-3 px-4 font-mono-data text-[#103D32]">
                      {log.targetId}
                    </td>
                    <td className="py-3 px-4 text-[#4A574E] max-w-xs truncate" title={log.details}>
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
