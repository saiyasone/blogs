/*
  Warnings:

  - You are about to drop the `post_likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post_likes` DROP FOREIGN KEY `Post_Likes_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `post_likes` DROP FOREIGN KEY `Post_Likes_user_id_fkey`;

-- AlterTable
ALTER TABLE `posts` ADD COLUMN `like` INTEGER NULL DEFAULT 0;

-- DropTable
DROP TABLE `post_likes`;
