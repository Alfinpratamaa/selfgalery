import multer from "multer";
import fs from "fs/promises";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: async (req, file, cb) => {
    const uniqueFilename = await getUniqueFilename(
      "uploads",
      file.originalname
    );
    cb(null, new Date().toISOString() + "_" + uniqueFilename);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/tiff" ||
    file.mimetype === "image/bmp" ||
    file.mimetype === "image/vnd.microsoft.icon"
  ) {
    cb(null, true);
  } else
    ({
      error: "Invalid file type. Only images are allowed!",
    });
};

const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024,
  },
  fileFilter,
});

const getUniqueFilename = async (path: string, filename: string) => {
  const extension = filename.split(".").pop();
  const baseName = extension
    ? filename.slice(0, -(extension.length + 1))
    : filename;

  let newName = filename;
  let counter = 1;

  while (true) {
    try {
      await fs.access(`${path}/${newName}`);
      newName = `${baseName} (${counter}).${extension}`;
      counter++;
    } catch (error) {
      break;
    }
  }

  return newName;
};

export default upload;
