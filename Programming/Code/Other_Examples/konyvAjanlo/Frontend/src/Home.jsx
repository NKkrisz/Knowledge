import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from './utils';
import { FaHome } from 'react-icons/fa';

export const Home = () => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState("")

  searchInput && console.log(searchInput);

  const [categories, setCategories] = useState([]) 
    
    useEffect(()=>{
        getData("http://localhost:8000/api/categories", setCategories)
    }, [])

    categories && console.log(categories);

  return (
    <>
      <button id='GoHomeButton' onClick={()=>navigate("/")}><FaHome/></button>

      <img style={{width:"100%", height:"auto", marginTop:"-1rem"}} src="header.png" alt="2025 Reading Challenge Header" />

      <div id='SearchAndStuff'>
        <div id='SearchInputContainer'>
          <input id='Search' type="text" placeholder='Keresés...' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
          <button disabled={searchInput==""} onClick={()=>navigate("/BooksSearch/"+searchInput)} id='SearchButton'>🔍</button>
        </div>
        <p id='TextThing'>Minden egyes könyv egy új világ, amit csak ki kell nyitnod.</p>
      </div>

      <div id='Categories'>
        <p>
          <b>Döntsd el, mit is olvass ezután?</b>
          <br />
          Jó helyen jársz. Milyen műfajokat kedvelsz?
        </p>
        <div id="CategoriesButtons">
          {categories && categories.map((category)=>
            <button key={category.id} onClick={()=>navigate("/Books/"+category.id)}>{category.name}</button>
          )}
        </div>
      </div>
    </>
  )
}


