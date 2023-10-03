-- CreateTable
CREATE TABLE "Element" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "premiere" TIMESTAMP(3),
    "youtube_id" TEXT,
    "images" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "adultsOnly" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);
