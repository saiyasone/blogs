-- AlterTable
ALTER TABLE `posts` MODIFY `content` LONGTEXT NULL,
    MODIFY `published_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
