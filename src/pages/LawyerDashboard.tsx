import React, { useState } from 'react';
import { ClientIntakeData, RiskCard } from '../types';
import { ComplianceGauge } from '../components/ComplianceGauge';
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Bot, 
  Edit3, 
  Eye, 
  Stamp,
  Scale,
  RefreshCw
} from 'lucide-react';

interface LawyerDashboardProps {
  intakeData: ClientIntakeData;
  draftText: string;
  onDraftChange: (newDraft: string) => void;
  risks: RiskCard[];
  onFixRisk: (riskId: string) => void;
  complianceScore: number;
  onOpenChat: () => void;
}

export const LawyerDashboard: React.FC<LawyerDashboardProps> = ({
  intakeData,
  draftText,
  onDraftChange,
  risks,
  onFixRisk,
  complianceScore,
  onOpenChat,
}) => {
  const [activeAccordion, setActiveAccordion] = useState<'parties' | 'property' | 'financials' | null>('parties');
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeExportToast, setActiveExportToast] = useState<string | null>(null);

  const toggleAccordion = (section: 'parties' | 'property' | 'financials') => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setActiveExportToast("Copied legal draft to clipboard!");
    setTimeout(() => {
      setCopied(false);
      setActiveExportToast(null);
    }, 2500);
  };

  const handleDownloadWord = () => {
    const element = document.createElement("a");
    const file = new Blob([draftText], { type: 'application/msword;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${intakeData.caseId}_Agreement_Draft.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setActiveExportToast("Generating Word (.doc) draft...");
    setTimeout(() => setActiveExportToast(null), 2500);
  };

  const handleDownloadPDF = () => {
    // Clean print view simulation for PDF export
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Legal AI - ${intakeData.caseId} Absolute Sale Deed</title>
            <style>
              body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.8; color: #111; }
              h1 { text-align: center; font-size: 18pt; margin-bottom: 24px; border-bottom: 2px solid #333; padding-bottom: 8px; }
              pre { white-space: pre-wrap; font-family: inherit; font-size: 11pt; }
            </style>
          </head>
          <body>
            <h1>LEGAL AI CERTIFIED ADVOCATE DRAFT</h1>
            <p><strong>Case Reference:</strong> #${intakeData.caseId} | <strong>Status:</strong> Advocate Approved</p>
            <hr />
            <pre>${draftText}</pre>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
    setActiveExportToast("Opening Printable Legal PDF View...");
    setTimeout(() => setActiveExportToast(null), 2500);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-6">
      {/* Top Banner / Case Overview */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-[#FFCED8]/60 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 shadow-inner">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-charcoal tracking-tight">
                Advocate Workspace & Legal Audit
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF4DE] text-charcoal border border-[#FFCED8]">
                #{intakeData.caseId}
              </span>
            </div>
            <p className="text-xs text-slateText mt-0.5">
              Matter: <span className="font-semibold text-charcoal">{intakeData.agreementType}</span> • Client: <span className="font-semibold text-charcoal">{intakeData.party1.name || "Dr. Singhania"}</span>
            </p>
          </div>
        </div>

        {/* Quick action badges & Lexi trigger */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Intake Verified</span>
          </div>

          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#F48B9B] to-[#E15B70] text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Consult Lexi AI</span>
          </button>
        </div>
      </div>

      {/* Split-pane 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Client Intake Accordion (3 Cols) */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-[#FFCED8]/60">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                <span>Client Intake Data</span>
              </h2>
              <span className="text-[10px] bg-slate-100 font-semibold text-slate-600 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Accordion 1: Parties */}
              <div className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => toggleAccordion('parties')}
                  className="w-full flex items-center justify-between p-3 bg-slate-50/70 hover:bg-slate-100/70 text-xs font-bold text-charcoal text-left"
                >
                  <span>1. Parties (Vendor & Purchaser)</span>
                  {activeAccordion === 'parties' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {activeAccordion === 'parties' && (
                  <div className="p-3 text-xs space-y-3 bg-white border-t border-slate-200/70">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Party 1 (Vendor/Owner)</p>
                      <p className="font-bold text-charcoal text-[13px]">{intakeData.party1.name || "N/A"}</p>
                      <p className="text-slate-600 font-mono text-[11px]">{intakeData.party1.legalId || "N/A"}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{intakeData.party1.contact}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Party 2 (Purchaser/Buyer)</p>
                      <p className="font-bold text-charcoal text-[13px]">{intakeData.party2.name || "N/A"}</p>
                      <p className="text-slate-600 font-mono text-[11px]">{intakeData.party2.legalId || "N/A"}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{intakeData.party2.contact}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Property Specs */}
              <div className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => toggleAccordion('property')}
                  className="w-full flex items-center justify-between p-3 bg-slate-50/70 hover:bg-slate-100/70 text-xs font-bold text-charcoal text-left"
                >
                  <span>2. Property Cadastral Specs</span>
                  {activeAccordion === 'property' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {activeAccordion === 'property' && (
                  <div className="p-3 text-xs space-y-2 bg-white border-t border-slate-200/70">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Property Type</span>
                      <span className="font-semibold text-charcoal">{intakeData.property.propertyType}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Survey / Plot No.</span>
                      <span className="font-mono text-slate-700">{intakeData.property.surveyPlotNumber}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Carpet Area</span>
                      <span className="font-semibold text-charcoal">{intakeData.property.squareFootage}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Location</span>
                      <span className="text-slate-600">{intakeData.property.address}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Financials */}
              <div className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => toggleAccordion('financials')}
                  className="w-full flex items-center justify-between p-3 bg-slate-50/70 hover:bg-slate-100/70 text-xs font-bold text-charcoal text-left"
                >
                  <span>3. Financials & Escrow Schedule</span>
                  {activeAccordion === 'financials' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {activeAccordion === 'financials' && (
                  <div className="p-3 text-xs space-y-2 bg-white border-t border-slate-200/70">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Consideration</span>
                      <span className="font-bold text-rose-600 text-sm">{intakeData.financials.totalConsideration}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Token / Escrow Deposit</span>
                      <span className="font-semibold text-charcoal">{intakeData.financials.securityDeposit}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Payment Schedule</span>
                      <span className="text-slate-600 text-[11px]">{intakeData.financials.paymentDeadline}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Advocate Stamp Paper status */}
            <div className="mt-4 p-3 rounded-2xl bg-[#FFF4DE]/60 border border-[#FFCED8] text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-charcoal mb-1">
                <Stamp className="w-4 h-4 text-rose-500" />
                <span>e-Stamp Duty Ready</span>
              </div>
              <p className="text-[10px] text-slateText">
                Standard Article 25(b) stamp verification applied. Admissible in High Court of Judicature.
              </p>
            </div>
          </div>
        </aside>

        {/* CENTER PANEL: Live Document Editor & Viewer (6 Cols) */}
        <main className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-[#FFCED8]/60 flex flex-col">
          {/* Editor Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-charcoal">
                  Live Legal Draft Editor
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Auto-Synced
                </span>
              </div>
              <p className="text-xs text-slateText">Formatted according to the Indian Registration Act, 1908.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  isEditing
                    ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                    : 'bg-white text-charcoal border-slate-200 hover:bg-slate-50'
                }`}
              >
                {isEditing ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                <span>{isEditing ? 'View Mode' : 'Direct Edit'}</span>
              </button>
            </div>
          </div>

          {/* Stamp header simulation */}
          <div className="p-3 bg-[#FFF4DE]/50 border border-[#FFCED8] rounded-2xl mb-4 text-center">
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#1E293B]">
              GOVERNMENT OF INDIA • NON-JUDICIAL STAMP PAPER
            </div>
            <div className="text-[10px] text-slateText font-mono">
              CERTIFICATE NO: IN-MH928419204128K • ARTICLE 25(b) SALE DEED
            </div>
          </div>

          {/* Document Content Area */}
          <div className="relative min-h-[520px] max-h-[640px] overflow-y-auto p-4 sm:p-6 bg-slate-50/50 rounded-2xl border border-slate-200 font-serif text-slate-900 leading-relaxed text-xs sm:text-sm">
            {isEditing ? (
              <textarea
                value={draftText}
                onChange={(e) => onDraftChange(e.target.value)}
                className="w-full h-full min-h-[500px] bg-transparent outline-none resize-none font-serif text-xs sm:text-sm leading-relaxed"
                placeholder="Draft content goes here..."
              />
            ) : (
              <div className="whitespace-pre-line legal-document selection:bg-[#FFCED8]">
                {draftText}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
            <span>Clauses: 7 Core Statutory Sections</span>
            <span>Jurisdiction: Mumbai, Maharashtra</span>
          </div>
        </main>

        {/* RIGHT PANEL: AI Legal Audit & Clause Inspector (3 Cols) */}
        <aside className="lg:col-span-3 space-y-4">
          {/* Dynamic Compliance Gauge */}
          <ComplianceGauge score={complianceScore} />

          {/* Risk Severity Cards */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-[#FFCED8]/60">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>AI Risk Audit & Protections</span>
              </h3>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                {risks.filter(r => !r.isFixed).length} Actionable
              </span>
            </div>

            <div className="space-y-3">
              {risks.map((risk) => {
                const isHigh = risk.severity === 'High';
                const isMed = risk.severity === 'Medium';

                return (
                  <div
                    key={risk.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      risk.isFixed
                        ? 'bg-emerald-50/60 border-emerald-200 opacity-80'
                        : isHigh
                        ? 'bg-rose-50/70 border-rose-200 shadow-sm'
                        : isMed
                        ? 'bg-amber-50/70 border-amber-200 shadow-sm'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                          risk.isFixed
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : isHigh
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        {risk.isFixed ? '✓ Clause Injected' : `${risk.severity} Risk`}
                      </span>
                    </div>

                    <h4 className="font-bold text-charcoal text-xs mb-1 leading-snug">
                      {risk.title}
                    </h4>

                    <p className="text-[11px] text-slateText leading-normal mb-2.5">
                      {risk.description}
                    </p>

                    {risk.isFixed ? (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Fixed with AI Protection</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onFixRisk(risk.id)}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white hover:bg-[#FFF4DE] text-charcoal text-xs font-bold border border-[#F48B9B] shadow-sm transition-all group"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-rose-500 group-hover:rotate-12 transition-transform" />
                        <span>Fix with AI (1-Click)</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-[#FFCED8]/60 space-y-2.5">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
              Statutory Export Options
            </h3>

            <button
              onClick={handleDownloadPDF}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#FFF4DE] hover:bg-[#FFCED8]/60 text-charcoal font-bold text-xs border border-[#FFCED8] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4 text-rose-500" />
                <span>Download PDF (Printable)</span>
              </span>
              <span className="text-[10px] text-slateText">.pdf</span>
            </button>

            <button
              onClick={handleDownloadWord}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-charcoal font-bold text-xs border border-slate-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>Download Word (.doc)</span>
              </span>
              <span className="text-[10px] text-slateText">.doc</span>
            </button>

            <button
              onClick={handleCopyText}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-charcoal font-bold text-xs border border-slate-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Plain Text'}</span>
              </span>
            </button>
          </div>

          {/* Toast feedback */}
          {activeExportToast && (
            <div className="p-3 bg-charcoal text-white text-xs font-semibold rounded-2xl text-center shadow-lg animate-in fade-in duration-200">
              {activeExportToast}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
