CREATE TABLE "FileRecord" (
  "id" TEXT NOT NULL,
  "originalName" TEXT NOT NULL,
  "storedName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "path" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FileRecord_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "FileRecord_createdAt_idx" ON "FileRecord"("createdAt");
