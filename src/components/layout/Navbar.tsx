import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { Menu, X, Plus, UserCircle2, Globe2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsReportModalOpen,
    currentUser,
    currentRole,
    setIsRoleSwitcherOpen,
    language,
    setLanguage,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: language === 'sw' ? 'Nyumbani' : 'Home' },
    { id: 'pulse', label: language === 'sw' ? 'Mwangaza wa Jamii' : 'Community Pulse' },
    { id: 'initiatives', label: language === 'sw' ? 'Miradi ya Pamoja' : 'Initiatives' },
    { id: 'volunteering', label: language === 'sw' ? 'Kujitolea' : 'Volunteering' },
    { id: 'dashboard', label: language === 'sw' ? 'Dashibodi' : 'Dashboard' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#DDE8DE]">
      {/* Top Bar 3-Zone Contract: [Brand Zone] — [4-5 single-line nav links] — [1 Primary Action Zone] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#103D32] rounded-md"
          aria-label="UNJANI Home"
        >
          <Logo variant="horizontal" />
        </button>

        {/* Zone 2: 4-5 Clean single-line text links */}
        <nav
          className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#202923]"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id as any)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-[#103D32] font-semibold'
                    : 'text-[#4A574E] hover:text-[#103D32]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#103D32] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Persona/Role Indicator Button */}
          <button
            onClick={() => setIsRoleSwitcherOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#103D32] bg-[#DDE8DE]/60 hover:bg-[#DDE8DE] border border-[#CAD8CC] rounded-md transition-colors cursor-pointer"
            title="Switch demo persona (Resident, Volunteer, Organizer, Org Liaison, Moderator, Admin)"
          >
            <UserCircle2 className="w-4 h-4 text-[#103D32]" />
            <span className="capitalize">{currentRole.replace('_', ' ')}: {currentUser.name.split(' ')[0]}</span>
          </button>

          {/* Kiswahili / English Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#4A574E] hover:text-[#103D32] border border-[#CAD8CC] rounded-md transition-colors cursor-pointer"
            aria-label="Toggle language"
            title="Switch between English and Kiswahili"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span className="font-mono-data uppercase font-semibold">{language}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#F7F2E8] bg-[#103D32] hover:bg-[#0B2C24] active:scale-[0.98] rounded-md shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20B486]"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'sw' ? 'Ripoti Changamoto' : 'Report Issue'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#202923] hover:text-[#103D32] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#103D32] cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#DDE8DE] bg-[#FBF9F5] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#103D32] text-[#F7F2E8]'
                      : 'text-[#202923] hover:bg-[#DDE8DE]/40'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#DDE8DE] flex items-center justify-between">
            <button
              onClick={() => {
                setIsRoleSwitcherOpen(true);
                setMobileMenuOpen(false);
              }}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#103D32] bg-[#DDE8DE]/60 px-3 py-1.5 rounded-md"
            >
              <UserCircle2 className="w-4 h-4" />
              <span>Persona: {currentUser.name}</span>
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
              className="text-xs font-mono-data text-[#4A574E] underline"
            >
              Lang: {language.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
