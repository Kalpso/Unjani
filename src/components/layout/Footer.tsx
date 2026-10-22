import React from 'react';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Info, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-[#103D32] text-[#F7F2E8] border-t border-[#1F4E42] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Logo variant="horizontal" theme="dark" />
            <p className="text-sm text-[#CAD8CC] leading-relaxed">
              Together, we make progress visible. Connecting Kenyan residents, volunteers, and verified community organizations to resolve local infrastructure and environmental challenges.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#20B486] font-medium pt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Launch Market: Nairobi, Nakuru, Mombasa, Kisumu & Eldoret</span>
            </div>
          </div>

          {/* Navigation Mirrors */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white uppercase mb-4">
              Platform Areas
            </h4>
            <ul className="space-y-2.5 text-sm text-[#CAD8CC]">
              <li>
                <button
                  onClick={() => setActiveTab('pulse')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Community Pulse Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('initiatives')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Action Circles & Initiatives
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('volunteering')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Volunteer Opportunities
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('organization')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Organization Workspace
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Moderation & Audit Logs
                </button>
              </li>
            </ul>
          </div>

          {/* Workflow & Principles */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white uppercase mb-4">
              Civic Workflow
            </h4>
            <ul className="space-y-2 text-sm text-[#CAD8CC]">
              <li className="flex items-center gap-2">
                <span className="font-mono-data text-xs text-[#20B486]">01</span>
                <span>Discover Local Challenges</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono-data text-xs text-[#20B486]">02</span>
                <span>Report with Privacy Protection</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono-data text-xs text-[#20B486]">03</span>
                <span>Mobilize Action Circles</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono-data text-xs text-[#20B486]">04</span>
                <span>Track Outcomes Transparently</span>
              </li>
            </ul>
          </div>

          {/* Trust, Privacy & Data Protection */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wide text-white uppercase mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#20B486]" />
              <span>Trust & Governance</span>
            </h4>
            <p className="text-xs text-[#CAD8CC] leading-relaxed">
              Designed in alignment with the <strong>Kenya Data Protection Act, 2019</strong>. Resident locations are generalized to protect privacy. Personal contact details are never sold or exposed to third parties.
            </p>
            <div className="p-3 rounded bg-[#0B2C24] border border-[#1F4E42] text-xs text-[#CAD8CC] space-y-1">
              <div className="flex items-start gap-1.5 text-[#20B486]">
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span className="font-semibold">Demonstration Mode</span>
              </div>
              <p>
                Prototype records illustrate platform workflows. Integrations with county utility portals are marked as planned.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#1F4E42] flex flex-col sm:flex-row items-center justify-between text-xs text-[#CAD8CC] gap-4">
          <p>© 2026 UNJANI Action Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Kenya Data Protection Compliant Architecture</span>
            <span aria-hidden="true">·</span>
            <span>English / Kiswahili Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
