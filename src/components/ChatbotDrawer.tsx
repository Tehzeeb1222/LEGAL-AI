import React, { useState, useRef, useEffect } from 'react';
import { MascotAvatar } from './MascotAvatar';
import { X, Send, Sparkles, PlusCircle, CheckCircle, Bot, BookOpen, Scale } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertClause: (clauseText: string) => void;
}

const DEFAULT_CHIPS = [
  "Add a 3-month lock-in period",
  "Explain Stamp Duty & Registration in Plain English",
  "Add Force Majeure (Act of God) clause",
  "What is the RERA indemnity obligation?",
  "Add 15-day formal cure notice period",
];

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  isOpen,
  onClose,
  onInsertClause,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'lexi',
      text: "Hello! I am Lexi, your AI Legal Assistant. I can demystify complex legal jargon, analyze property deeds, and insert custom drafted clauses directly into your agreement. How can I protect your interests today?",
      timestamp: 'Just now',
      chips: DEFAULT_CHIPS,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate Lexi's intelligent response with legal analysis and draft insertion
    setTimeout(() => {
      let responseText = "";
      let actionSnippet: string | undefined = undefined;
      const lower = query.toLowerCase();

      if (lower.includes("lock-in") || lower.includes("lock in")) {
        responseText = "I have drafted a balanced 3-Month Lock-in Period clause complying with the Transfer of Property Act. During this lock-in, neither party can prematurely terminate without paying liquidated damages equal to the residual period consideration.";
        actionSnippet = `\n\n[Clause 7.4 - Mandatory Lock-in Period]: Both Parties irrevocably agree to a mandatory lock-in period of 3 (three) months commencing from the execution date hereof. During this period, neither party may terminate this agreement without paying damages equivalent to the full consideration for the unexpired term.\n`;
      } else if (lower.includes("stamp duty") || lower.includes("registration")) {
        responseText = "Plain English Explanation: Stamp Duty is a state transaction tax paid to legalize document admissibility in a court of law (under the Indian Stamp Act, 1899). In Maharashtra, residential property attracts 5% to 6% stamp duty plus 1% Metro Cess, with a flat ₹30,000 registration fee. Without paid stamp duty, this deed cannot be admitted as legal evidence in Indian courts.";
      } else if (lower.includes("force majeure") || lower.includes("god")) {
        responseText = "Here is a standard Indian Supreme Court compliant Force Majeure clause covering pandemics, war, government lockdowns, or severe natural disasters that suspends performance obligations without penal default.";
        actionSnippet = `\n\n[Clause 9.1 - Force Majeure]: Neither Party shall be held liable for delay or failure to perform its obligations if occasioned by an event of Force Majeure (including war, act of God, pandemic, earthquake, or governmental moratorium), provided written notice is delivered within 7 business days.\n`;
      } else if (lower.includes("cure") || lower.includes("notice period")) {
        responseText = "I have drafted an unambiguous 15-Day Written Cure Notice Clause. This ensures neither party can trigger an abrupt cancellation or file litigation without first giving a 15-day cure window.";
        actionSnippet = `\n\n[Clause 8.3 - 15-Day Cure Notice Window]: In case of an alleged non-monetary breach, the non-defaulting party must serve a 15 (fifteen) business days formal cure notice via registered speed post and email before instituting arbitral proceedings.\n`;
      } else if (lower.includes("rera") || lower.includes("indemnity")) {
        responseText = "Under Sections 11(4)(a) and 18(1) of the Real Estate (Regulation and Development) Act 2016, the promoter/seller is statutorily bound to compensate the buyer for any loss caused by defective land title. This obligation continues indefinitely even after possession handover!";
        actionSnippet = `\n\n[Clause 5.4 - Statutory RERA Title Indemnity]: Pursuant to Section 18 of RERA 2016, the Vendor undertakes full and perpetual indemnity to defend, indemnify, and hold harmless the Purchaser from any defect, encumbrance, or historical title deficiency discovered in the Schedule Property.\n`;
      } else {
        responseText = `I have analyzed "${query}". In standard Indian legal practice, clarity in notice periods, defined remedies for breach, and compliant dispute resolution forums under the Arbitration & Conciliation Act 1996 will provide maximum legal protection.`;
      }

      const lexiMsg: ChatMessage = {
        id: `lexi-${Date.now()}`,
        sender: 'lexi',
        text: responseText,
        actionSnippet,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: [
          "Explain liquidated damages vs penalty",
          "Add arbitration seat in Mumbai",
          "What happens if payment deadline is missed?"
        ]
      };

      setMessages((prev) => [...prev, lexiMsg]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col border-l border-[#FFCED8] animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFF4DE] via-[#FFCED8] to-[#F48B9B]/60 p-4 border-b border-[#FFCED8] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MascotAvatar size="md" isAnimated={true} />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-charcoal text-base">Lexi AI</h3>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-white text-rose-600 border border-rose-200">
                Online
              </span>
            </div>
            <p className="text-xs text-slateText font-medium">Senior Legal Intelligence & Clause Copilot</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/80 text-charcoal transition-colors"
          title="Close drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-[#FFF4DE]/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[88%]">
              {msg.sender === 'lexi' && <MascotAvatar size="sm" />}
              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#F48B9B] to-[#E15B70] text-white rounded-br-none'
                    : 'bg-white border border-[#FFCED8] text-charcoal rounded-bl-none shadow-card'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Direct Insert Action Button if clause was generated */}
                {msg.actionSnippet && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-2">
                    <div className="p-2 bg-[#FFF4DE] rounded-xl text-[11px] font-mono text-slate-800 border border-[#FFCED8]">
                      {msg.actionSnippet.trim()}
                    </div>
                    <button
                      onClick={() => onInsertClause(msg.actionSnippet!)}
                      className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Insert Clause into Lawyer Draft</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <span className="text-[10px] text-slate-400 mt-1 px-1">
              {msg.timestamp}
            </span>

            {/* Quick interactive chips if present */}
            {msg.chips && msg.chips.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                {msg.chips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="text-[11px] font-medium bg-[#FFF4DE] hover:bg-[#FFCED8] text-charcoal border border-[#F48B9B]/50 px-2.5 py-1 rounded-full transition-colors text-left"
                  >
                    ✦ {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slateText">
            <MascotAvatar size="sm" isAnimated={true} />
            <div className="bg-white px-3 py-2 rounded-2xl border border-[#FFCED8] flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 text-[11px] font-semibold text-charcoal">Lexi is drafting...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="p-3 border-t border-[#FFCED8] bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Lexi or request a clause edit..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#F48B9B] focus:ring-2 focus:ring-[#FFCED8] outline-none text-xs sm:text-sm text-charcoal placeholder-slate-400 bg-slate-50/50"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-[#F48B9B] to-[#E15B70] text-white hover:opacity-95 disabled:opacity-40 transition-opacity shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-center text-slateText mt-1.5">
          Lexi uses smart legal rule-engines & verified statutory models.
        </p>
      </div>
    </div>
  );
};
