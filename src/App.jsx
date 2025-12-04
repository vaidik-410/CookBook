import FetchApi from './Components/fetchAPI'
import Header from './Components/header'
import Loginpage from './Components/loginpage'
import Home from './Components/home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contact from './Components/contact.jsx';
import RecipeDetails from './Components/recipedetails.jsx';
import EditRecipe from "./Components/editRecipe.jsx"
import axios from 'axios';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path='/recipes' element={<FetchApi/>}></Route>
            <Route path='/login' element={<Loginpage/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/recipes/:id/edit" element={<EditRecipe />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
