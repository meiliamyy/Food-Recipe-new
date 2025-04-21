import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";

// Inisialisasi Supabase
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name:    process.env.CLOUDINARY_CLOUD_NAME,
  api_key:       process.env.CLOUDINARY_API_KEY,
  api_secret:    process.env.CLOUDINARY_API_SECRET,
});
export { cloudinary };
