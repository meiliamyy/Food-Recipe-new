import Busboy from "busboy";
import { supabase, cloudinary } from "./_config.js";

export async function handler(event) {
  return new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: event.headers });
    let fields = {}, fileBuffer = null, filename = "";

    // Tangani field text
    busboy.on("field", (name, val) => fields[name] = val);

    // Tangani upload file
    busboy.on("file", (_name, file, info) => {
      filename = info.filename;
      const chunks = [];
      file.on("data", chunk => chunks.push(chunk));
      file.on("end", () => fileBuffer = Buffer.concat(chunks));
    });

    busboy.on("finish", async () => {
      try {
        // Upload ke Cloudinary
        const uploadRes = await cloudinary.uploader.upload_stream(
          { folder: "food-recipes" },
          (err, result) => {
            if (err) throw err;
            return result;
          }
        );
        // Supabase menyimpan data
        const { data, error } = await supabase
          .from("recipes")
          .insert([{
            nama:     fields.nama,
            kategori: fields.kategori,
            gambar:   uploadRes.secure_url,
            bahan:    fields.bahan,   // harus JSON.stringify di client
            cara:     fields.cara,
          }]);
        if (error) throw error;
        resolve({ statusCode: 200, body: JSON.stringify(data) });
      } catch (err) {
        resolve({ statusCode: 500, body: JSON.stringify(err.message) });
      }
    });

    // Mulai parsing
    busboy.end(Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8"));
  });
}
