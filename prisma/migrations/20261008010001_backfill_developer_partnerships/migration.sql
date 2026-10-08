-- Map existing Developer rows into a prospect partnership.
-- No agreement reference or compensation terms are invented.
INSERT INTO "DeveloperPartnership" (
  "id",
  "developerId",
  "relationshipStatus",
  "markets",
  "active",
  "publicVisibility",
  "createdAt",
  "updatedAt"
)
SELECT
  lower(hex(randomblob(16))),
  "id",
  'PROSPECT',
  '["Bangladesh"]',
  1,
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Developer"
WHERE "id" NOT IN (SELECT "developerId" FROM "DeveloperPartnership");
