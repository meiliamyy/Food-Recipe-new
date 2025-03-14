//import modul 
import express from 'express';
import sqlite3Module from 'sqlite3';
import cors from 'cors';

const sqlite3 = sqlite3Module.verbose();

//inisialisasi aplikasi
const app = express();
const port = 5000;

//menggunakan middleware 
app.use(cors());
app.use(express.json());

//membuka atau membuat database
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


//API 3: tambah resep baru (POST /recipes:)
app.post('/recipes', (req, res) => {
  const { nama, kategori, gambar, bahan, cara } = req.body;
  const sql = `INSERT INTO recipes (nama, kategori, gambar, bahan, cara) VALUES (?, ?, ?, ?, ?)`;

  db.run(sql, [nama, kategori, gambar, JSON.stringify(bahan), JSON.stringify(cara)], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
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

