import { useNavigate } from "react-router-dom";
import resepData from "../data/resepData";
import "./Dashboard.css"; // buat file CSS sesuai kebutuhan

function Dashboard() {
  const navigate = useNavigate();

  const handleKlikResep = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">Meilia Recipe Collection 👩🏻‍🍳</header>

      {/* Glass Icons Section */}
      <div className="glass-container">
        <a
          href="https://github.com/meiliamyy"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }} // opsional, untuk menghilangkan garis bawah
        >
          <div data-text="Github" style={{ "--r": "-15" }} className="glass">
            <svg viewBox="0 0 496 512" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
            </svg>
          </div>
        </a>
        <a href="https://github.com/meiliamyy/scrimba-project/tree/main/mey-plan-react/Food-Recipe">
          <div data-text="Code" style={{ "--r": "5" }} className="glass">
            <svg viewBox="0 0 640 512" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"></path>
            </svg>
          </div>
        </a>

        <a href="https://www.instagram.com/dishedbymeyy" target="_blank" rel="noopener noreferrer">
          <div data-text="Instagram" style={{ "--r": "25" }} className="glass">
            <svg viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.3 0-74.7-33.4-74.7-74.7S182.8 181.2 224.1 181.2 298.8 214.6 298.8 255.9 265.4 330.6 224.1 330.6zM370.5 136.6c0 14.9-12 26.9-26.9 26.9h-54c-14.9 0-26.9-12-26.9-26.9v-54c0-14.9 12-26.9 26.9-26.9h54c14.9 0 26.9 12 26.9 26.9v54zM398.8 97.2c-4.1-9.8-9.6-18.2-17-25.3-7.4-7.1-15.8-12.7-25.6-16.9C345.3 46.7 333.8 44.7 322.8 44.7H125.1C114.1 44.7 102.6 46.7 93.8 55.1c-9.8 4.2-18.2 9.8-25.6 16.9-7.4 7.1-12.9 15.5-17 25.3C44.7 108.3 44.7 119.8 44.7 130.8v200.2c0 11 0 22.5 4.1 33.3 4.1 9.8 9.6 18.2 17 25.3 7.4 7.1 15.8 12.7 25.6 16.9 9.8 4.2 21.3 6.2 32.3 6.2h197.7c11 0 22.5-0.1 33.3-4.2 9.8-4.1 18.2-9.6 25.3-17 7.1-7.4 12.7-15.8 16.9-25.6 4.2-9.8 6.2-21.3 6.2-32.3V130.8c0-11.1-2-22.5-6.2-33.3zM398.8 306c0 14.9-12 26.9-26.9 26.9H76.9c-14.9 0-26.9-12-26.9-26.9V130.8c0-14.9 12-26.9 26.9-26.9h295.9c14.9 0 26.9 12 26.9 26.9v175.2z"></path>
            </svg>
          </div>
        </a>
      </div>

      {/* Recipe Grid Section */}
      <div className="grid-container">
        {resepData.map((resep) => (
          <div key={resep.id} className="grid-item">
            <img src={resep.gambar} alt={resep.nama} className="gambar-resep" />
            <h3 className="item-h3">{resep.nama}</h3>
            {/* <p>{resep.kategori}</p> */}
            <button className="learn-more" onClick={() => handleKlikResep(resep.id)}>
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Resep Lengkap</span>
            </button>
          </div>
        ))}
      </div>
      <footer className="footer">
        <p>&copy; 2025 Meilia Recipe Collection. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
