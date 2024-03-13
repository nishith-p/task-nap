-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('MEMBER', 'MANAGER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('SOFTWARE', 'MARKETING', 'BUSINESS');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('OPEN', 'CLOSE');

-- CreateEnum
CREATE TYPE "TaskCategory" AS ENUM ('BUG', 'CR', 'FR');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('BACKLOG', 'SELECTED', 'INPROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userExternalId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profilePic" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectExternalId" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectOwnerId" TEXT NOT NULL,
    "projectDesc" TEXT NOT NULL,
    "projectCategory" "ProjectCategory" NOT NULL,
    "projectStatus" "ProjectStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "taskExternalId" SERIAL NOT NULL,
    "taskTitle" TEXT NOT NULL,
    "taskDesc" TEXT NOT NULL,
    "taskCategory" "TaskCategory" NOT NULL DEFAULT 'BUG',
    "taskStatus" "TaskStatus" NOT NULL DEFAULT 'BACKLOG',
    "taskCreatorId" TEXT NOT NULL,
    "taskAssigneeId" TEXT NOT NULL,
    "taskPriority" "TaskPriority" NOT NULL DEFAULT 'LOW',
    "taskEstimate" DOUBLE PRECISION NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMembers" (
    "projectId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "ProjectMembers_pkey" PRIMARY KEY ("projectId","memberId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_projectOwnerId_fkey" FOREIGN KEY ("projectOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskCreatorId_fkey" FOREIGN KEY ("taskCreatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskAssigneeId_fkey" FOREIGN KEY ("taskAssigneeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMembers" ADD CONSTRAINT "ProjectMembers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMembers" ADD CONSTRAINT "ProjectMembers_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
