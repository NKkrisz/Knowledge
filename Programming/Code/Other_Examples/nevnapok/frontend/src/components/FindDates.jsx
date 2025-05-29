import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { getData } from '../utils'

const FindDates = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    
    // name && console.log(name);

    const [result, setResult] = useState([])
    const [origin, setOrigin] = useState([])
    const [nameError, setNameError] = useState("")
    const [originError, setOriginError] = useState("")

    const handleSearch = () => {
      getData(`http://localhost:8000/api/dates/${name}`, setResult, setNameError)
      nameError && setOrigin([])
      {result != undefined && getData(`http://localhost:8000/api/info/${name}`, setOrigin, setOriginError)}
    }
    
    result && console.log("result:"+result);
    // nameError && console.log(nameError);
    origin && console.log(origin);

    const months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"]

  return (
    <div>
      <button onClick={()=>navigate("/")}>🏠</button>
      <div className="container">
        <div className="kereso">
          <input type="text" placeholder='Írd be a keresendő nevet!' value={name} onChange={(e)=>setName(e.target.value)}/>
          <button onClick={handleSearch}>Keresés</button>
        </div>
        <div className="results">
          <ul>
              {result &&
                result.map((data, index) =>
                    <li key={index}>{months[data.month-1] + "-" + data.day}</li>
                )
              }
              {nameError && 
                <p>Név: {nameError}</p>
              }
          </ul>
          {origin[0] != undefined && <p>{origin[0].descr}</p>}
        </div>
      </div>
    </div>
  )
}

export default FindDates