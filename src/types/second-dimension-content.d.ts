export interface StepOfAGoodDecision {
  id: string;
  title: string;
  description: string;
}

export interface SecondDimensionContent {
  id: string;
  aGoodDecisionContent: string[];
  stepsOfAGoodDecisionContent: StepOfAGoodDecision[];
  takeIntoAccountAGoodDecisionContent: string[];
  createdAt: Date;
  updatedAt: Date;
}
