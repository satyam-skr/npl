import { Badge } from "@/components/ui/badge";

export function PlayerSkillsBadge({ skillType, battingLevel, bowlingLevel }: { skillType: string; battingLevel?: string | null; bowlingLevel?: string | null }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">{skillType.replace("_", " ")}</Badge>
      {battingLevel ? <Badge variant="outline">Bat {battingLevel}</Badge> : null}
      {bowlingLevel ? <Badge variant="outline">Bowl {bowlingLevel}</Badge> : null}
    </div>
  );
}
