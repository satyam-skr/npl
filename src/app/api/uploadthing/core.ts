import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const f = createUploadthing();

async function getAuthenticatedUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new UploadThingError("Unauthorized");
  return session.user as typeof session.user & { role?: string };
}

export const ourFileRouter = {
  playerPhoto: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await getAuthenticatedUser();
      if (user.role !== "ADMIN" && user.role !== "AUCTIONEER") throw new UploadThingError("Permission denied");
      return { userId: user.id, userRole: user.role };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.mediaUpload.create({
        data: { url: file.ufsUrl, key: file.key, fileName: file.name, fileSize: file.size, mimeType: file.type, uploadedBy: metadata.userId, entityType: "player_photo" },
      });
      return { url: file.ufsUrl, key: file.key };
    }),
  teamLogo: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await getAuthenticatedUser();
      if (user.role !== "ADMIN") throw new UploadThingError("Admin only");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.mediaUpload.create({
        data: { url: file.ufsUrl, key: file.key, fileName: file.name, fileSize: file.size, mimeType: file.type, uploadedBy: metadata.userId, entityType: "team_logo" },
      });
      return { url: file.ufsUrl, key: file.key };
    }),
  profileAvatar: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await getAuthenticatedUser();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.user.update({ where: { id: metadata.userId }, data: { image: file.ufsUrl } });
      await prisma.mediaUpload.create({
        data: { url: file.ufsUrl, key: file.key, fileName: file.name, fileSize: file.size, mimeType: file.type, uploadedBy: metadata.userId, entityType: "profile_avatar", entityId: metadata.userId },
      });
      return { url: file.ufsUrl };
    }),
  playerImportCSV: f({ text: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await getAuthenticatedUser();
      if (user.role !== "ADMIN") throw new UploadThingError("Admin only");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ file }) => ({ url: file.ufsUrl, key: file.key })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
