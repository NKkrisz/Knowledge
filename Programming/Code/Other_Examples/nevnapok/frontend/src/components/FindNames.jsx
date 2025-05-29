import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getData } from '../utils'

const FindNames = () => {
    const navigate = useNavigate()
    const [date, setDate] = useState("")
    date && console.log(date);

    const [result, setResult] = useState("")
    
    const handleSearch = async () => {
        const day = date.split("-")[2]
        const month = date.split("-")[1]
        getData(`http://localhost:8000/api/names/${day}/${month}`, setResult)
    }

    useEffect(()=>{
      setResult("")
    }, [date])

    result && console.log(result);

  return (
    <div>
      <button onClick={()=>navigate("/")}>🏠</button>
      <div className="container">
        <div className="kereso">
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
          <button onClick={handleSearch}>Keresés</button>
        </div>
        <div className="results">
          {date && <h2>Névnap/névnapok {date}</h2>}
          <ul>
              {result && result.map((data, index) =>
                <li key={index}>{data.name}</li>
                )
              }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FindNames
