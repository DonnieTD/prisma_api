-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "markdown" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
