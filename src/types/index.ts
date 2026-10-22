export type IssueCategory =
  | 'water'
  | 'sanitation'
  | 'roads'
  | 'lighting'
  | 'environment'
  | 'infrastructure'
  | 'safety'
  | 'other';

export type IssueStatus =
  | 'submitted'
  | 'under_review'
  | 'acknowledged'
  | 'in_progress'
  | 'resolved'
  | 'community_feedback'
  | 'reopened'
  | 'rejected';

export type UserRole =
  | 'guest'
  | 'resident'
  | 'volunteer'
  | 'organizer'
  | 'org_rep'
  | 'moderator'
  | 'admin';

export type UrgencyLevel = 'low' | 'moderate' | 'high';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  details: string;
  targetId: string;
}

export interface StatusTimelineEvent {
  id: string;
  status: IssueStatus;
  date: string;
  authorName: string;
  authorRole: 'Resident' | 'Community Moderator' | 'Authorized Organization' | 'System Auditor';
  comment: string;
  verified?: boolean;
}

export interface IssueItem {
  id: string;
  referenceNumber: string; // e.g. UNJ-KE-2026-084
  title: string;
  category: IssueCategory;
  description: string;
  county: string;
  town: string;
  neighborhood: string;
  coordinates: { lat: number; lng: number }; // generalized to protect privacy
  dateObserved: string;
  submissionDate: string;
  currentStatus: IssueStatus;
  urgency: UrgencyLevel;
  imageUrl?: string;
  supportCount: number;
  userSupported?: boolean;
  reporterAnonymous: boolean;
  reporterName?: string;
  assignedOrgId?: string;
  assignedOrgName?: string;
  verifiedResolution: boolean;
  timeline: StatusTimelineEvent[];
  communityNotesCount: number;
}

export interface InitiativeItem {
  id: string;
  referenceNumber: string;
  title: string;
  category: IssueCategory;
  description: string;
  county: string;
  neighborhood: string;
  organizerName: string;
  organizerOrg?: string;
  organizerVerified: boolean;
  goal: string;
  startDate: string;
  targetDate: string;
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  imageUrl: string;
  requiredSkills: string[];
  volunteerCapacity: number;
  volunteersEnrolled: number;
  materialsNeeded: string[];
  milestones: {
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
  }[];
  updatesCount: number;
  userJoined?: boolean;
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  initiativeId: string;
  initiativeTitle: string;
  skillCategory: string;
  description: string;
  timeCommitment: string;
  county: string;
  isRemote: boolean;
  openSlots: number;
  appliedSlots: number;
  userApplied?: boolean;
  organizer: string;
}

export interface OrganizationProfile {
  id: string;
  name: string;
  type: 'Public Agency' | 'Community Based Org (CBO)' | 'NGO' | 'Service Provider';
  county: string;
  verificationStatus: 'unverified' | 'pending' | 'verified';
  contactPerson: string;
  contactEmail: string;
  activeInitiativesCount: number;
  resolvedIssuesCount: number;
  medianResponseDays: number;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  county: string;
  avatarInitials: string;
  bio?: string;
  skills: string[];
  reportsSubmitted: number;
  initiativesJoined: number;
  volunteerHours: number;
}
