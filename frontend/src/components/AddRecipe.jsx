import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRecipe.css";


function AddRecipe() {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState(null);
  const [gambarPreview, setGambarPreview] = useState(null);
  const [bahan, setBahan] = useState("");
  const [cara, setCara] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Update file and preview when file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    if (file) {
      setGambarPreview(URL.createObjectURL(file));
    } else {
      setGambarPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData instance
    const formData = new FormData();
    const bahanArray = bahan.split("\n").filter((item) => item.trim() !== "");
    const caraArray = cara.split("\n").filter((item) => item.trim() !== "");

    formData.append("nama", nama);
    formData.append("kategori", kategori);
    if (gambar) {
      formData.append("gambar", gambar);
    }
    formData.append("bahan", JSON.stringify(bahanArray));
    formData.append("cara", JSON.stringify(caraArray));

    console.log("Data yang dikirim ke server:", Object.fromEntries(formData.entries()));

    try {
      const res = await fetch("http://localhost:5000/recipes", {
        method: "POST",
        body: formData,
      });

      console.log("📥 Response status:", res.status);

      if (!res.ok) {
        let errorMessage = "Gagal menambahkan resep";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          console.error("Response bukan JSON:", err);
        }
        throw new Error(errorMessage);
      }

      // Optionally, you can update a list of recipes or navigate to another page
      navigate("/");
    } catch (err) {
      console.error("❌ Error submit:", err);
      setError(err.message);
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Tambah Resep Baru</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <label>Upload gambar:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        {/* Show preview if image selected */}
        {gambarPreview && (
          <div className="gambar-preview">
            <p>Preview Gambar:</p>
            <img src={gambarPreview} alt="Preview" style={{ maxWidth: "300px" }} />
          </div>
        )}
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
