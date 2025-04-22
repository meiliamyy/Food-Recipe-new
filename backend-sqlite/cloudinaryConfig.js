import cloudinary from 'cloudinary';

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

// Export the upload functions
export async function uploadImage(imagePath) {
  // Upload the image to Cloudinary
  const result = await cloudinary.uploader.upload(imagePath);
  return result.secure_url;
}

export async function uploadStream(imageBuffer) {
  // Upload the image to Cloudinary
  const result = await cloudinary.uploader.upload_stream(imageBuffer);
  return result.secure_url;
}