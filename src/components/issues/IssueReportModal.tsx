import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IssueCategory, UrgencyLevel } from '../../types';
import {
  X,
  AlertTriangle,
  Upload,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Info,
} from 'lucide-react';

export const IssueReportModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, submitIssue, issues, showNotification } = useApp();

  // Multi-step: 1 = Basic Info & Location, 2 = Evidence & Urgency, 3 = Review & Submit
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<IssueCategory>('water');
  const [description, setDescription] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [town, setTown] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [dateObserved, setDateObserved] = useState(new Date().toISOString().slice(0, 10));
  const [urgency, setUrgency] = useState<UrgencyLevel>('moderate');
  const [anonymous, setAnonymous] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Duplicate suggestion detection based on title & neighborhood
  const duplicateCandidate = issues.find(
    (i) =>
      title.length > 5 &&
      (i.title.toLowerCase().includes(title.toLowerCase().slice(0, 8)) ||
        (neighborhood && i.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())))
  );

  if (!isReportModalOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showNotification('error', 'File size exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep1 = () => {
    if (!title.trim() || title.length < 5) {
      showNotification('error', 'Please enter a descriptive title (at least 5 characters).');
      return false;
    }
    if (!neighborhood.trim()) {
      showNotification('error', 'Please specify the neighborhood or ward name.');
      return false;
    }
    if (!town.trim()) {
      showNotification('error', 'Please specify the town or sub-county.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!description.trim() || description.length < 20) {
      showNotification('error', 'Please provide at least 20 characters explaining the issue context.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitIssue({
      title,
      category,
      description,
      county,
      town,
      neighborhood,
      dateObserved,
      urgency,
      anonymous,
      imageUrl: imagePreview,
    });
    // Reset and close
    setStep(1);
    setTitle('');
    setDescription('');
    setNeighborhood('');
    setTown('');
    setImagePreview('');
    setIsReportModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#103D32]/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl border border-[#DDE8DE] overflow-hidden my-6">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#DDE8DE] bg-[#FBF9F5] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#C77852]">
              Civic Action Intake · Kenya
            </div>
            <h2 className="font-display text-xl font-bold text-[#103D32]">
              Report a Community Issue
            </h2>
          </div>
          <button
            onClick={() => setIsReportModalOpen(false)}
            className="p-1.5 text-[#5A685D] hover:text-[#103D32] rounded cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Notice Warning Banner */}
        <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
          <p>
            <strong>Safety Notice:</strong> UNJANI coordinates non-emergency public infrastructure and environmental challenges. If someone is in immediate danger, call <strong>999 / 112</strong> directly.
          </p>
        </div>

        {/* Step Progress Indicators */}
        <div className="px-6 pt-4 flex items-center justify-between text-xs text-[#5A685D]">
          <div className={`flex items-center gap-1.5 font-medium ${step >= 1 ? 'text-[#103D32]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono-data ${step === 1 ? 'bg-[#103D32] text-white' : 'bg-[#DDE8DE]'}`}>1</span>
            <span>Location & Category</span>
          </div>
          <span className="w-12 h-px bg-[#DDE8DE]" />
          <div className={`flex items-center gap-1.5 font-medium ${step >= 2 ? 'text-[#103D32]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono-data ${step === 2 ? 'bg-[#103D32] text-white' : 'bg-[#DDE8DE]'}`}>2</span>
            <span>Details & Evidence</span>
          </div>
          <span className="w-12 h-px bg-[#DDE8DE]" />
          <div className={`flex items-center gap-1.5 font-medium ${step === 3 ? 'text-[#103D32]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono-data ${step === 3 ? 'bg-[#103D32] text-white' : 'bg-[#DDE8DE]'}`}>3</span>
            <span>Privacy & Review</span>
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                  Issue Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Broken water feeder pipe flooding footpath near Sector 4 kiosk"
                  className="w-full text-sm p-2.5 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md text-[#202923] focus:ring-1 focus:ring-[#103D32] focus:outline-none"
                  required
                />
              </div>

              {/* Duplicate Detection Alert */}
              {duplicateCandidate && (
                <div className="p-3 rounded bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Info className="w-4 h-4 text-blue-700" />
                    <span>Similar Report Found in Registry</span>
                  </div>
                  <p>
                    "{duplicateCandidate.title}" ({duplicateCandidate.referenceNumber}) is already logged in {duplicateCandidate.county}. You can support the existing report instead of creating a duplicate.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as IssueCategory)}
                    className="w-full text-xs p-2.5 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md text-[#202923] focus:ring-1 focus:ring-[#103D32] focus:outline-none"
                  >
                    <option value="water">Water Access & Reticulation</option>
                    <option value="sanitation">Waste & Sanitation</option>
                    <option value="roads">Roads, Bridges & Walkways</option>
                    <option value="lighting">Public Street Lighting</option>
                    <option value="environment">Environmental & Riparian</option>
                    <option value="infrastructure">Public Infrastructure</option>
                    <option value="safety">Community Safety</option>
                    <option value="other">General Community Need</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                    Date Observed <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dateObserved}
                    onChange={(e) => setDateObserved(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md text-[#202923] focus:ring-1 focus:ring-[#103D32] focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Generalized Location Fields */}
              <div className="p-3.5 rounded-lg bg-[#F7F2E8] border border-[#DDE8DE] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#103D32] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#20B486]" />
                    <span>General Location (Resident Privacy Protected)</span>
                  </span>
                  <span className="text-[11px] text-[#5A685D]">No house numbers required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-[#5A685D] mb-0.5">
                      County
                    </label>
                    <select
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-[#CAD8CC] rounded-md"
                    >
                      <option value="Nairobi">Nairobi</option>
                      <option value="Mombasa">Mombasa</option>
                      <option value="Kisumu">Kisumu</option>
                      <option value="Nakuru">Nakuru</option>
                      <option value="Machakos">Machakos</option>
                      <option value="Uasin Gishu">Uasin Gishu (Eldoret)</option>
                      <option value="Kiambu">Kiambu</option>
                      <option value="Kilifi">Kilifi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#5A685D] mb-0.5">
                      Town / Sub-County
                    </label>
                    <input
                      type="text"
                      value={town}
                      onChange={(e) => setTown(e.target.value)}
                      placeholder="e.g. Westlands"
                      className="w-full text-xs p-2 bg-white border border-[#CAD8CC] rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#5A685D] mb-0.5">
                      Neighborhood / Landmark
                    </label>
                    <input
                      type="text"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="e.g. Kangemi Sector 4"
                      className="w-full text-xs p-2 bg-white border border-[#CAD8CC] rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Description & Evidence */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain what has occurred, how many residents or households are affected, and what physical components are broken..."
                  className="w-full text-xs p-3 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md text-[#202923] focus:ring-1 focus:ring-[#103D32] focus:outline-none"
                  required
                />
                <div className="text-[11px] text-[#5A685D] mt-1">
                  Minimum 20 characters. Avoid including personal names or private phone numbers in public text.
                </div>
              </div>

              {/* Photo Evidence */}
              <div>
                <label className="block text-xs font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                  Field Photo Evidence (Optional)
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 border-2 border-dashed border-[#CAD8CC] hover:border-[#103D32] rounded-lg p-4 text-center cursor-pointer bg-[#FBF9F5] transition-colors">
                    <Upload className="w-5 h-5 text-[#5A685D] mx-auto mb-1" />
                    <span className="text-xs font-medium text-[#103D32]">
                      Upload site photograph (JPG / PNG, max 5MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {imagePreview && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-[#DDE8DE]">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview('')}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Perceived Urgency */}
              <div>
                <label className="block text-xs font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                  Perceived Urgency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'moderate', 'high'] as UrgencyLevel[]).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setUrgency(level)}
                      className={`p-2.5 text-xs font-semibold rounded-md border text-center capitalize transition-colors cursor-pointer ${
                        urgency === level
                          ? 'bg-[#103D32] text-white border-[#103D32]'
                          : 'bg-white text-[#4A574E] border-[#CAD8CC] hover:bg-[#F7F2E8]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#7A8A7F] mt-1">
                  Helps community volunteers prioritize resource allocation. Does not constitute an emergency dispatch order.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Privacy & Review */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#F7F2E8] border border-[#DDE8DE] space-y-3">
                <h4 className="text-xs font-semibold text-[#103D32] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#20B486]" />
                  <span>Privacy Protection (Kenya Data Protection Act, 2019)</span>
                </h4>
                <p className="text-xs text-[#4A574E] leading-relaxed">
                  UNJANI minimizes data collection. Only generalized coordinates (within a 250m radius) are published publicly to prevent revealing individual residences.
                </p>

                <label className="flex items-start gap-2.5 text-xs text-[#202923] cursor-pointer pt-2 border-t border-[#CAD8CC]">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="mt-0.5 rounded text-[#103D32] focus:ring-[#103D32]"
                  />
                  <span>
                    <strong>Submit as Anonymous Resident:</strong> Your profile name will be hidden from the public timeline and recorded only as "Anonymous Resident".
                  </span>
                </label>
              </div>

              {/* Review Summary Box */}
              <div className="p-4 rounded-lg bg-white border border-[#DDE8DE] space-y-2 text-xs">
                <div className="font-semibold text-[#103D32] text-sm">{title}</div>
                <div className="text-[#5A685D]">
                  Location: <strong>{neighborhood}, {town}, {county} County</strong>
                </div>
                <div className="text-[#5A685D]">
                  Category: <span className="capitalize">{category}</span> · Urgency: <span className="capitalize font-medium">{urgency}</span>
                </div>
                <p className="text-[#4A574E] pt-2 border-t border-[#EBE5D8] line-clamp-3">
                  {description}
                </p>
              </div>
            </div>
          )}

          {/* Step Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#DDE8DE]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A685D] hover:text-[#103D32] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && validateStep1()) setStep(2);
                  if (step === 2 && validateStep2()) setStep(3);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#103D32] hover:bg-[#0B2C24] rounded-md transition-colors cursor-pointer"
              >
                <span>Continue to Step {step + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#F7F2E8] bg-[#103D32] hover:bg-[#0B2C24] rounded-md transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#20B486]" />
                <span>Publish Issue to Registry</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
