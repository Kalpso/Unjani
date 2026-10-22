import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { IssueItem, IssueCategory, IssueStatus } from '../../types';
import {
  Search,
  MapPin,
  Filter,
  List,
  Map as MapIcon,
  ChevronRight,
  ThumbsUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
} from 'lucide-react';

const CATEGORY_LABELS: Record<IssueCategory, string> = {
  water: 'Water Access',
  sanitation: 'Waste & Sanitation',
  roads: 'Roads & Bridges',
  lighting: 'Public Lighting',
  environment: 'Environment',
  infrastructure: 'Infrastructure',
  safety: 'Community Safety',
  other: 'General Civic',
};

const STATUS_CONFIG: Record<
  IssueStatus,
  { label: string; textClass: string; bgClass: string }
> = {
  submitted: { label: 'Submitted', textClass: 'text-amber-800', bgClass: 'bg-amber-50 border-amber-200' },
  under_review: { label: 'Under Review', textClass: 'text-blue-800', bgClass: 'bg-blue-50 border-blue-200' },
  acknowledged: { label: 'Acknowledged', textClass: 'text-indigo-800', bgClass: 'bg-indigo-50 border-indigo-200' },
  in_progress: { label: 'In Progress', textClass: 'text-orange-800', bgClass: 'bg-orange-50 border-orange-200' },
  resolved: { label: 'Resolved', textClass: 'text-emerald-800', bgClass: 'bg-emerald-50 border-emerald-200' },
  community_feedback: { label: 'Community Feedback', textClass: 'text-teal-800', bgClass: 'bg-teal-50 border-teal-200' },
  reopened: { label: 'Reopened', textClass: 'text-rose-800', bgClass: 'bg-rose-50 border-rose-200' },
  rejected: { label: 'Rejected', textClass: 'text-slate-800', bgClass: 'bg-slate-100 border-slate-300' },
};

export const CommunityPulse: React.FC = () => {
  const {
    issues,
    selectedCategory,
    setSelectedCategory,
    selectedCounty,
    setSelectedCounty,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    setSelectedIssue,
    supportIssue,
    setIsReportModalOpen,
  } = useApp();

  const [viewMode, setViewMode] = useState<'both' | 'map' | 'list'>('both');
  const [activePinId, setActivePinId] = useState<string | null>(null);

  // Available counties derived from data
  const counties = useMemo(() => {
    const list = Array.from(new Set(issues.map((i) => i.county)));
    return ['all', ...list];
  }, [issues]);

  // Filtered issues
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch =
        searchQuery === '' ||
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.county.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
      const matchesCounty = selectedCounty === 'all' || issue.county === selectedCounty;
      const matchesStatus = selectedStatus === 'all' || issue.currentStatus === selectedStatus;

      return matchesSearch && matchesCategory && matchesCounty && matchesStatus;
    });
  }, [issues, searchQuery, selectedCategory, selectedCounty, selectedStatus]);

  // County coordinate bounds mapping for our stylized interactive map canvas
  const countyMapPositions: Record<string, { x: number; y: number; name: string }> = {
    Nairobi: { x: 52, y: 64, name: 'Nairobi' },
    Mombasa: { x: 74, y: 88, name: 'Mombasa' },
    Kisumu: { x: 26, y: 55, name: 'Kisumu' },
    Machakos: { x: 60, y: 68, name: 'Machakos' },
    'Uasin Gishu': { x: 34, y: 44, name: 'Uasin Gishu (Eldoret)' },
    Nakuru: { x: 42, y: 56, name: 'Nakuru' },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & Search Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#DDE8DE] pb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C77852] mb-1">
            Community Pulse
          </div>
          <h1 className="font-display text-3xl font-extrabold text-[#103D32]">
            Live Issues & Local Action Registry
          </h1>
          <p className="text-sm text-[#4A574E] mt-1">
            Browse verified community reports across Kenya. Coordinates are generalized to neighborhood level to protect resident privacy.
          </p>
        </div>

        {/* View Switcher & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Segmented View Mode Tabs */}
          <div className="inline-flex items-center p-1 bg-[#EBE5D8] rounded-md text-xs font-medium text-[#4A574E]">
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'both' ? 'bg-white text-[#103D32] shadow-xs font-semibold' : 'hover:text-[#103D32]'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5 ${
                viewMode === 'map' ? 'bg-white text-[#103D32] shadow-xs font-semibold' : 'hover:text-[#103D32]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map Only</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5 ${
                viewMode === 'list' ? 'bg-white text-[#103D32] shadow-xs font-semibold' : 'hover:text-[#103D32]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List Only</span>
            </button>
          </div>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-[#F7F2E8] bg-[#103D32] hover:bg-[#0B2C24] rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            Report Local Issue
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-lg bg-white border border-[#DDE8DE] shadow-xs space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#5A685D] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by neighborhood, title, or reference ID (e.g. Kangemi, valve, UNJ-KE-2026-041)..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#FBF9F5] border border-[#CAD8CC] rounded-md focus:outline-none focus:ring-1 focus:ring-[#103D32] text-[#202923] placeholder-[#7A8A7F]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#5A685D] uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full text-xs py-2 px-3 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#103D32] cursor-pointer"
            >
              <option value="all">All Categories ({issues.length})</option>
              <option value="water">Water Access</option>
              <option value="sanitation">Waste & Sanitation</option>
              <option value="roads">Roads & Bridges</option>
              <option value="lighting">Public Lighting</option>
              <option value="environment">Environment</option>
              <option value="infrastructure">Public Infrastructure</option>
              <option value="safety">Community Safety</option>
            </select>
          </div>

          {/* County Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#5A685D] uppercase tracking-wider mb-1">
              County Location
            </label>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full text-xs py-2 px-3 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#103D32] cursor-pointer"
            >
              <option value="all">All Counties</option>
              {counties
                .filter((c) => c !== 'all')
                .map((c) => (
                  <option key={c} value={c}>
                    {c} County
                  </option>
                ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#5A685D] uppercase tracking-wider mb-1">
              Lifecycle Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full text-xs py-2 px-3 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#103D32] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="community_feedback">Community Feedback</option>
            </select>
          </div>
        </div>

        {/* Active Filter Metrics */}
        <div className="flex items-center justify-between text-xs text-[#5A685D] pt-2 border-t border-[#DDE8DE]">
          <div className="flex items-center gap-2">
            <span>Showing</span>
            <span className="font-mono-data font-semibold text-[#103D32]">{filteredIssues.length}</span>
            <span>of</span>
            <span className="font-mono-data">{issues.length}</span>
            <span>active community reports</span>
          </div>

          {(selectedCategory !== 'all' || selectedCounty !== 'all' || selectedStatus !== 'all' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCounty('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              className="text-[#C77852] hover:underline font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area: Map + List */}
      <div className={`grid gap-6 ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        {/* Interactive Map Visualizer */}
        {(viewMode === 'both' || viewMode === 'map') && (
          <div className={`${viewMode === 'both' ? 'lg:col-span-5' : 'col-span-1'} space-y-3`}>
            <div className="p-4 rounded-lg bg-white border border-[#DDE8DE] shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#103D32]">
                  <MapPin className="w-4 h-4 text-[#20B486]" />
                  <span>Interactive Regional Map (Kenya)</span>
                </div>
                <div className="text-[11px] text-[#5A685D] flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#20B486]" />
                  <span>Generalized Pin Radius (250m)</span>
                </div>
              </div>

              {/* Stylized SVG Map of Kenya */}
              <div className="relative w-full aspect-[4/3] bg-[#F7F2E8] rounded-md border border-[#DDE8DE] overflow-hidden flex items-center justify-center p-4">
                {/* SVG Kenya Boundary Outline */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-[#DDE8DE] stroke-[#CAD8CC] stroke-[0.8] fill-[#F1ECE1]"
                  aria-label="Map of Kenya showing localized issue clusters"
                >
                  {/* Stylized Kenya Regional Polygon */}
                  <polygon points="18,32 30,12 55,10 70,22 88,40 85,65 72,92 58,84 38,72 20,62 14,48" />
                  {/* Lake Victoria indicative curve */}
                  <path d="M14 48 Q 22 55 18 64" fill="none" stroke="#20B486" strokeWidth="1" strokeDasharray="1,1" />
                  {/* Indian Ocean indicative coastline */}
                  <path d="M72 92 Q 82 82 85 65" fill="none" stroke="#20B486" strokeWidth="1.2" />

                  {/* Regional labels */}
                  <text x="50" y="22" className="text-[3px] fill-[#7A8A7F] font-mono select-none">NORTHERN REGION</text>
                  <text x="24" y="58" className="text-[3px] fill-[#7A8A7F] font-mono select-none">WESTERN / L. VICTORIA</text>
                  <text x="46" y="66" className="text-[3.2px] fill-[#103D32] font-semibold font-mono select-none">NAIROBI METRO</text>
                  <text x="70" y="82" className="text-[3px] fill-[#7A8A7F] font-mono select-none">COASTAL</text>
                </svg>

                {/* Interactive Pins Overlay */}
                {filteredIssues.map((issue) => {
                  const pos = countyMapPositions[issue.county] || { x: 50, y: 50 };
                  // Add slight hash offset per issue id so they don't overlap completely
                  const hash = issue.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
                  const offsetX = (hash % 7) - 3;
                  const offsetY = ((hash * 3) % 7) - 3;
                  const posX = Math.max(15, Math.min(85, pos.x + offsetX));
                  const posY = Math.max(15, Math.min(85, pos.y + offsetY));

                  const isSelected = activePinId === issue.id;

                  return (
                    <div
                      key={issue.id}
                      style={{ left: `${posX}%`, top: `${posY}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
                    >
                      <button
                        onClick={() => {
                          setActivePinId(issue.id);
                          setSelectedIssue(issue);
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-125 focus:outline-none cursor-pointer shadow-xs ${
                          isSelected
                            ? 'bg-[#103D32] text-white ring-3 ring-[#20B486]'
                            : issue.currentStatus === 'resolved'
                            ? 'bg-[#20B486] text-white'
                            : issue.urgency === 'high'
                            ? 'bg-[#C77852] text-white'
                            : 'bg-[#103D32] text-white'
                        }`}
                        title={`${issue.referenceNumber}: ${issue.title}`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </button>

                      {/* Tooltip on Hover */}
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#103D32] text-white rounded text-[11px] shadow-lg pointer-events-none z-20">
                        <div className="font-semibold truncate">{issue.title}</div>
                        <div className="text-[10px] text-[#20B486] font-mono-data mt-0.5">
                          {issue.county} · {issue.neighborhood}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Legend */}
              <div className="mt-3 pt-3 border-t border-[#DDE8DE] flex flex-wrap items-center justify-between text-[11px] text-[#5A685D] gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C77852]" />
                  <span>High Urgency / Needs Attention</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#103D32]" />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#20B486]" />
                  <span>Verified Resolved</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Issue Cards List */}
        {(viewMode === 'both' || viewMode === 'list') && (
          <div className={`${viewMode === 'both' ? 'lg:col-span-7' : 'col-span-1'} space-y-3`}>
            {filteredIssues.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-lg border border-[#DDE8DE] space-y-3">
                <AlertCircle className="w-8 h-8 text-[#5A685D] mx-auto" />
                <h3 className="font-display text-base font-bold text-[#103D32]">
                  No reports matched your criteria
                </h3>
                <p className="text-xs text-[#5A685D] max-w-sm mx-auto">
                  Try clearing your search terms or selecting a different category or county.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedCounty('all');
                    setSelectedStatus('all');
                    setSearchQuery('');
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-[#103D32] bg-[#DDE8DE] rounded-md hover:bg-[#CAD8CC] transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredIssues.map((issue) => {
                const statusMeta = STATUS_CONFIG[issue.currentStatus];
                return (
                  <div
                    key={issue.id}
                    className="p-5 rounded-lg bg-white border border-[#DDE8DE] hover:border-[#103D32]/40 transition-all shadow-xs space-y-3"
                  >
                    {/* Top Row: Unboxed clean metadata with separators */}
                    <div className="flex flex-wrap items-center justify-between text-xs text-[#5A685D] gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-data font-semibold text-[#103D32]">
                          {issue.referenceNumber}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-[#202923]">
                          {CATEGORY_LABELS[issue.category]}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#5A685D]" />
                          <span>{issue.neighborhood}, {issue.county}</span>
                        </span>
                      </div>

                      {/* Clean status indicator */}
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${statusMeta.bgClass} ${statusMeta.textClass}`}>
                        {statusMeta.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setSelectedIssue(issue)}
                      className="font-display text-base sm:text-lg font-bold text-[#103D32] hover:text-[#20B486] transition-colors cursor-pointer leading-snug"
                    >
                      {issue.title}
                    </h3>

                    {/* Description preview */}
                    <p className="text-xs text-[#4A574E] line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>

                    {/* Bottom Metadata & Controls */}
                    <div className="pt-2 border-t border-[#DDE8DE] flex flex-wrap items-center justify-between text-xs text-[#5A685D] gap-3">
                      <div className="flex items-center gap-3">
                        {/* Support Endorsement Count */}
                        <button
                          onClick={() => supportIssue(issue.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-medium transition-colors cursor-pointer ${
                            issue.userSupported
                              ? 'bg-[#103D32] text-white border-[#103D32]'
                              : 'bg-[#FBF9F5] text-[#202923] border-[#CAD8CC] hover:bg-[#EBE5D8]'
                          }`}
                          title="Support this report to highlight local priority"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span className="font-mono-data tabular-nums">{issue.supportCount}</span>
                          <span>{issue.userSupported ? 'Supported' : 'Support'}</span>
                        </button>

                        {/* Verified Resolution Badge */}
                        {issue.verifiedResolution && (
                          <div className="inline-flex items-center gap-1 text-[#20B486] font-medium text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Independently Verified</span>
                          </div>
                        )}

                        {/* Assigned Organization */}
                        {issue.assignedOrgName && (
                          <div className="hidden sm:inline-flex items-center gap-1 text-[#4A574E] text-[11px]">
                            <Building2 className="w-3.5 h-3.5" />
                            <span className="truncate max-w-[160px]">{issue.assignedOrgName}</span>
                          </div>
                        )}
                      </div>

                      {/* Detail View Trigger */}
                      <button
                        onClick={() => setSelectedIssue(issue)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#103D32] hover:text-[#20B486] transition-colors cursor-pointer"
                      >
                        <span>View Audit & Timeline</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
