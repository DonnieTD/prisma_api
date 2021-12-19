-- CreateTable
CREATE TABLE "Enquiries" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
