-- AlterTable
ALTER TABLE "Post" ADD COLUMN "authorUserId" TEXT;

-- CreateIndex
CREATE INDEX "Post_authorUserId_idx" ON "Post"("authorUserId");

-- AddForeignKey
ALTER TABLE "Post"
ADD CONSTRAINT "Post_authorUserId_fkey"
FOREIGN KEY ("authorUserId") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
