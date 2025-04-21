/* DeleteRecipe.jsx */
import { useEffect, useState } from "react";
import "./DeleteRecipe.css";

function DeleteRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/recipes")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching recipes: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setRecipes(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Anda yakin ingin menghapus resep ini?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/recipes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Error saat menghapus resep: ${res.status}`);
      }
      // Update state after delete
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="delete-container">
      <h2>Hapus Resep</h2>
      {error && <p className="error">Error: {error}</p>}
      {recipes.length === 0 ? (
        <p className="no-data">Tidak ada resep yang tersedia.</p>
      ) : (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <div className="recipe-info">
                <img
                  src={recipe.gambar}
                  alt={recipe.nama}
                  className="thumb"
                />
                <span className="recipe-name">{recipe.nama}</span>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(recipe.id)}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeleteRecipe;