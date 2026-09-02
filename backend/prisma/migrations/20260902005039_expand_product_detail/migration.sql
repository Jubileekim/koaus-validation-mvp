-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brandOrigin" TEXT,
ADD COLUMN     "collaborationTypes" JSONB,
ADD COLUMN     "contentIdeas" JSONB,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "creatorFit" JSONB,
ADD COLUMN     "creatorPrice" DOUBLE PRECISION,
ADD COLUMN     "descriptionI18n" JSONB,
ADD COLUMN     "highlights" JSONB,
ADD COLUMN     "moq" INTEGER,
ADD COLUMN     "shipsTo" TEXT,
ADD COLUMN     "sourceUrl" TEXT;
