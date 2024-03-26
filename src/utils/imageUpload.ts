import multer from "multer";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

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

// {
//   asset_id: '72f5d8c7633c9ee3dcfc8b7b30c66134',
//   public_id: 'jypfciodgnvcamlwhjrf',
//   version: 1711488684,
//   version_id: 'c85befb1c500d74acc66fd7553986439',
//   signature: 'c14b00802f65d9dd8f4940e1de85b6581bf58367',
//   width: 640,
//   height: 427,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2024-03-26T21:31:24Z',
//   tags: [],
//   bytes: 189009,
//   type: 'upload',
//   etag: '1d0576b614511c8b3605855e0553f706',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/djoqdkygb/image/upload/v1711488684/jypfciodgnvcamlwhjrf.jpg',
//   secure_url: 'https://res.cloudinary.com/djoqdkygb/image/upload/v1711488684/jypfciodgnvcamlwhjrf.jpg',
//   folder: '',
//   original_filename: '1646986082119',
//   api_key: '283715699838957'
// }


cloudinary.config({
  cloud_name: 'djoqdkygb',
  api_key: '283715699838957',
  api_secret: 'LkRA7_PCjzA7nCxgRieanNPd09M'
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
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