/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/home/HomeView';
import { CommunityPulse } from './components/pulse/CommunityPulse';
import { InitiativesSection } from './components/initiatives/InitiativesSection';
import { VolunteerSection } from './components/volunteering/VolunteerSection';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { OrganizationPortal } from './components/organization/OrganizationPortal';
import { AdminConsole } from './components/admin/AdminConsole';
import { IssueDetailModal } from './components/issues/IssueDetailModal';
import { IssueReportModal } from './components/issues/IssueReportModal';
import { InitiativeCreateModal } from './components/initiatives/InitiativeCreateModal';
import { RoleSwitcherModal } from './components/common/RoleSwitcherModal';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeTab,
    selectedIssue,
    setSelectedIssue,
    notification,
    setActiveTab,
    currentRole,
    setIsRoleSwitcherOpen,
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#202923]">
      {/* Platform Environment Notice Strip (Demonstration Mode transparency) */}
      <div className="bg-[#103D32] text-[#CAD8CC] px-4 py-1.5 text-[11px] border-b border-[#1F4E42] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#20B486] uppercase tracking-wider font-mono-data">
            DEMONSTRATION RUNTIME · KENYA
          </span>
          <span aria-hidden="true" className="text-[#1F4E42]">|</span>
          <span className="truncate">
            Realistic scenario records for Nairobi, Mombasa, Kisumu & Eldoret. KDPA 2019 privacy standard enforced.
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => setActiveTab('organization')}
            className="hover:text-white underline cursor-pointer"
          >
            Org Workspace
          </button>
          <span aria-hidden="true" className="text-[#1F4E42]">|</span>
          <button
            onClick={() => setActiveTab('admin')}
            className="hover:text-white underline cursor-pointer"
          >
            Admin & Audit Log
          </button>
          <span aria-hidden="true" className="text-[#1F4E42]">|</span>
          <button
            onClick={() => setIsRoleSwitcherOpen(true)}
            className="text-[#20B486] font-semibold hover:underline cursor-pointer"
          >
            Role: {currentRole.replace('_', ' ')}
          </button>
        </div>
      </div>

      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'pulse' && <CommunityPulse />}
        {activeTab === 'initiatives' && <InitiativesSection />}
        {activeTab === 'volunteering' && <VolunteerSection />}
        {activeTab === 'dashboard' && <UserDashboard />}
        {activeTab === 'organization' && <OrganizationPortal />}
        {activeTab === 'admin' && <AdminConsole />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Active Modals */}
      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
      <IssueReportModal />
      <InitiativeCreateModal />
      <RoleSwitcherModal />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-lg bg-[#103D32] text-white shadow-xl border border-[#20B486]/40 flex items-start gap-3 animate-fade-in">
          {notification.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#20B486] shrink-0 mt-0.5" />
          )}
          {notification.type === 'info' && (
            <Info className="w-5 h-5 text-[#20B486] shrink-0 mt-0.5" />
          )}
          {notification.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          )}
          <div className="text-xs leading-relaxed flex-1">{notification.message}</div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
