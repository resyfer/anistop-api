import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";

import { initializeAWS, s3 } from "@utils/aws";
// import {
//   FILE_UPLOAD_LIMIT_IMG,
//   FILE_UPLOAD_LIMIT_VIDEO,
// } from "@globals/constants";

let upload: multer.Multer;

function initializeMulter() {
  initializeAWS();
  upload = multer({
    storage: multerS3({
      s3,
      cacheControl: "max-age=31536000",
      bucket: process.env.AWS_S3_BUCKET_NAME!,
      acl: "public-read",
      contentDisposition: "inline",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (_, file, cb) {
        cb(null, uuidv4() + "_" + file.originalname);
      },
    }),
    // fileFilter: (_, file, cb) => {
    // const imgRE = /image\/[a-zA-Z0-9]*/;
    // const videoRE = /video\/[a-zA-Z0-9]*/;

    // Only fieldName, originalName, encoding, mimetype is visible for file
    // console.log(file.size);

    // if (imgRE.test(file.mimetype) && file.size <= FILE_UPLOAD_LIMIT_IMG) {
    //   cb(null, true);
    // } else if (
    //   videoRE.test(file.mimetype) &&
    //   file.size <= FILE_UPLOAD_LIMIT_VIDEO
    // ) {
    //   cb(null, true);
    // } else {
    //   cb(new Error("File of large size or unknown type."));
    // }
    // },
  });
}

export { initializeMulter, upload };
