import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const contentFolderPath = process.env.VITE_CONTENT_PATH;

const projectRoot = process.cwd();
const docsFolderPath = path.join(projectRoot, "src", "content");

if (!fs.existsSync(docsFolderPath)) {
  fs.mkdirSync(docsFolderPath, { recursive: true });
}

const importMarkdownFiles = () => {
  fs.readdir(contentFolderPath, (err, files) => {
    if (err) {
      console.error("🟧 Error reading source directory:", err);
      return;
    }

    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    markdownFiles.forEach((file) => {
      const sourceFilePath = path.join(contentFolderPath, file);
      const destinationFilePath = path.join(docsFolderPath, file);
      fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
        if (err) {
          console.error(`🟧 Error copying file ${file}:`, err);
        } else {
          console.log(
            `🟩 Successfully copied ${file} to ${destinationFilePath}`,
          );
        }
      });
    });
  });
};

importMarkdownFiles();
