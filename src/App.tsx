import React, { useState } from 'react';
import { Header } from './components/Header';
import { ClientWizard } from './pages/ClientWizard';
import { LawyerDashboard } from './pages/LawyerDashboard';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { MascotAvatar } from './components/MascotAvatar';
import { ClientIntakeData, RiskCard } from './types';
import { SAMPLE_CASE, INITIAL_RISKS, INITIAL_DRAFT_TEXT } from './sampleData';
import { Bot, Sparkles, CheckCircle2 } from 'lucide-react';

export function App() {
  const [currentRole, setCurrentRole] = useState<'client' | 'lawyer'>('client');
  const [intakeData, setIntakeData] = useState<ClientIntakeData>({
    caseId: "LA-2026-8942",
    agreementType: "Agreement for Absolute Sale & Conveyance",
    isSubmitted: false,
    party1: {
      name: "",
      contact: "",
      legalId: "",
      address: "",
      email: ""
    },
    party2: {
      name: "",
      contact: "",
      legalId: "",
      address: "",
      email: ""
    },
    property: {
      address: "",
      surveyPlotNumber: "",
      propertyType: "Luxury Residential Penthouse (Freehold)",
      squareFootage: "",
      city: "Mumbai",
      state: "Maharashtra"
    },
    financials: {
      totalConsideration: "",
      securityDeposit: "",
      paymentDeadline: "",
      paymentMode: "RTGS / Wire Transfer via Scheduled Bank Escrow"
    }
  });

  const [draftText, setDraftText] = useState<string>(INITIAL_DRAFT_TEXT);
  const [risks, setRisks] = useState<RiskCard[]>(INITIAL_RISKS);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  // Helper to re-generate draft text when intake details update
  const generateDraftFromIntake = (data: ClientIntakeData, baseTemplate: string) => {
    let result = baseTemplate;
    if (data.party1.name) {
      result = result.replace(/Dr\. Vikramaditya Singhania/g, data.party1.name);
    }
    if (data.party2.name) {
      result = result.replace(/M\/s Apex Horizon Developers LLP/g, data.party2.name);
    }
    if (data.property.address) {
      result = result.replace(/Penthouse Suite 1902, 19th Floor, Horizon Solitaire Towers, Senapati Bapat Marg, Lower Parel, Mumbai/g, data.property.address);
    }
    if (data.financials.totalConsideration) {
      result = result.replace(/₹ 14,50,00,000 \(Rupees Fourteen Crores Fifty Lakhs Only\)/g, data.financials.totalConsideration);
    }
    return result;
  };

  // Preset: Load Sample Property Case for Judges
  const handleLoadSample = () => {
    setIntakeData(SAMPLE_CASE);
    setDraftText(INITIAL_DRAFT_TEXT);
    setDemoNotice("Sample Property Case loaded! (Dr. Singhania vs. Apex Horizon Developers LLP)");
    setTimeout(() => setDemoNotice(null), 3000);
  };

  // Client submit action
  const handleClientSubmit = () => {
    const updated: ClientIntakeData = {
      ...intakeData,
      isSubmitted: true,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + " IST"
    };
    setIntakeData(updated);
    setDraftText((prev) => generateDraftFromIntake(updated, prev));
  };

  // "Fix with AI" 1-click risk fix
  const handleFixRisk = (riskId: string) => {
    const targetRisk = risks.find((r) => r.id === riskId);
    if (!targetRisk || targetRisk.isFixed) return;

    // Plain text clause version to insert into legal draft
    const plainClause = `\n\n------------------------------------------------------------\n[STATUTORY AMENDMENT - AI AUDIT RESOLUTION FOR: ${targetRisk.title.toUpperCase()}]\n${targetRisk.recommendation}\n${targetRisk.clauseInsertion.replace(/<[^>]+>/g, '')}\n------------------------------------------------------------\n`;

    setDraftText((prev) => prev + plainClause);

    setRisks((prev) =>
      prev.map((r) => (r.id === riskId ? { ...r, isFixed: true } : r))
    );

    setDemoNotice(`AI Protection Applied: "${targetRisk.title}" has been inserted into Section 8.`);
    setTimeout(() => setDemoNotice(null), 3500);
  };

  // Insert custom clause from Lexi Chatbot
  const handleInsertClauseFromChat = (clauseText: string) => {
    setDraftText((prev) => `${prev}\n\n${clauseText.trim()}`);
    setDemoNotice("Lexi AI Clause added to legal draft!");
    setTimeout(() => setDemoNotice(null), 3000);
  };

  // Calculate dynamic compliance score
  const fixedCount = risks.filter((r) => r.isFixed).length;
  const complianceScore = 78 + Math.round((fixedCount / risks.length) * 22); // 78% -> 100%

  return (
    <div className="min-h-screen bg-[#FFF4DE] text-charcoal flex flex-col font-sans selection:bg-[#FFCED8] selection:text-charcoal relative">
      {/* Top Header with Dual-Role Switcher & Sample Loader */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onLoadSample={handleLoadSample}
        onToggleChatbot={() => setIsChatOpen((prev) => !prev)}
        isChatOpen={isChatOpen}
        isSubmitted={intakeData.isSubmitted}
      />

      {/* Demo Notification Toast */}
      {demoNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-charcoal text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>{demoNotice}</span>
        </div>
      )}

      {/* Main Workspace (Dual-Role Views) */}
      <div className="flex-1 pb-16">
        {currentRole === 'client' ? (
          <ClientWizard
            intakeData={intakeData}
            onChange={setIntakeData}
            onSubmit={handleClientSubmit}
            onSwitchToLawyer={() => setCurrentRole('lawyer')}
            onLoadSample={handleLoadSample}
          />
        ) : (
          <LawyerDashboard
            intakeData={intakeData}
            draftText={draftText}
            onDraftChange={setDraftText}
            risks={risks}
            onFixRisk={handleFixRisk}
            complianceScore={complianceScore}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}
      </div>

      {/* AI Assistant Chatbot Drawer */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onInsertClause={handleInsertClauseFromChat}
      />

      {/* Floating Bottom-Right Chatbot Mascot Launcher */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 p-2.5 pr-4 rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border border-[#FFCED8] hover:border-[#F48B9B] hover:scale-105 transition-all duration-300"
          title="Open Lexi AI Legal Assistant"
        >
          <MascotAvatar size="md" isAnimated={true} />
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-xs text-charcoal">Ask Lexi AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-[10px] text-slateText font-medium">Clause Copilot</span>
          </div>
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-[#FFCED8]/60 py-4 px-6 text-center text-xs text-slateText bg-white/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Legal AI Inc. Tailored for Problem Statement 01/03 (AI for Lawyers & Smart Legal Automation).</p>
          <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600">
            <span>RERA Compliant</span>
            <span>•</span>
            <span>Indian Registration Act</span>
            <span>•</span>
            <span>256-Bit TLS Client Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
