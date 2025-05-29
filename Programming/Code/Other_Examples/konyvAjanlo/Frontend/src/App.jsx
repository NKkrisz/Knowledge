import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Home } from './Home'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from "react-icons/fa";
import Books from './Books';

function App() {
  const router = createBrowserRouter([
    {
      path:"/", element : <Home/>
    },
    {
      path:"/Books/:category", element: <Books/>
    },
    {
      path:"/BooksSearch/:searchQuery", element: <Books/>
    }
  ])

  return (
    <div className="container">
      <header>
        <h1>Olvasni <span style={{color:"purple"}}>jó</span>!</h1>
      </header>
      
      <RouterProvider router={router}/>
      
      <footer>
          <p>Connect</p>
          <FaFacebook/>
          <FaTwitter/>
          <FaInstagram/>
          <FaLinkedin/>
      </footer>
    </div>
  )
}

export default App
