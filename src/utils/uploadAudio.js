import multer from 'multer'

let s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${s4()}-${originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "audio") {
    cb(null, true);
  } else {
    cb(new Error("incorrect file type"), false);
  }
};
export const upload = multer({storage,fileFilter});