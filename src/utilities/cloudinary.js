import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload file
    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploded successfully
    // console.log("file is uploaded in cloudinary", uploadResponse.url);
    fs.unlinkSync(localFilePath)
    return uploadResponse;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporay aved temporary file as the upload operation failed
    return null;
  }
};

export { uploadOnCloudinary };
