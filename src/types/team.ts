export type Team = {
  id: string;
  name: string;
  shortName: string;
  color: string;
  budget: number;
  budgetUsed: number;
  manager?: string | null;
};
