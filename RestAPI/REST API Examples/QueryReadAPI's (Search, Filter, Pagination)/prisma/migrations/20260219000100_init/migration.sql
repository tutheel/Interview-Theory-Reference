CREATE TABLE "CatalogItem" (
  "id" TEXT NOT NULL,
  "sku" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price" DECIMAL(10,2) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CatalogItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CatalogItem_sku_key" ON "CatalogItem"("sku");
CREATE INDEX "CatalogItem_name_idx" ON "CatalogItem"("name");
CREATE INDEX "CatalogItem_category_createdAt_idx" ON "CatalogItem"("category", "createdAt");
