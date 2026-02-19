CREATE TABLE "TeamStat" (
  "id" SERIAL NOT NULL,
  "metric" TEXT NOT NULL,
  "value" INTEGER NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "TeamStat_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SalesRecord" (
  "id" TEXT NOT NULL,
  "region" TEXT NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  "status" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SalesRecord_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "TeamStat_metric_key" ON "TeamStat"("metric");
CREATE INDEX "SalesRecord_createdAt_idx" ON "SalesRecord"("createdAt");
CREATE INDEX "SalesRecord_region_idx" ON "SalesRecord"("region");
