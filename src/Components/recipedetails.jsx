import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const Recipedetails = () => {
    const { id }=useParams();
    const [recipe,setRecipe]=useState(null);

    const fetchRecipe=async()=>{
        const res = await fetch(`http://localhost:3000/recipes/${id}`);
        const data = await res.json();
        setRecipe(data);
    }

    useEffect(()=>{
        fetchRecipe();
    },[id]);

    if(!recipe) return <p>Loading Recipe...</p>;

   return (
  <div className="max-w-4xl mx-auto p-6">
    <Link to="/recipes" className="text-black mb-4 inline-block">Back</Link>
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <img className="rounded-lg w-48 md:w-64" src={recipe.image} alt={recipe.name} />
      <div className="flex-1">
        <h1 className="text-3xl font-bold">{recipe.name}</h1>
        <p className="text-lg mt-3">Meal Type: {recipe.mealType}</p>
        <p className="text-lg mb-6">Rating: {recipe.rating}</p>
        <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
        <ul className="list-disc ml-6">
          {recipe.ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
    <h2 className="text-xl font-semibold mt-8">Instructions</h2>
    <p className="mt-2 whitespace-pre-line">
      {recipe.instructions}
    </p>
  </div>
);

}

export default Recipedetails
