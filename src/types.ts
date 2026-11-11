export interface PartyDetails {
  name: string;
  contact: string;
  legalId: string;
  address: string;
  email?: string;
}

export interface PropertySpecs {
  address: string;
  surveyPlotNumber: string;
  propertyType: string;
  squareFootage: string;
  city: string;
  state: string;
}

export interface Financials {
  totalConsideration: string;
  securityDeposit: string;
  paymentDeadline: string;
  paymentMode: string;
}

export interface ClientIntakeData {
  party1: PartyDetails;
  party2: PartyDetails;
  property: PropertySpecs;
  financials: Financials;
  agreementType: string;
  isSubmitted: boolean;
  submittedAt?: string;
  caseId: string;
}

export interface RiskCard {
  id: string;
  severity: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  recommendation: string;
  clauseInsertion: string;
  isFixed: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'lexi';
  text: string;
  timestamp: string;
  actionSnippet?: string;
  chips?: string[];
}
