import { useParams, useNavigate } from "react-router-dom";
import resepData from "../data/resepData";
import "./Detail.css"; // buat file CSS sesuai kebutuhan

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const resep = resepData.find((item) => item.id === parseInt(id));

  if (!resep) {
    return <div>Resep tidak ditemukan</div>;
  }

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
