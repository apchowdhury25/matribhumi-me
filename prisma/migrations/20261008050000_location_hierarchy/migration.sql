-- City → neighborhood hierarchy on Location (additive).
-- SQLite: Prisma enums are stored as TEXT.

ALTER TABLE "Location" ADD COLUMN "kind" TEXT NOT NULL DEFAULT 'CITY';
ALTER TABLE "Location" ADD COLUMN "parentId" TEXT;
ALTER TABLE "Location" ADD COLUMN "category" TEXT;
ALTER TABLE "Location" ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

CREATE INDEX "Location_parentId_idx" ON "Location"("parentId");
CREATE INDEX "Location_kind_idx" ON "Location"("kind");
CREATE INDEX "Location_city_idx" ON "Location"("city");
