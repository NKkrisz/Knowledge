import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import FindDates from './components/FindDates'
import FindNames from './components/FindNames'

function App() {
  const router = createBrowserRouter([
    {
      path:"/", element : <Home/>
    },
    {
      path:"/findDates", element : <FindDates/>
    },
    {
      path:"/findNames", element: <FindNames/>
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
