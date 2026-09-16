-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "creatorMargin" INTEGER,
ADD COLUMN     "images" JSONB,
ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nameKo" TEXT,
ADD COLUMN     "retailPrice" DOUBLE PRECISION,
ADD COLUMN     "sampleAvailable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tagline" JSONB;
