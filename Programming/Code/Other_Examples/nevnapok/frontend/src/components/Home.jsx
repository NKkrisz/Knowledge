import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div id='home'>
      <h1>Névnapkereső</h1>
      <div id="buttons">
        <button onClick={()=>navigate("/findNames")}>Keresés dátum szerint</button>
        <button onClick={()=>navigate("/findDates")}>Keresés név szerint</button>
      </div>
    </div>
  )
}

export default Home
