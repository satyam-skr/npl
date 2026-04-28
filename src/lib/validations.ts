import { z } from "zod";

export const playerSchema = z.object({
  name: z.string().min(2),
  skillType: z.enum(["BATTING", "BOWLING", "ALL_ROUNDER"]),
  battingLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]).optional(),
  bowlingLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]).optional(),
  basePrice: z.coerce.number().int().positive(),
  jerseyNumber: z.coerce.number().int().positive().optional(),
  college: z.string().optional(),
  year: z.coerce.number().int().min(1).max(5).optional(),
  bio: z.string().optional(),
});

export const bidSchema = z.object({
  auctionItemId: z.string().min(1),
  amount: z.coerce.number().int().positive(),
});
