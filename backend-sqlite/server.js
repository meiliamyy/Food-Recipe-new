//import modul 
const express = require('express');
const sqlite3 = sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

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
  
