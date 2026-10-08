-- Buyer journey: shortlist, developer introductions, optional property note.

-- AlterTable
ALTER TABLE "Property" ADD COLUMN "whyThisProperty" TEXT;

-- CreateTable
CREATE TABLE "LeadShortlistItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "developerId" TEXT,
    "developmentId" TEXT,
    "estimatedPrice" DECIMAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "locationNote" TEXT,
    "keyFeatures" TEXT,
    "notes" TEXT,
    "advisorRecommendation" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LeadShortlistItem_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LeadShortlistItem_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LeadShortlistItem_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "LeadShortlistItem_developmentId_fkey" FOREIGN KEY ("developmentId") REFERENCES "Development" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeveloperIntroduction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "dealId" TEXT,
    "developerId" TEXT NOT NULL,
    "introducedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactPerson" TEXT,
    "method" TEXT NOT NULL DEFAULT 'EMAIL',
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SENT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DeveloperIntroduction_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DeveloperIntroduction_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DeveloperIntroduction_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "LeadShortlistItem_leadId_propertyId_key" ON "LeadShortlistItem"("leadId", "propertyId");

-- CreateIndex
CREATE INDEX "LeadShortlistItem_leadId_idx" ON "LeadShortlistItem"("leadId");

-- CreateIndex
CREATE INDEX "LeadShortlistItem_propertyId_idx" ON "LeadShortlistItem"("propertyId");

-- CreateIndex
CREATE INDEX "DeveloperIntroduction_leadId_idx" ON "DeveloperIntroduction"("leadId");

-- CreateIndex
CREATE INDEX "DeveloperIntroduction_dealId_idx" ON "DeveloperIntroduction"("dealId");

-- CreateIndex
CREATE INDEX "DeveloperIntroduction_developerId_idx" ON "DeveloperIntroduction"("developerId");

-- CreateIndex
CREATE INDEX "DeveloperIntroduction_status_idx" ON "DeveloperIntroduction"("status");
