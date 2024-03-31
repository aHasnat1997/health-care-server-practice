import multer from "multer";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from "../config";

export type TImageUpload = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  api_key: string;
};

const filePath = path.join(process.cwd(), 'uploads')

cloudinary.config({
  cloud_name: config.CLOUDINARY.CLOUD_NAME,
  api_key: config.CLOUDINARY.API_KEY,
  api_secret: config.CLOUDINARY.API_SECRET
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // fs.createWriteStream(filePath);
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage });

const uploadToCloudinary = async (path: string) => new Promise((resolve, reject) => {
  cloudinary.uploader.upload(
    path,
    ((error, result) => {
      fs.unlinkSync(path);
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  );
});

export const uploadImage = {
  upload,
  uploadToCloudinary
}