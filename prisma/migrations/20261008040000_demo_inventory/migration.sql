-- Mark seed/sample inventory so it cannot appear as genuine production listings.

ALTER TABLE "Property" ADD COLUMN "demo" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Development" ADD COLUMN "demo" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "NewsArticle" ADD COLUMN "demo" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Job" ADD COLUMN "demo" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "Property_demo_idx" ON "Property"("demo");
CREATE INDEX "Development_demo_idx" ON "Development"("demo");
CREATE INDEX "NewsArticle_demo_idx" ON "NewsArticle"("demo");
CREATE INDEX "Job_demo_idx" ON "Job"("demo");
