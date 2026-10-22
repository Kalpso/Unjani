import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { DEMO_USERS } from '../../data/mockData';
import { X, UserCircle2, Check, Shield, Wrench, Users, HeartHandshake, Eye } from 'lucide-react';

export const RoleSwitcherModal: React.FC = () => {
  const { isRoleSwitcherOpen, setIsRoleSwitcherOpen, switchRole, currentRole } = useApp();

  if (!isRoleSwitcherOpen) return null;

  const roles: {
    role: UserRole;
    name: string;
    location: string;
    description: string;
    icon: any;
    permissions: string;
  }[] = [
    {
      role: 'resident',
      name: DEMO_USERS.resident.name,
      location: 'Ruaraka, Nairobi',
      description: 'Community resident who reports local hazards, endorses priorities, and follows updates.',
      icon: Users,
      permissions: 'Report issues, support reports, join initiatives, privacy masking.',
    },
    {
      role: 'volunteer',
      name: DEMO_USERS.volunteer.name,
      location: 'Eldoret, Uasin Gishu',
      description: 'Skilled community member lending time and labor for environmental and civic projects.',
      icon: HeartHandshake,
      permissions: 'Apply for volunteer roles, track service hours, join Action Circles.',
    },
    {
      role: 'organizer',
      name: DEMO_USERS.organizer.name,
      location: 'Mua Hills, Machakos',
      description: 'Grassroots leader convening Action Circles, coordinating materials, and posting updates.',
      icon: Wrench,
      permissions: 'Create initiatives, manage milestones, coordinate volunteer rosters.',
    },
    {
      role: 'org_rep',
      name: DEMO_USERS.org_rep.name,
      location: 'Nairobi Water Liaison Desk',
      description: 'Authorized representative for verified service providers or CBO partners.',
      icon: Shield,
      permissions: 'Post official status updates, acknowledge queue, upload contractor sign-offs.',
    },
    {
      role: 'moderator',
      name: DEMO_USERS.moderator.name,
      location: 'UNJANI Trust & Safety',
      description: 'Community moderator reviewing reports for accuracy, privacy safety, and duplicates.',
      icon: Eye,
      permissions: 'Content moderation, duplicate detection, privacy redactions.',
    },
    {
      role: 'admin',
      name: DEMO_USERS.admin.name,
      location: 'Platform Systems Lead',
      description: 'System administrator overseeing organization verification and audit integrity.',
      icon: Shield,
      permissions: 'Full system oversight, organization verification approvals, audit logs.',
    },
    {
      role: 'guest',
      name: 'Guest Explorer',
      location: 'Kenya (Unauthenticated)',
      description: 'Public visitor browsing community pulse map and open initiatives.',
      icon: UserCircle2,
      permissions: 'Public read-only exploration and search.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#103D32]/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl border border-[#DDE8DE] overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DDE8DE] bg-[#FBF9F5] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#C77852]">
              Interactive Role Simulation
            </div>
            <h2 className="font-display text-xl font-bold text-[#103D32]">
              Switch Persona & Permissions
            </h2>
          </div>
          <button
            onClick={() => setIsRoleSwitcherOpen(false)}
            className="p-1 text-[#5A685D] hover:text-[#103D32] rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6 space-y-3">
          <p className="text-xs text-[#4A574E] leading-relaxed">
            Select a persona below to experience UNJANI from different stakeholder perspectives across Kenya. Permissions and accessible features adapt immediately.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {roles.map((item) => {
              const Icon = item.icon;
              const isSelected = currentRole === item.role;

              return (
                <button
                  key={item.role}
                  onClick={() => {
                    switchRole(item.role);
                    setIsRoleSwitcherOpen(false);
                  }}
                  className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#103D32] bg-[#F7F2E8] ring-2 ring-[#103D32]/20'
                      : 'border-[#DDE8DE] bg-white hover:border-[#CAD8CC]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-md bg-[#DDE8DE]/60 flex items-center justify-center text-[#103D32]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold capitalize text-[#103D32]">
                          {item.role.replace('_', ' ')}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#103D32] text-white flex items-center justify-center text-xs">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>

                    <div className="font-bold text-sm text-[#202923]">{item.name}</div>
                    <div className="text-[11px] text-[#5A685D]">{item.location}</div>
                    <p className="text-[11px] text-[#4A574E] mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#CAD8CC]/40 text-[10px] text-[#5A685D]">
                    <strong>Capabilities:</strong> {item.permissions}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#FBF9F5] border-t border-[#DDE8DE] flex justify-end">
          <button
            onClick={() => setIsRoleSwitcherOpen(false)}
            className="px-4 py-1.5 text-xs font-semibold text-[#103D32] hover:bg-[#DDE8DE]/50 rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
