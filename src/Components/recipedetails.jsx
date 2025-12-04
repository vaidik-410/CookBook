import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const Recipedetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      const res = await fetch(`http://localhost:3000/recipes/${id}`);
      if (!res.ok) throw new Error('Failed to fetch recipe');
      const data = await res.json();
      setRecipe(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const sure = window.confirm('Are you sure you want to delete this recipe?');
    if (!sure) return;

    try {
      const res = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete recipe');

      // After delete, go back to recipe list
      navigate('/recipes');
    } catch (error) {
      console.error(error);
      alert('Something went wrong while deleting.');
    }
  };

  const handleEdit = () => {
    navigate(`/recipes/${id}/edit`);
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading Recipe...</p>;

  // instructions in your db are an ARRAY, so let's join them
  const instructionsText = Array.isArray(recipe.instructions)? recipe.instructions.join('\n'): recipe.instructions;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/recipes" className="text-black mb-4 inline-block">
        Back
      </Link>

      <div className="flex justify-end gap-3 mb-4">
        <button onClick={handleEdit} className="px-4 py-2 border hover:text-gray-400 rounded text-black" >Edit</button>
        <button onClick={handleDelete} className="px-4 py-2 border hover:text-gray-400 rounded text-black">Delete</button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img className="rounded-lg w-48 md:w-64" src={recipe.image} alt={recipe.name}/>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{recipe.name}</h1>
          <p className="text-lg mt-3">
            Meal Type:{' '}
            {Array.isArray(recipe.mealType)
              ? recipe.mealType.join(', ')
              : recipe.mealType}
          </p>
          <p className="text-lg mb-6">Rating: {recipe.rating}</p>
          <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
          <ul className="list-disc ml-6">
            {recipe.ingredients?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-8">Instructions</h2>
      <p className="mt-2 whitespace-pre-line">{instructionsText}</p>
    </div>
  );
};

export default Recipedetails;