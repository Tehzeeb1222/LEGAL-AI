import { ClientIntakeData, RiskCard } from './types';

export const SAMPLE_CASE: ClientIntakeData = {
  caseId: "LA-2026-9481",
  agreementType: "Agreement for Absolute Sale & Conveyance",
  isSubmitted: true,
  submittedAt: "Oct 25, 2026, 04:30 PM IST",
  party1: {
    name: "Dr. Vikramaditya Singhania",
    contact: "+91 98201 54321",
    legalId: "AADHAAR: 4920 1829 4820 | PAN: ABFPS1928K",
    address: "Bunglow No. 14, Silver Oak Enclave, Worli Sea Face, Mumbai, Maharashtra 400030",
    email: "vikram.singhania@heritagehomes.in"
  },
  party2: {
    name: "M/s Apex Horizon Developers LLP (Rep. by Rajeshwari Rao)",
    contact: "+91 91672 88490",
    legalId: "LLPIN: AAB-8492 | PAN: AAFCA9921M",
    address: "Level 11, Cybertower One, BKC Commercial District, Bandra East, Mumbai 400051",
    email: "legal@apexhorizon.com"
  },
  property: {
    address: "Penthouse Suite 1902, 19th Floor, Horizon Solitaire Towers, Senapati Bapat Marg, Lower Parel",
    surveyPlotNumber: "CTS No. 492/A, Cadastral Survey 189 of Lower Parel Division",
    propertyType: "Luxury Residential Penthouse (Freehold)",
    squareFootage: "3,850 sq. ft. Carpet Area + 3 Dedicated Basement Parking Bays",
    city: "Mumbai",
    state: "Maharashtra"
  },
  financials: {
    totalConsideration: "₹ 14,50,00,000 (Rupees Fourteen Crores Fifty Lakhs Only)",
    securityDeposit: "₹ 1,50,00,000 (Token Advance / Escrow Hold)",
    paymentDeadline: "Balance ₹ 13.00 Cr payable within 60 days against registered deed execution",
    paymentMode: "RTGS / Wire Transfer via Scheduled Commercial Bank Escrow Account"
  }
};

export const INITIAL_RISKS: RiskCard[] = [
  {
    id: "risk-1",
    severity: "High",
    title: "Missing Default Penalty & Liquidated Damages",
    description: "The draft lacks a punitive interest clause if the Purchaser delays payment milestone or Vendor delays clear title delivery.",
    recommendation: "Insert Section 5.3 enforcing 18% p.a. interest penalty and forfeiture remedies under Section 74 of Indian Contract Act.",
    clauseInsertion: `<p class="my-3 p-3 bg-rose-50 border-l-4 border-[#F48B9B] rounded-r-lg font-sans text-xs"><strong>[AI Added Clause 5.3 - Liquidated Damages & Default Interest]:</strong> In the event of delay in payment of the Balance Consideration exceeding 7 (seven) business days beyond the stipulated deadline, the Purchaser shall be liable to pay penal interest at 18% per annum calculated daily on the outstanding sum. Should default exceed 30 days, the Vendor retains absolute discretion to rescind this Agreement and forfeit the initial Earnest Deposit as pre-estimated liquidated damages under Indian law.</p>`,
    isFixed: false
  },
  {
    id: "risk-2",
    severity: "Medium",
    title: "Vague Notice Period & Cure Clause",
    description: "Notice period for breach is unspecified, risking protracted disputes over reasonableness under Section 29.",
    recommendation: "Specify an exact 15-day registered written cure period with registered speed post and email notice.",
    clauseInsertion: `<p class="my-3 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg font-sans text-xs"><strong>[AI Added Clause 8.2 - Formal Notice & Cure Period]:</strong> Either Party alleging a breach shall deliver formal written notice via Registered A.D. and email. The defaulting Party shall be granted an immutable cure period of exactly 15 (fifteen) business days from date of receipt to remedy the breach prior to institution of arbitral proceedings.</p>`,
    isFixed: false
  },
  {
    id: "risk-3",
    severity: "Low",
    title: "RERA Section 11/13 Compliance Citation Omitted",
    description: "While property details are thorough, explicit statutory warranty of clear marketable title under RERA 2016 is unreferenced.",
    recommendation: "Embed statutory encumbrance disclosure warranty and Section 14 structural defect indemnity warranty.",
    clauseInsertion: `<p class="my-3 p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg font-sans text-xs"><strong>[AI Added Clause 3.4 - Statutory RERA & Title Warranty]:</strong> The Vendor covenants and guarantees that the Subject Property is free from all encumbrances, lis pendens, tax liens, statutory attachments, or third-party claims, compliant with the Real Estate (Regulation and Development) Act, 2016 (RERA), with complete indemnity extended to the Purchaser.</p>`,
    isFixed: false
  }
];

export const INITIAL_DRAFT_TEXT = `DEED OF ABSOLUTE SALE & CONVEYANCE

THIS DEED OF ABSOLUTE SALE is executed on this 25th day of October, 2026, at Mumbai, Maharashtra, by and between:

1. VENDOR / OWNER:
Dr. Vikramaditya Singhania, son of Late Sh. Arvind Singhania, residing at Bunglow No. 14, Silver Oak Enclave, Worli Sea Face, Mumbai 400030 (Aadhaar: 4920 1829 4820, PAN: ABFPS1928K), hereinafter referred to as the "VENDOR" (which expression shall unless repugnant to context include his heirs, executors, and assigns) of the FIRST PART.

AND

2. PURCHASER:
M/s Apex Horizon Developers LLP, an entity incorporated under the Limited Liability Partnership Act, 2008, having its Registered Office at Level 11, Cybertower One, BKC Commercial District, Bandra East, Mumbai 400051 (LLPIN: AAB-8492, PAN: AAFCA9921M), represented herein by its Authorised Partner Ms. Rajeshwari Rao, hereinafter referred to as the "PURCHASER" of the SECOND PART.

WHEREAS:
A. The Vendor is the absolute and lawful owner in peaceful physical possession of the Freehold Penthouse Property situated at Penthouse Suite 1902, 19th Floor, Horizon Solitaire Towers, Senapati Bapat Marg, Lower Parel, Mumbai, bearing Cadastral Survey No. 189, CTS No. 492/A, measuring approximately 3,850 sq. ft. Carpet Area along with 3 dedicated basement car parking bays (hereinafter referred to as the "SCHEDULE PROPERTY").
B. The Vendor has represented to the Purchaser that his title to the Schedule Property is clear, marketable, free from all liens, mortgages, charges, court attachments, or municipal dues.
C. The Purchaser has agreed to purchase and the Vendor has agreed to sell and convey all rights, titles, and interests in the Schedule Property for an agreed total sale consideration of ₹ 14,50,00,000 (Rupees Fourteen Crores Fifty Lakhs Only).

NOW THIS DEED WITNESSETH AND IT IS HEREBY MUTUALLY AGREED BY AND BETWEEN THE PARTIES AS FOLLOWS:

1. CONVEYANCE OF TITLE:
In pursuance of the said agreement and in consideration of the sum of ₹ 14,50,00,000 paid / agreed to be paid as set forth herein, the Vendor does hereby grant, convey, transfer, and assign forever unto the Purchaser all his legal and equitable rights, titles, interests, privileges, and appurtenances in and to the Schedule Property.

2. FINANCIAL CONSIDERATION & ESCROW:
2.1 The Purchaser has paid to the Vendor an Earnest Money Deposit / Advance sum of ₹ 1,50,00,000 (Rupees One Crore Fifty Lakhs Only) via RTGS transfer prior to execution hereof, the receipt whereof the Vendor doth hereby admit and acknowledge.
2.2 The balance consideration of ₹ 13,00,00,000 (Rupees Thirteen Crores Only) shall be deposited into the designated Commercial Bank Escrow Account upon presentation of this deed for registration before the Sub-Registrar of Assurances, Mumbai.

3. PEACEFUL VACANT POSSESSION & TITLE HANDOVER:
The Vendor covenants that simultaneously upon registration and disbursement of the balance consideration, the Vendor shall deliver to the Purchaser vacant, peaceful, and unencumbered physical possession of the Schedule Property together with all original title deeds, share certificates, sanctioned architectural plans, and occupation certificates (OC).

4. TAXES, OUTGOINGS & SOCIETY CHARGES:
All property taxes, municipal cess, water and electricity charges, and society maintenance dues up to the date of execution hereof have been fully discharged by the Vendor. From the date of physical possession, all future recurring outgoings shall be borne exclusively by the Purchaser.

5. INDEMNITY & COVENANT:
The Vendor indemnifies and holds harmless the Purchaser from any third-party claims, defect in prior ancestral title, unrecorded family settlements, or statutory recoveries relating to the period prior to this conveyance.

6. GOVERNING LAW & ARBITRATION:
This Deed shall be governed by and construed in accordance with the Laws of the Republic of India. Any dispute arising out of or in connection with this Deed shall be referred to sole arbitration in Mumbai under the Arbitration and Conciliation Act, 1996. Courts in Mumbai alone shall have exclusive jurisdiction.

IN WITNESS WHEREOF the Parties hereto have signed and sealed this Deed on the day, month, and year first above written.

_____________________________               _____________________________
VENDOR: Dr. Vikramaditya Singhania         PURCHASER: M/s Apex Horizon Developers LLP
                                            (By Authorised Signatory)

WITNESS 1:                                  WITNESS 2:
Name: ______________________                 Name: ______________________
Address: ___________________                 Address: ___________________
`;
