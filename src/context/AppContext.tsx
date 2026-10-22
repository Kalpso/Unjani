import React, { createContext, useContext, useState } from 'react';
import {
  IssueItem,
  InitiativeItem,
  VolunteerOpportunity,
  OrganizationProfile,
  UserProfile,
  AuditLogEntry,
  UserRole,
  IssueStatus,
  IssueCategory,
  UrgencyLevel,
} from '../types';
import {
  INITIAL_ISSUES,
  INITIAL_INITIATIVES,
  INITIAL_VOLUNTEER_OPPORTUNITIES,
  INITIAL_ORGANIZATIONS,
  INITIAL_AUDIT_LOGS,
  DEMO_USERS,
} from '../data/mockData';

export type AppTab =
  | 'home'
  | 'pulse'
  | 'initiatives'
  | 'volunteering'
  | 'dashboard'
  | 'organization'
  | 'admin'
  | 'how_it_works'
  | 'about';

interface AppContextType {
  issues: IssueItem[];
  initiatives: InitiativeItem[];
  volunteers: VolunteerOpportunity[];
  organizations: OrganizationProfile[];
  auditLogs: AuditLogEntry[];
  currentUser: UserProfile;
  currentRole: UserRole;
  language: 'en' | 'sw';
  activeTab: AppTab;
  searchQuery: string;
  selectedCategory: IssueCategory | 'all';
  selectedCounty: string | 'all';
  selectedStatus: IssueStatus | 'all';
  selectedIssue: IssueItem | null;
  isReportModalOpen: boolean;
  isInitiativeModalOpen: boolean;
  isAuthModalOpen: boolean;
  isRoleSwitcherOpen: boolean;
  notification: { type: 'success' | 'info' | 'error'; message: string } | null;

  // Actions
  setActiveTab: (tab: AppTab) => void;
  setLanguage: (lang: 'en' | 'sw') => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: IssueCategory | 'all') => void;
  setSelectedCounty: (county: string | 'all') => void;
  setSelectedStatus: (status: IssueStatus | 'all') => void;
  setSelectedIssue: (issue: IssueItem | null) => void;
  setIsReportModalOpen: (open: boolean) => void;
  setIsInitiativeModalOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsRoleSwitcherOpen: (open: boolean) => void;
  showNotification: (type: 'success' | 'info' | 'error', message: string) => void;
  switchRole: (role: UserRole) => void;

  submitIssue: (data: {
    title: string;
    category: IssueCategory;
    description: string;
    county: string;
    town: string;
    neighborhood: string;
    dateObserved: string;
    urgency: UrgencyLevel;
    anonymous: boolean;
    imageUrl?: string;
  }) => IssueItem;

  updateIssueStatus: (
    issueId: string,
    newStatus: IssueStatus,
    comment: string,
    verified?: boolean
  ) => void;

  supportIssue: (issueId: string) => void;

  createInitiative: (data: {
    title: string;
    category: IssueCategory;
    description: string;
    county: string;
    neighborhood: string;
    goal: string;
    startDate: string;
    targetDate: string;
    requiredSkills: string[];
    volunteerCapacity: number;
    materialsNeeded: string[];
  }) => void;

  joinInitiative: (initiativeId: string) => void;
  applyForVolunteer: (opportunityId: string) => void;
  verifyOrganization: (orgId: string, status: 'verified' | 'pending' | 'unverified') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<IssueItem[]>(INITIAL_ISSUES);
  const [initiatives, setInitiatives] = useState<InitiativeItem[]>(INITIAL_INITIATIVES);
  const [volunteers, setVolunteers] = useState<VolunteerOpportunity[]>(INITIAL_VOLUNTEER_OPPORTUNITIES);
  const [organizations, setOrganizations] = useState<OrganizationProfile[]>(INITIAL_ORGANIZATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  const [currentRole, setCurrentRole] = useState<UserRole>('resident');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS.resident);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const [activeTab, setActiveTab] = useState<AppTab>('home');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | 'all'>('all');
  const [selectedCounty, setSelectedCounty] = useState<string | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus | 'all'>('all');

  const [selectedIssue, setSelectedIssue] = useState<IssueItem | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isInitiativeModalOpen, setIsInitiativeModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);

  const [notification, setNotification] = useState<{
    type: 'success' | 'info' | 'error';
    message: string;
  } | null>(null);

  const showNotification = (type: 'success' | 'info' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4500);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(DEMO_USERS[role] || DEMO_USERS.resident);
    showNotification('info', `Switched active persona to ${role.replace('_', ' ').toUpperCase()}: ${DEMO_USERS[role]?.name || 'User'}`);
  };

  const addAuditLog = (action: string, details: string, targetId: string) => {
    const entry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      actorName: currentUser.name,
      actorRole: currentRole,
      action,
      details,
      targetId,
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  const submitIssue = (data: {
    title: string;
    category: IssueCategory;
    description: string;
    county: string;
    town: string;
    neighborhood: string;
    dateObserved: string;
    urgency: UrgencyLevel;
    anonymous: boolean;
    imageUrl?: string;
  }) => {
    const nextRef = `UNJ-KE-2026-${String(Math.floor(100 + Math.random() * 900))}`;
    const newIssue: IssueItem = {
      id: `iss-${Date.now()}`,
      referenceNumber: nextRef,
      title: data.title,
      category: data.category,
      description: data.description,
      county: data.county,
      town: data.town,
      neighborhood: data.neighborhood,
      coordinates: { lat: -1.286389, lng: 36.817223 }, // Generalized central point
      dateObserved: data.dateObserved,
      submissionDate: new Date().toISOString().slice(0, 10),
      currentStatus: 'submitted',
      urgency: data.urgency,
      imageUrl: data.imageUrl || '',
      supportCount: 1,
      userSupported: true,
      reporterAnonymous: data.anonymous,
      reporterName: data.anonymous ? 'Anonymous Resident' : currentUser.name,
      verifiedResolution: false,
      communityNotesCount: 0,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          status: 'submitted',
          date: new Date().toISOString().slice(0, 16).replace('T', ' '),
          authorName: data.anonymous ? 'Anonymous Resident' : currentUser.name,
          authorRole: 'Resident',
          comment: 'Issue registered in UNJANI public registry. Awaiting moderator classification.',
        },
      ],
    };

    setIssues((prev) => [newIssue, ...prev]);
    addAuditLog('Issue Registered', `Report submitted with reference ${nextRef}`, nextRef);
    showNotification('success', `Issue reported successfully. Reference: ${nextRef}`);
    return newIssue;
  };

  const updateIssueStatus = (
    issueId: string,
    newStatus: IssueStatus,
    comment: string,
    verified: boolean = false
  ) => {
    setIssues((prev) =>
      prev.map((iss) => {
        if (iss.id !== issueId) return iss;
        const newEvent = {
          id: `tl-${Date.now()}`,
          status: newStatus,
          date: new Date().toISOString().slice(0, 16).replace('T', ' '),
          authorName: currentUser.name,
          authorRole:
            currentRole === 'org_rep'
              ? ('Authorized Organization' as const)
              : currentRole === 'moderator' || currentRole === 'admin'
              ? ('Community Moderator' as const)
              : ('Resident' as const),
          comment,
          verified,
        };
        const updated = {
          ...iss,
          currentStatus: newStatus,
          verifiedResolution: newStatus === 'resolved' ? verified : iss.verifiedResolution,
          timeline: [...iss.timeline, newEvent],
        };
        if (selectedIssue && selectedIssue.id === issueId) {
          setSelectedIssue(updated);
        }
        return updated;
      })
    );
    addAuditLog(`Status Transition: ${newStatus}`, comment, issueId);
    showNotification('success', `Status updated to ${newStatus.replace('_', ' ')}`);
  };

  const supportIssue = (issueId: string) => {
    setIssues((prev) =>
      prev.map((iss) => {
        if (iss.id !== issueId) return iss;
        const alreadySupported = iss.userSupported;
        const updated = {
          ...iss,
          userSupported: !alreadySupported,
          supportCount: alreadySupported ? iss.supportCount - 1 : iss.supportCount + 1,
        };
        if (selectedIssue && selectedIssue.id === issueId) {
          setSelectedIssue(updated);
        }
        return updated;
      })
    );
    showNotification('info', 'Community endorsement updated.');
  };

  const createInitiative = (data: {
    title: string;
    category: IssueCategory;
    description: string;
    county: string;
    neighborhood: string;
    goal: string;
    startDate: string;
    targetDate: string;
    requiredSkills: string[];
    volunteerCapacity: number;
    materialsNeeded: string[];
  }) => {
    const nextRef = `ACT-KE-2026-${String(Math.floor(100 + Math.random() * 900))}`;
    const newInit: InitiativeItem = {
      id: `init-${Date.now()}`,
      referenceNumber: nextRef,
      title: data.title,
      category: data.category,
      description: data.description,
      county: data.county,
      neighborhood: data.neighborhood,
      organizerName: currentUser.name,
      organizerOrg: 'Community Action Circle',
      organizerVerified: currentRole === 'admin' || currentRole === 'organizer' || currentRole === 'org_rep',
      goal: data.goal,
      startDate: data.startDate,
      targetDate: data.targetDate,
      status: 'active',
      imageUrl: '/src/assets/images/initiative_tree_planting_1792616748009.jpg',
      requiredSkills: data.requiredSkills,
      volunteerCapacity: data.volunteerCapacity,
      volunteersEnrolled: 1,
      materialsNeeded: data.materialsNeeded,
      milestones: [
        { id: `m-${Date.now()}`, title: 'Initiative Kickoff & Community Mobilization', completed: true, dueDate: data.startDate },
        { id: `m-${Date.now() + 1}`, title: 'Mid-term Review & Material Audit', completed: false, dueDate: data.targetDate },
      ],
      updatesCount: 1,
      userJoined: true,
    };

    setInitiatives((prev) => [newInit, ...prev]);
    addAuditLog('Initiative Created', `Initiative created: ${data.title}`, nextRef);
    showNotification('success', `Initiative "${data.title}" launched successfully!`);
  };

  const joinInitiative = (initiativeId: string) => {
    setInitiatives((prev) =>
      prev.map((init) => {
        if (init.id !== initiativeId) return init;
        const joined = init.userJoined;
        return {
          ...init,
          userJoined: !joined,
          volunteersEnrolled: joined ? init.volunteersEnrolled - 1 : init.volunteersEnrolled + 1,
        };
      })
    );
    showNotification('success', 'Updated your Action Circle participation status.');
  };

  const applyForVolunteer = (opportunityId: string) => {
    setVolunteers((prev) =>
      prev.map((vol) => {
        if (vol.id !== opportunityId) return vol;
        const applied = vol.userApplied;
        return {
          ...vol,
          userApplied: !applied,
          appliedSlots: applied ? vol.appliedSlots - 1 : vol.appliedSlots + 1,
        };
      })
    );
    showNotification('success', 'Volunteer expression of interest recorded.');
  };

  const verifyOrganization = (orgId: string, status: 'verified' | 'pending' | 'unverified') => {
    setOrganizations((prev) =>
      prev.map((org) => (org.id === orgId ? { ...org, verificationStatus: status } : org))
    );
    addAuditLog(`Org Verification: ${status}`, `Updated organization ${orgId} status`, orgId);
    showNotification('info', `Organization verification set to ${status}.`);
  };

  return (
    <AppContext.Provider
      value={{
        issues,
        initiatives,
        volunteers,
        organizations,
        auditLogs,
        currentUser,
        currentRole,
        language,
        activeTab,
        searchQuery,
        selectedCategory,
        selectedCounty,
        selectedStatus,
        selectedIssue,
        isReportModalOpen,
        isInitiativeModalOpen,
        isAuthModalOpen,
        isRoleSwitcherOpen,
        notification,
        setActiveTab,
        setLanguage,
        setSearchQuery,
        setSelectedCategory,
        setSelectedCounty,
        setSelectedStatus,
        setSelectedIssue,
        setIsReportModalOpen,
        setIsInitiativeModalOpen,
        setIsAuthModalOpen,
        setIsRoleSwitcherOpen,
        showNotification,
        switchRole,
        submitIssue,
        updateIssueStatus,
        supportIssue,
        createInitiative,
        joinInitiative,
        applyForVolunteer,
        verifyOrganization,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
