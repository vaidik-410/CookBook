import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FetchApi = () => {
  const [apiData, setApiData] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/recipes");
    const data = await res.json();
    setApiData(data);
    setLoading(false);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const filtering = apiData.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerms.toLowerCase())
  );

  if (loading) return <p>Loading recipes...</p>;

  return (
    <>
      <form className="flex items-center max-w-sm mx-auto space-x-2 py-3" onSubmit={(e) => e.preventDefault()}>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input type="text" id="simple-search" className="px-3 py-2.5 rounded-lg bg-neutral-secondary-medium border border-default-medium ps-9 text-heading text-sm block w-full placeholder:text-body" autoComplete="off" placeholder="Search recipes..." value={searchTerms} onChange={(e) => setSearchTerms(e.target.value)}/>
        </div>

        <button type="submit" className="inline-flex items-center justify-center text-white rounded-lg bg-black hover:bg-gray-900 shadow w-10 h-10">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M21 21l-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </form>

      <div className="flex flex-wrap gap-5 justify-center">
        {filtering.map((ele, i) => (
          <div className="bg-stone-100 block max-w-sm p-6 border rounded-lg shadow">
            <img className="rounded-lg" src={ele.image} alt={ele.name} />
            <h5 className="mt-6 mb-2 text-2xl font-semibold">{ele.name}</h5>
            <p className="mb-2">Meal: {ele.mealType}</p>
            <p className="mb-6">Ratings: {ele.rating}</p>
            <Link to={`/recipe/${ele.id}`}>
              <button className="inline-flex items-center rounded-lg bg-gray-200 border px-4 py-2 text-sm">Recipe</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default FetchApi;
