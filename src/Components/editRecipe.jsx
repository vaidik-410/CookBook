import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    try {
      const res = await fetch(`http://localhost:3000/recipes/${id}`);
      if (!res.ok) throw new Error('Failed to fetch recipe');
      const data = await res.json();
      setRecipe(data);
    } catch (err) {
      console.error(err);
      alert('Could not load recipe');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // For arrays like instructions / ingredients we’ll use a textarea with one per line
  const handleArrayChange = (e, field) => {
    const value = e.target.value;
    const arr = value.split('\n').filter((line) => line.trim() !== '');
    setRecipe((prev) => ({
      ...prev,
      [field]: arr,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/recipes/${id}`, recipe);
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update recipe");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to={`/recipes/${id}`} className="text-black mb-4 inline-block">Back to details</Link>
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input name="name" value={recipe.name || ''} onChange={handleChange} className="w-full border rounded px-3 py-2"/>
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input name="image" value={recipe.image || ''} onChange={handleChange} className="w-full border rounded px-3 py-2"/>
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <input type="number" step="0.1" name="rating" value={recipe.rating || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ingredients (one per line)</label>
          <textarea rows={5} value={(recipe.ingredients || []).join('\n')} onChange={(e) => handleArrayChange(e, 'ingredients')} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Instructions (one step per line)</label>
          <textarea rows={6} value={(recipe.instructions || []).join('\n')} onChange={(e) => handleArrayChange(e, 'instructions')} className="w-full border rounded px-3 py-2"/>
        </div>

        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white" >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;