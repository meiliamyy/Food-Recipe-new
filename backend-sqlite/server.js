//import modul 
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import express from 'express';
import sqlite3Module from 'sqlite3';
import cors from 'cors';
import multer from 'multer';

import fs from "fs";

// Pastikan folder asset ada
const uploadDir = path.join(__dirname, "src/asset");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


//inisialisasi express app
const app = express();
const port = 5000;

//menggunakan middleware/ enable cors
app.use(cors());
app.use(express.json());

// config storage for multer to store image in src/asset
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'src/asset'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });



//open/create the sqlite database
const sqlite3 = sqlite3Module.verbose();
const db = new sqlite3.Database('./recipes.db', (err) => {
    if (err) {
        return console.error('Error membuka database', err.message);
    }
    console.log('terkoneksi ke database SQLite')
});

//membuat tabel recipes
db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT,
      kategori TEXT,
      gambar TEXT,
      bahan TEXT, -- disimpan dalam format JSON
      cara TEXT   -- disimpan dalam format JSON
    )
  `, (err) => {
    if (err) {
      console.error("Error membuat tabel:", err.message);
    } else {
      console.log("Tabel recipes siap digunakan.");
    }
  });


//API 1 : Ambil semua resep (GET /recipes:)
app.get('/recipes', (req, res) => { //definisi route dan callback

  const sql = "SELECT * FROM recipes"; //menyusun query sql
  
  db.all(sql, [], (err, rows) => { //eksekusi query ke database
    if (err) {
      res.status(500).json({ error:err.message });
      return;
    }
    //parsing field JSON (bahan dan cara) untuk masing2 baris
    const data = rows.map(row => ({
      ...row,
      bahan: JSON.parse(row.bahan),
      cara: JSON.parse(row.cara)
    }));
    res.json(data);
  })
})

//API 2: ambil resep berdasarkan ID (GET /recipes/:id:)
app.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM recipes WHERE id = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Resep tidak ditemukan" });
      return;
    }
    row.bahan = JSON.parse(row.bahan);
    row.cara = JSON.parse(row.cara);
    res.json(row);
  });
});
        

//API 3: tambah resep baru (POST /recipes:) with image uploud 
app.post('/recipes', upload.single('gambar'), (req, res) => {
  console.log("🔥 Incoming Request Body:", req.body);
  console.log("🔥 Uploaded File:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "File tidak diunggah!" });
  }

  const { nama, kategori, bahan, cara } = req.body;
  if (!nama || !kategori || !bahan || !cara) {
    return res.status(400).json({ message: "Semua field harus diisi!" });
  }

  const gambarPath = `src/asset/${req.file.filename}`;

  const sql = `INSERT INTO recipes (nama, kategori, gambar, bahan, cara) VALUES (?, ?, ?, ?, ?)`;

  db.run(sql, [nama, kategori, gambarPath, JSON.stringify(bahan), JSON.stringify(cara)], function (err) {
    if (err) {
      console.error("❌ Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Resep berhasil ditambahkan",
      id: this.lastID
    });
  });
});




//menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

