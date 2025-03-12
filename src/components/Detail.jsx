import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import resepData from "../data/resepData";
import "./Detail.css"; // buat file CSS sesuai kebutuhan

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resep, setResep] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setResep(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!resep) return <div>Resep tidak ditemukan</div>;

  return (
    <>
      <header>
        <h1 className="header-recipe">Meilia recipe</h1>
      </header>
      <div className="detail-container">
        <img src={resep.gambar} alt={resep.nama} className="gambar-detail" />
        <div className="detail-text">
          <h2>{resep.nama}</h2>
          <h3>Bahan-bahan:</h3>
          <ul>
            {resep.bahan.map((bahan, index) => (
              <li key={index}>{bahan}</li>
            ))}
          </ul>
          <h3>Cara Membuat:</h3>
          <ol>
            {resep.cara.map((langkah, index) => (
              <li key={index}>{langkah}</li>
            ))}
          </ol>
          <button className="detail-button" onClick={() => navigate("/")}>
            Kembali ke Halaman Utama
          </button>
        </div>
      </div>
      <footer className="footer-detail">
        <p>&copy; 2025 Meilia Recipe Collection. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Detail;
