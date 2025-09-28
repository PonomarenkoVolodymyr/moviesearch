import 'bootstrap/dist/css/bootstrap.min.css'
import Search from './components/Search'
import Movies from './components/Movies'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from './components/Loader'
import delay from './helper'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import AboutUs from './components/AboutUs'
import Favorites from './components/Favorites'
import useStorage from './hooks/useStorage'
import { createContext } from 'react'

export const TypeContext = createContext()



function App() { 
  const [moviesList, setMoviesList] = useState([])
  const [page, setPages] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [inProgress, setInProgress] = useState(false)
  const {getItem, setItem} = useStorage()
  const [type, setType] = useState('')
  

  const handleSearch = async (params) => {    
    setInProgress(true)
    setType(params.type)
    const storeKey = params.search.replaceAll(" ","_")+"_"+params.type+"_"+params.year
    const cahsedList = getItem(storeKey)

    if (cahsedList){
      setMoviesList(cahsedList.results)
      setTotalPages(cahsedList.total_pages)
      setTotalItems(cahsedList.total_results)
      setInProgress(false)
      return
    }

    const url = `https://api.themoviedb.org/3/search/${params.type}?include_adult=false&language=en-US&page=1&query=${params.search}&year=${params.year}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN
      }
    };
    
    try {
      const response = await fetch(url, options)
      if(response.ok){
        const data = await response.json()
        setItem(storeKey, data)
        setMoviesList(data.results || [])
        setTotalPages(data.total_pages)
        setTotalItems(data.total_results)

      } else {
        toast.error(response.status || "Error fetching data")
        return
      }        
      
    } catch (error) {
      toast.error("Failed to fetch data")
      console.error('Error:', error)
    } finally{
       await delay(1000)
      setInProgress(false)
    }
   
  }

  return (    
    <Router /*basename="/moviesearch"*/>
      <TypeContext value={type}>
    {inProgress && <Loader/>}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route 
          index 
          element={
            <>
              <div className="mb-3">
                <Search onSearch={handleSearch} />
              </div>
              <Movies movies={moviesList} totalItems={totalItems}/>
            </>
          } 
        />
        <Route path="about" element={<AboutUs />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
    

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick={false}
      pauseOnHover={true}
      draggable={true}
      theme="colored"
    />   
    </TypeContext> 
  </Router>
  )
}

export default App