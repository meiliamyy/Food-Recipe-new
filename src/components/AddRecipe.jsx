// AddRecipe.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRecipe.css"; // Jika sudah membuat file CSS khusus

function AddRecipe() {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState("");
  const [bahan, setBahan] = useState("");
  const [cara, setCara] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ubah input textarea menjadi array dengan memisahkan tiap baris
    const bahanArray = bahan.split("\n").filter(item => item.trim() !== "");
    const caraArray = cara.split("\n").filter(item => item.trim() !== "");

    fetch("http://localhost:5000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama,
        kategori,
        gambar,
        bahan: bahanArray,
        cara: caraArray
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal menambahkan resep");
        }
        return res.json();
      })
      .then(() => {
        // Setelah berhasil, arahkan kembali ke Dashboard agar data baru muncul
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="add-recipe-container">
      <h2>Tambah Resep Baru</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Resep:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Kategori:</label>
          <input
            type="text"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL Gambar:</label>
          <input
            type="text"
            value={gambar}
            onChange={(e) => setGambar(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bahan-bahan (pisahkan tiap baris):</label>
          <textarea
            value={bahan}
            onChange={(e) => setBahan(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Cara Membuat (pisahkan tiap langkah baris baru):</label>
          <textarea
            value={cara}
            onChange={(e) => setCara(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Tambahkan Resep</button>
      </form>
    </div>
  );
}

export default AddRecipe;
