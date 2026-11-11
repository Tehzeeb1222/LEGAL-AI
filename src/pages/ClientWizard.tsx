import React, { useState } from 'react';
import { ClientIntakeData } from '../types';
import { 
  User, 
  Users, 
  Building2, 
  IndianRupee, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  FileCheck,
  Send,
  Sparkles,
  Info
} from 'lucide-react';

interface ClientWizardProps {
  intakeData: ClientIntakeData;
  onChange: (updated: ClientIntakeData) => void;
  onSubmit: () => void;
  onSwitchToLawyer: () => void;
  onLoadSample: () => void;
}

export const ClientWizard: React.FC<ClientWizardProps> = ({
  intakeData,
  onChange,
  onSubmit,
  onSwitchToLawyer,
  onLoadSample,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const steps = [
    { number: 1, title: 'Party 1 (Owner / Vendor)', icon: User, desc: 'Owner / Landlord Details' },
    { number: 2, title: 'Party 2 (Purchaser / Buyer)', icon: Users, desc: 'Buyer / Tenant / Opponent' },
    { number: 3, title: 'Property Specifications', icon: Building2, desc: 'Survey No., Sq. Ft., Location' },
    { number: 4, title: 'Financials & Deadlines', icon: IndianRupee, desc: 'Consideration, Deposit & Terms' },
  ];

  const updateParty1 = (field: string, value: string) => {
    onChange({
      ...intakeData,
      party1: { ...intakeData.party1, [field]: value }
    });
  };

  const updateParty2 = (field: string, value: string) => {
    onChange({
      ...intakeData,
      party2: { ...intakeData.party2, [field]: value }
    });
  };

  const updateProperty = (field: string, value: string) => {
    onChange({
      ...intakeData,
      property: { ...intakeData.property, [field]: value }
    });
  };

  const updateFinancials = (field: string, value: string) => {
    onChange({
      ...intakeData,
      financials: { ...intakeData.financials, [field]: value }
    });
  };

  // If already submitted, display Privacy Rule screen!
  if (intakeData.isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-[#FFCED8] text-center relative overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-b from-[#FFCED8]/40 to-transparent blur-2xl pointer-events-none" />

          <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-300 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4DE] text-charcoal border border-[#FFCED8] text-xs font-bold mb-4">
            <Lock className="w-3.5 h-3.5 text-rose-500" />
            <span>256-Bit Encrypted Client Transmission</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight mb-3">
            Thank you! Your information has been securely transmitted.
          </h2>

          <p className="text-sm sm:text-base text-slateText max-w-xl mx-auto leading-relaxed mb-8">
            Your advocate is reviewing the draft, and you will be notified upon approval.
          </p>

          {/* Intake metadata ticket */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 max-w-lg mx-auto text-left mb-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Intake Dossier ID</span>
              <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                #{intakeData.caseId}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Party:</span>
                <span className="font-semibold text-charcoal">{intakeData.party1.name || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Subject Property:</span>
                <span className="font-semibold text-charcoal">{intakeData.property.propertyType || "Residential"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Submission Timestamp:</span>
                <span className="font-semibold text-charcoal">{intakeData.submittedAt || "Just now"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Draft Privacy Status:</span>
                <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                  Under Advocate Review
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onSwitchToLawyer}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F48B9B] to-[#E15B70] text-white font-bold text-sm shadow-md hover:shadow-card hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Switch to Advocate View (To Audit & Finalize)</span>
            </button>

            <button
              onClick={() => {
                onChange({ ...intakeData, isSubmitted: false });
                setCurrentStep(1);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors"
            >
              Edit Submitted Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Wizard Progress Stepper */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
              Legal Intake & Property Registration
            </h1>
            <p className="text-xs sm:text-sm text-slateText">
              Complete the verified 4-step intake. Draft generation is performed securely by your advocate.
            </p>
          </div>

          <button
            onClick={onLoadSample}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-[#FFCED8]/70 hover:bg-[#FFCED8] text-charcoal rounded-xl text-xs font-bold border border-[#F48B9B]/40 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Fill Sample Data</span>
          </button>
        </div>

        {/* Stepper bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {steps.map((st) => {
            const Icon = st.icon;
            const isActive = currentStep === st.number;
            const isCompleted = currentStep > st.number;

            return (
              <div
                key={st.number}
                onClick={() => setCurrentStep(st.number)}
                className={`cursor-pointer p-3 rounded-2xl border transition-all ${
                  isActive
                    ? 'bg-white border-[#F48B9B] shadow-card ring-2 ring-[#FFCED8]/60'
                    : isCompleted
                    ? 'bg-white/80 border-emerald-300'
                    : 'bg-white/50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isActive
                        ? 'bg-[#F48B9B] text-white'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isCompleted ? '✓' : st.number}
                  </div>
                  <span className="text-xs font-bold text-charcoal truncate">
                    Step {st.number}
                  </span>
                </div>
                <p className="text-[11px] text-slateText truncate font-medium">{st.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Step Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#FFCED8]/50">
        {/* STEP 1: PARTY 1 DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Step 1 of 4</span>
              <h2 className="text-xl font-bold text-charcoal">Party 1 (Owner / Vendor / Landlord)</h2>
              <p className="text-xs text-slateText">Enter verified legal identity details of the current property holder.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  value={intakeData.party1.name}
                  onChange={(e) => updateParty1('name', e.target.value)}
                  placeholder="e.g., Dr. Vikramaditya Singhania"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Primary Contact Number *</label>
                <input
                  type="text"
                  value={intakeData.party1.contact}
                  onChange={(e) => updateParty1('contact', e.target.value)}
                  placeholder="e.g., +91 98201 54321"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Legal ID (Aadhaar / PAN) *</label>
                <input
                  type="text"
                  value={intakeData.party1.legalId}
                  onChange={(e) => updateParty1('legalId', e.target.value)}
                  placeholder="e.g., AADHAAR: 4920 1829 4820 | PAN: ABFPS1928K"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Email Address</label>
                <input
                  type="email"
                  value={intakeData.party1.email || ''}
                  onChange={(e) => updateParty1('email', e.target.value)}
                  placeholder="e.g., vikram.singhania@heritagehomes.in"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-charcoal mb-1">Permanent Residential Address *</label>
                <textarea
                  rows={2}
                  value={intakeData.party1.address}
                  onChange={(e) => updateParty1('address', e.target.value)}
                  placeholder="Bunglow No. 14, Silver Oak Enclave, Worli Sea Face, Mumbai 400030"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PARTY 2 DETAILS */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Step 2 of 4</span>
              <h2 className="text-xl font-bold text-charcoal">Party 2 (Purchaser / Buyer / Tenant)</h2>
              <p className="text-xs text-slateText">Enter details of the acquiring party or commercial entity.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Full Legal Name or Entity Name *</label>
                <input
                  type="text"
                  value={intakeData.party2.name}
                  onChange={(e) => updateParty2('name', e.target.value)}
                  placeholder="e.g., M/s Apex Horizon Developers LLP"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Contact Number *</label>
                <input
                  type="text"
                  value={intakeData.party2.contact}
                  onChange={(e) => updateParty2('contact', e.target.value)}
                  placeholder="e.g., +91 91672 88490"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Legal ID / Corporate Reg / PAN *</label>
                <input
                  type="text"
                  value={intakeData.party2.legalId}
                  onChange={(e) => updateParty2('legalId', e.target.value)}
                  placeholder="e.g., LLPIN: AAB-8492 | PAN: AAFCA9921M"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Official Email</label>
                <input
                  type="email"
                  value={intakeData.party2.email || ''}
                  onChange={(e) => updateParty2('email', e.target.value)}
                  placeholder="e.g., legal@apexhorizon.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-charcoal mb-1">Registered Address *</label>
                <textarea
                  rows={2}
                  value={intakeData.party2.address}
                  onChange={(e) => updateParty2('address', e.target.value)}
                  placeholder="Level 11, Cybertower One, BKC Commercial District, Bandra East, Mumbai 400051"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PROPERTY SPECIFICATIONS */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Step 3 of 4</span>
              <h2 className="text-xl font-bold text-charcoal">Property Specifications & Land Title</h2>
              <p className="text-xs text-slateText">Provide exact cadastral and physical measurements for statutory registration.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-charcoal mb-1">Full Property Address *</label>
                <input
                  type="text"
                  value={intakeData.property.address}
                  onChange={(e) => updateProperty('address', e.target.value)}
                  placeholder="Penthouse Suite 1902, 19th Floor, Horizon Solitaire Towers, Senapati Bapat Marg, Lower Parel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Survey / Plot / CTS Number *</label>
                <input
                  type="text"
                  value={intakeData.property.surveyPlotNumber}
                  onChange={(e) => updateProperty('surveyPlotNumber', e.target.value)}
                  placeholder="CTS No. 492/A, Cadastral Survey 189"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Property Type *</label>
                <select
                  value={intakeData.property.propertyType}
                  onChange={(e) => updateProperty('propertyType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                >
                  <option value="Luxury Residential Penthouse (Freehold)">Luxury Residential Penthouse (Freehold)</option>
                  <option value="Residential Apartment / Flat">Residential Apartment / Flat</option>
                  <option value="Commercial Office Space">Commercial Office Space</option>
                  <option value="Industrial Plot / Warehouse">Industrial Plot / Warehouse</option>
                  <option value="Freehold Agricultural Land">Freehold Agricultural Land</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Square Footage / Carpet Area *</label>
                <input
                  type="text"
                  value={intakeData.property.squareFootage}
                  onChange={(e) => updateProperty('squareFootage', e.target.value)}
                  placeholder="3,850 sq. ft. Carpet Area + 3 Parking Bays"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">City / State Jurisdiction</label>
                <input
                  type="text"
                  value={`${intakeData.property.city}, ${intakeData.property.state}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(',');
                    updateProperty('city', parts[0]?.trim() || 'Mumbai');
                    if (parts[1]) updateProperty('state', parts[1]?.trim() || 'Maharashtra');
                  }}
                  placeholder="Mumbai, Maharashtra"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: FINANCIALS & PAYMENT SCHEDULE */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Step 4 of 4</span>
              <h2 className="text-xl font-bold text-charcoal">Financial Consideration & Payment Deadlines</h2>
              <p className="text-xs text-slateText">Terms governing total value, advance escrow, and registration timeline.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Total Consideration / Value *</label>
                <input
                  type="text"
                  value={intakeData.financials.totalConsideration}
                  onChange={(e) => updateFinancials('totalConsideration', e.target.value)}
                  placeholder="₹ 14,50,00,000 (Rupees Fourteen Crores Fifty Lakhs Only)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm font-semibold text-charcoal bg-slate-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Token Advance / Security Deposit *</label>
                <input
                  type="text"
                  value={intakeData.financials.securityDeposit}
                  onChange={(e) => updateFinancials('securityDeposit', e.target.value)}
                  placeholder="₹ 1,50,00,000 (Token Advance / Escrow Hold)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-charcoal mb-1">Payment Deadlines & Staging *</label>
                <input
                  type="text"
                  value={intakeData.financials.paymentDeadline}
                  onChange={(e) => updateFinancials('paymentDeadline', e.target.value)}
                  placeholder="Balance ₹ 13.00 Cr payable within 60 days against registered deed execution"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-charcoal mb-1">Disbursement Mode</label>
                <input
                  type="text"
                  value={intakeData.financials.paymentMode}
                  onChange={(e) => updateFinancials('paymentMode', e.target.value)}
                  placeholder="RTGS / Wire Transfer via Scheduled Commercial Bank Escrow Account"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-sm text-charcoal bg-slate-50/40"
                />
              </div>
            </div>

            {/* Privacy note */}
            <div className="p-3.5 rounded-2xl bg-[#FFF4DE]/60 border border-[#FFCED8] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="text-xs text-slateText">
                <strong className="text-charcoal block mb-0.5">Dual-Role Privacy Assurance:</strong>
                Submitting this form securely dispatches data directly to your appointed law firm workspace. The AI-generated contract draft and statutory compliance audit will remain confidential to the legal counsel until formal attorney approval.
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-charcoal hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all ml-auto"
            >
              <span>Next: Step {currentStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#F48B9B] to-[#E15B70] text-white text-xs sm:text-sm font-bold shadow-card hover:opacity-95 transition-all ml-auto"
            >
              <Send className="w-4 h-4" />
              <span>Submit to Legal Team</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
