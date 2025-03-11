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