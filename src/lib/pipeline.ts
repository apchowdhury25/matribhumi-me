import type { DealStage, DealStatus } from "@prisma/client";

export const pipelineColumns = [
  { key: "BUYER_LEAD", label: "New lead" },
  { key: "CONTACTED", label: "Contacted" },
  { key: "QUALIFIED", label: "Qualified" },
  { key: "SHORTLISTED", label: "Shortlisted" },
  { key: "DEVELOPER_INTRODUCTION", label: "Developer introduced" },
  { key: "VIEWING", label: "Viewing" },
  { key: "PROPERTY_SELECTED", label: "Property selected" },
  { key: "RESERVATION", label: "Reservation" },
  { key: "CONTRACT", label: "Contract" },
  { key: "COMPLETION", label: "Completion" },
  { key: "CLOSED", label: "Closed" },
  { key: "LOST", label: "Lost / withdrawn" },
] as const;

export type PipelineColumn = (typeof pipelineColumns)[number]["key"];

export const dealStageValues = [
  "BUYER_LEAD",
  "CONTACTED",
  "QUALIFICATION",
  "QUALIFIED",
  "SHORTLISTED",
  "DEVELOPER_INTRODUCTION",
  "VIEWING",
  "PROPERTY_SELECTED",
  "RESERVATION",
  "CONTRACT",
  "COMPLETION",
  "CLOSED",
  "LOST",
  "WITHDRAWN",
] as const satisfies readonly DealStage[];

const SELECTED_OR_LATER: PipelineColumn[] = [
  "PROPERTY_SELECTED",
  "RESERVATION",
  "CONTRACT",
  "COMPLETION",
  "CLOSED",
];

export function normalizeDealStage(stage: string): PipelineColumn {
  if (stage === "QUALIFICATION" || stage === "QUALIFIED") return "QUALIFIED";
  if (stage === "WITHDRAWN") return "LOST";
  if (pipelineColumns.some((column) => column.key === stage)) return stage as PipelineColumn;
  return "BUYER_LEAD";
}

export function pipelineColumnForDeal(deal: { stage: string; status: DealStatus | string }): PipelineColumn {
  if (deal.status === "LOST" || deal.stage === "LOST") return "LOST";
  if (deal.status === "CANCELLED" || deal.stage === "WITHDRAWN") return "LOST";
  return normalizeDealStage(deal.stage);
}

export function statusForStage(stage: DealStage | string, current: DealStatus | string = "OPEN"): DealStatus {
  if (stage === "CLOSED") return "WON";
  if (stage === "LOST") return "LOST";
  if (stage === "WITHDRAWN") return "CANCELLED";
  if (current === "WON" || current === "LOST" || current === "CANCELLED") return "OPEN";
  return (current as DealStatus) || "OPEN";
}

export function reachedPropertySelected(stage: string, status: string) {
  const column = pipelineColumnForDeal({ stage, status });
  return SELECTED_OR_LATER.includes(column);
}

export function pipelineLabel(stage: string) {
  const column = pipelineColumns.find((item) => item.key === normalizeDealStage(stage));
  return column?.label ?? stage;
}
