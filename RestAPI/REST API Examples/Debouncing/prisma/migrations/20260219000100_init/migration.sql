CREATE TABLE "SearchAudit" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "query" TEXT NOT NULL,
  "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SearchAudit_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SearchAudit_userId_executedAt_idx" ON "SearchAudit"("userId", "executedAt");
