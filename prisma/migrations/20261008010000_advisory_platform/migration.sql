-- Additive advisory-platform schema. Preserves existing rows.
-- Developer, Lead, and ViewingRequest are rebuilt with new columns and
-- copied data. New partnership, deal, and compensation tables are created.

-- CreateTable
CREATE TABLE "DeveloperPartnership" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "developerId" TEXT NOT NULL,
    "relationshipStatus" TEXT NOT NULL DEFAULT 'PROSPECT',
    "startDate" DATETIME,
    "endDate" DATETIME,
    "markets" JSONB NOT NULL,
    "agreementReference" TEXT,
    "internalNotes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "publicVisibility" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DeveloperPartnership_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeveloperCompensation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "partnershipId" TEXT NOT NULL,
    "compensationType" TEXT NOT NULL DEFAULT 'PERCENTAGE',
    "agreementStatus" TEXT NOT NULL DEFAULT 'DRAFT',
    "agreementReference" TEXT,
    "percentage" DECIMAL,
    "fixedAmount" DECIMAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "paymentStatus" TEXT NOT NULL DEFAULT 'NOT_DUE',
    "paymentDate" DATETIME,
    "transactionReference" TEXT,
    "internalNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DeveloperCompensation_partnershipId_fkey" FOREIGN KEY ("partnershipId") REFERENCES "DeveloperPartnership" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "developerId" TEXT,
    "developmentId" TEXT,
    "propertyId" TEXT,
    "unitId" TEXT,
    "assignedAdvisorId" TEXT,
    "stage" TEXT NOT NULL DEFAULT 'BUYER_LEAD',
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "estimatedValue" DECIMAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "developerReferralAt" DATETIME,
    "viewingAt" DATETIME,
    "reservationAt" DATETIME,
    "contractAt" DATETIME,
    "completionAt" DATETIME,
    "internalNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deal_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deal_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Deal_developmentId_fkey" FOREIGN KEY ("developmentId") REFERENCES "Development" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Deal_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Deal_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Deal_assignedAdvisorId_fkey" FOREIGN KEY ("assignedAdvisorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DealCompensation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dealId" TEXT NOT NULL,
    "compensationType" TEXT NOT NULL DEFAULT 'PERCENTAGE',
    "agreementStatus" TEXT NOT NULL DEFAULT 'DRAFT',
    "agreementReference" TEXT,
    "percentage" DECIMAL,
    "expectedAmount" DECIMAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "paymentStatus" TEXT NOT NULL DEFAULT 'NOT_DUE',
    "paymentDate" DATETIME,
    "transactionReference" TEXT,
    "internalNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DealCompensation_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Developer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publicDescription" TEXT NOT NULL DEFAULT '',
    "logoUrl" TEXT,
    "website" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Bangladesh',
    "cities" JSONB,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PROSPECT',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "relationshipNotes" TEXT,
    "internalNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Developer" ("description", "featured", "id", "logoUrl", "name", "published", "slug", "verified", "website", "createdAt", "updatedAt")
SELECT "description", "featured", "id", "logoUrl", "name", "published", "slug", "verified", "website", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM "Developer";
DROP TABLE "Developer";
ALTER TABLE "new_Developer" RENAME TO "Developer";
CREATE UNIQUE INDEX "Developer_slug_key" ON "Developer"("slug");
CREATE TABLE "new_Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "buyerCity" TEXT,
    "nationality" TEXT,
    "residenceCountry" TEXT,
    "preferredMarket" TEXT,
    "preferredCity" TEXT,
    "propertyType" TEXT,
    "budget" TEXT,
    "budgetMin" DECIMAL,
    "budgetMax" DECIMAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "bedrooms" INTEGER,
    "purpose" TEXT,
    "timeline" TEXT,
    "financingStatus" TEXT,
    "contactMethod" TEXT NOT NULL DEFAULT 'EMAIL',
    "source" TEXT NOT NULL DEFAULT 'WEBSITE',
    "message" TEXT NOT NULL,
    "inquiryType" TEXT NOT NULL DEFAULT 'SALES',
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "qualificationStatus" TEXT NOT NULL DEFAULT 'UNQUALIFIED',
    "propertyId" TEXT,
    "developmentId" TEXT,
    "developerId" TEXT,
    "assignedStaffId" TEXT,
    "notes" TEXT,
    "nextFollowUpAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lead_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lead_developmentId_fkey" FOREIGN KEY ("developmentId") REFERENCES "Development" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lead_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lead_assignedStaffId_fkey" FOREIGN KEY ("assignedStaffId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lead" ("budget", "contactMethod", "country", "createdAt", "email", "id", "inquiryType", "message", "name", "notes", "phone", "propertyId", "status", "updatedAt") SELECT "budget", "contactMethod", "country", "createdAt", "email", "id", "inquiryType", "message", "name", "notes", "phone", "propertyId", "status", "updatedAt" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
CREATE INDEX "Lead_status_idx" ON "Lead"("status");
CREATE INDEX "Lead_email_idx" ON "Lead"("email");
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");
CREATE INDEX "Lead_propertyId_idx" ON "Lead"("propertyId");
CREATE INDEX "Lead_developerId_idx" ON "Lead"("developerId");
CREATE INDEX "Lead_assignedStaffId_idx" ON "Lead"("assignedStaffId");
CREATE INDEX "Lead_qualificationStatus_idx" ON "Lead"("qualificationStatus");
CREATE TABLE "new_ViewingRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "preferredDate" DATETIME NOT NULL,
    "preferredTime" TEXT NOT NULL,
    "viewingType" TEXT NOT NULL DEFAULT 'IN_PERSON',
    "locationNote" TEXT,
    "contactMethod" TEXT NOT NULL DEFAULT 'EMAIL',
    "message" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "developerConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "propertyId" TEXT NOT NULL,
    "leadId" TEXT,
    "developerId" TEXT,
    "assignedAdvisorId" TEXT,
    "dealId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ViewingRequest_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ViewingRequest_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ViewingRequest_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ViewingRequest_assignedAdvisorId_fkey" FOREIGN KEY ("assignedAdvisorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ViewingRequest_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ViewingRequest" ("contactMethod", "createdAt", "email", "id", "message", "name", "phone", "preferredDate", "preferredTime", "propertyId", "status", "updatedAt") SELECT "contactMethod", "createdAt", "email", "id", "message", "name", "phone", "preferredDate", "preferredTime", "propertyId", "status", "updatedAt" FROM "ViewingRequest";
DROP TABLE "ViewingRequest";
ALTER TABLE "new_ViewingRequest" RENAME TO "ViewingRequest";
CREATE INDEX "ViewingRequest_propertyId_idx" ON "ViewingRequest"("propertyId");
CREATE INDEX "ViewingRequest_status_idx" ON "ViewingRequest"("status");
CREATE INDEX "ViewingRequest_leadId_idx" ON "ViewingRequest"("leadId");
CREATE INDEX "ViewingRequest_developerId_idx" ON "ViewingRequest"("developerId");
CREATE INDEX "ViewingRequest_dealId_idx" ON "ViewingRequest"("dealId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "DeveloperPartnership_developerId_idx" ON "DeveloperPartnership"("developerId");

-- CreateIndex
CREATE INDEX "DeveloperPartnership_active_idx" ON "DeveloperPartnership"("active");

-- CreateIndex
CREATE INDEX "DeveloperPartnership_relationshipStatus_idx" ON "DeveloperPartnership"("relationshipStatus");

-- CreateIndex
CREATE INDEX "DeveloperCompensation_partnershipId_idx" ON "DeveloperCompensation"("partnershipId");

-- CreateIndex
CREATE INDEX "Deal_leadId_idx" ON "Deal"("leadId");

-- CreateIndex
CREATE INDEX "Deal_developerId_idx" ON "Deal"("developerId");

-- CreateIndex
CREATE INDEX "Deal_propertyId_idx" ON "Deal"("propertyId");

-- CreateIndex
CREATE INDEX "Deal_stage_idx" ON "Deal"("stage");

-- CreateIndex
CREATE INDEX "Deal_status_idx" ON "Deal"("status");

-- CreateIndex
CREATE INDEX "Deal_assignedAdvisorId_idx" ON "Deal"("assignedAdvisorId");

-- CreateIndex
CREATE UNIQUE INDEX "DealCompensation_dealId_key" ON "DealCompensation"("dealId");

-- Map existing developer copy into the public-facing field. Commercial terms stay empty.
UPDATE "Developer" SET "publicDescription" = "description" WHERE "publicDescription" = '';
UPDATE "Developer" SET "country" = 'Bangladesh' WHERE "country" IS NULL OR "country" = '';
