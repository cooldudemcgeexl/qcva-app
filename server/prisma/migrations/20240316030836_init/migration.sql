-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "age" INTEGER
);

-- CreateTable
CREATE TABLE "PoleHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "poleId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "comment" TEXT NOT NULL,
    CONSTRAINT "PoleHistory_poleId_fkey" FOREIGN KEY ("poleId") REFERENCES "Pole" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "length" TEXT NOT NULL,
    "cm" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "flex" DECIMAL NOT NULL,
    "serialNumber" TEXT,
    "status" TEXT NOT NULL,
    "dop" DATETIME NOT NULL,
    "note" TEXT,
    "nfc" TEXT,
    "cost" DECIMAL NOT NULL,
    "soldAt" DECIMAL,
    "revenue" DECIMAL
);

-- CreateTable
CREATE TABLE "PoleRate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "length" TEXT NOT NULL,
    "newRate" DECIMAL,
    "clubNewRate" DECIMAL,
    "usedRate" DECIMAL,
    "clubUsedRate" DECIMAL,
    "rentSeason" DECIMAL,
    "rentMonth" DECIMAL,
    "rentMeet" DECIMAL
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "phone" TEXT,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "orderDate" DATETIME NOT NULL,
    "orderTotal" DECIMAL NOT NULL,
    "closed" BOOLEAN NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderType" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "poleId" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_poleId_fkey" FOREIGN KEY ("poleId") REFERENCES "Pole" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PoleHistory_id_key" ON "PoleHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pole_id_key" ON "Pole"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pole_nfc_key" ON "Pole"("nfc");

-- CreateIndex
CREATE UNIQUE INDEX "PoleRate_id_key" ON "PoleRate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PoleRate_length_key" ON "PoleRate"("length");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_id_key" ON "OrderItem"("id");
