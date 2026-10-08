-- Advisory CRM: follow-up tasks. DealStage additions are SQLite TEXT and need no ALTER.

CREATE TABLE "FollowUp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT,
    "dealId" TEXT,
    "developerId" TEXT,
    "assignedAdvisorId" TEXT,
    "dueAt" DATETIME NOT NULL,
    "task" TEXT NOT NULL,
    "note" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FollowUp_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FollowUp_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FollowUp_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FollowUp_assignedAdvisorId_fkey" FOREIGN KEY ("assignedAdvisorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX "FollowUp_dueAt_idx" ON "FollowUp"("dueAt");
CREATE INDEX "FollowUp_completed_idx" ON "FollowUp"("completed");
CREATE INDEX "FollowUp_leadId_idx" ON "FollowUp"("leadId");
CREATE INDEX "FollowUp_dealId_idx" ON "FollowUp"("dealId");
CREATE INDEX "FollowUp_developerId_idx" ON "FollowUp"("developerId");
CREATE INDEX "FollowUp_assignedAdvisorId_idx" ON "FollowUp"("assignedAdvisorId");
