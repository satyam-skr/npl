export type PlayerStatus = "AVAILABLE" | "ON_AUCTION" | "SOLD" | "UNSOLD";
export type SkillType = "BATTING" | "BOWLING" | "ALL_ROUNDER";

export type Player = {
  id: string;
  name: string;
  skillType: SkillType;
  battingLevel?: string | null;
  bowlingLevel?: string | null;
  basePrice: number;
  jerseyNumber?: number | null;
  year?: number | null;
  status: PlayerStatus;
  soldPrice?: number | null;
  teamId?: string | null;
  stats?: Record<string, number> | null;
};
