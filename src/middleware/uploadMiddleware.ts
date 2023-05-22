import multer from 'multer';

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const extension = '.' + file.originalname.split('.').pop();
        console.log("extension", extension);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        console.log("uniqueSuffix", uniqueSuffix);
        cb(null, uniqueSuffix + extension);
    },
});

const fileFilter = (req: any, file: any, cb: any) => {
    console.log("file", file);
    if (file.fieldname == "user_image") {
        console.log("block1");
        if (
            file.mimetype.includes("image/jpeg") ||
            file.mimetype.includes("image/png")
        ) {
            console.log("block2");
            cb(null, true);
        } else {
            cb(null, false);
        }
    } else {
        cb(null, false);
    }
};
const uploadMiddleware = multer({ storage: fileStorage, fileFilter }).fields([
    {
        name: "user_image",
        maxCount: 1,
    }
]);
export default uploadMiddleware;

