import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IssueCategory } from '../../types';
import { X, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export const InitiativeCreateModal: React.FC = () => {
  const { isInitiativeModalOpen, setIsInitiativeModalOpen, createInitiative, showNotification } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<IssueCategory>('water');
  const [description, setDescription] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [neighborhood, setNeighborhood] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [targetDate, setTargetDate] = useState('2026-11-30');
  const [volunteerCapacity, setVolunteerCapacity] = useState(15);
  const [materialsRaw, setMaterialsRaw] = useState('');

  if (!isInitiativeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !goal.trim() || !neighborhood.trim()) {
      showNotification('error', 'Please fill in all required fields.');
      return;
    }

    const materialsNeeded = materialsRaw
      .split('\n')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    createInitiative({
      title,
      category,
      description,
      county,
      neighborhood,
      goal,
      startDate,
      targetDate,
      requiredSkills: ['Community Coordination', 'Technical Operations'],
      volunteerCapacity,
      materialsNeeded: materialsNeeded.length > 0 ? materialsNeeded : ['Community labor and basic tools'],
    });

    setIsInitiativeModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#103D32]/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-xl border border-[#DDE8DE] overflow-hidden my-6">
        <div className="px-6 py-4 border-b border-[#DDE8DE] bg-[#FBF9F5] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#C77852]">
              Action Circle Formulation
            </div>
            <h2 className="font-display text-xl font-bold text-[#103D32]">
              Start a Community Initiative
            </h2>
          </div>
          <button
            onClick={() => setIsInitiativeModalOpen(false)}
            className="p-1 text-[#5A685D] hover:text-[#103D32] rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#103D32] uppercase tracking-wider mb-1">
              Initiative Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Kasarani Community Tree Canopy Restoration"
              className="w-full text-xs p-2.5 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md focus:ring-1 focus:ring-[#103D32] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IssueCategory)}
                className="w-full text-xs p-2.5 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md focus:ring-1 focus:ring-[#103D32] focus:outline-none"
              >
                <option value="water">Water Access</option>
                <option value="sanitation">Waste & Sanitation</option>
                <option value="roads">Roads & Walkways</option>
                <option value="lighting">Public Lighting</option>
                <option value="environment">Environment</option>
                <option value="infrastructure">Public Infrastructure</option>
                <option value="other">Skills & Civic Action</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                County
              </label>
              <select
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md focus:ring-1 focus:ring-[#103D32] focus:outline-none"
              >
                <option value="Nairobi">Nairobi</option>
                <option value="Mombasa">Mombasa</option>
                <option value="Kisumu">Kisumu</option>
                <option value="Nakuru">Nakuru</option>
                <option value="Machakos">Machakos</option>
                <option value="Uasin Gishu">Uasin Gishu (Eldoret)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#103D32] uppercase tracking-wider mb-1">
              Neighborhood / Ward <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="e.g. Clay City / Kasarani"
              className="w-full text-xs p-2.5 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md focus:ring-1 focus:ring-[#103D32] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#103D32] uppercase tracking-wider mb-1">
              Measurable Goal & Target Outcome <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Plant 500 indigenous trees along the drainage swale within 3 weeks"
              className="w-full text-xs p-2.5 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md focus:ring-1 focus:ring-[#103D32] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-xs p-2 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                Target Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full text-xs p-2 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#103D32] uppercase tracking-wider mb-1">
                Max Volunteers
              </label>
              <input
                type="number"
                min={2}
                max={100}
                value={volunteerCapacity}
                onChange={(e) => setVolunteerCapacity(Number(e.target.value))}
                className="w-full text-xs p-2 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#103D32] uppercase tracking-wider mb-1">
              Materials Needed (One per line)
            </label>
            <textarea
              rows={3}
              value={materialsRaw}
              onChange={(e) => setMaterialsRaw(e.target.value)}
              placeholder="500 Markhamia saplings&#10;50kg Organic compost&#10;Water cans and wheelbarrows"
              className="w-full text-xs p-2.5 bg-[#FBF9F5] border border-[#CAD8CC] rounded-md focus:ring-1 focus:ring-[#103D32] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DDE8DE]">
            <button
              type="button"
              onClick={() => setIsInitiativeModalOpen(false)}
              className="px-3 py-1.5 text-xs text-[#5A685D] hover:text-[#103D32] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#103D32] hover:bg-[#0B2C24] rounded-md transition-colors cursor-pointer"
            >
              Launch Action Circle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
