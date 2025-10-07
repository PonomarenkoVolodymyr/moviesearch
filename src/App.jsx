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

// eslint-disable-next-line react-refresh/only-export-components
export const TypeContext = createContext()

function App() { 
  const [moviesList, setMoviesList] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [inProgress, setInProgress] = useState(false)
  const { getItem, setItem } = useStorage()
  const [type, setType] = useState('')
  const [lastSearch, setLastSearch] = useState(null)

  
  const fetchMovies = async (params, currentPage = 1) => {    
    setInProgress(true)
    setType(params.type)
    setPage(currentPage)
    setLastSearch(params)

    const storeKey = `${params.search.replaceAll(" ","_")}_${params.type}_${params.year}_${currentPage}`
    const cachedList = getItem(storeKey)

    if (cachedList) {
      setMoviesList(cachedList.results)
      setTotalPages(cachedList.total_pages)
      setTotalItems(cachedList.total_results)
      setInProgress(false)
      return
    }

    let url = `https://api.themoviedb.org/3/search/${params.type}?include_adult=false&language=en-US&page=${currentPage}&query=${params.search}`;

    if (params.year && params.type === 'movie') {
      url += `&year=${params.year}`;
    } else if (params.year && params.type === 'tv') {
      url += `&first_air_date_year=${params.year}`;
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN
      }
    };
    
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        setItem(storeKey, data)
        setMoviesList(data.results || [])
        setPage(data.page)
        setTotalPages(data.total_pages)
        setTotalItems(data.total_results)
      } else {
        toast.error(response.status || "Error fetching data")
      }        
      
    } catch (error) {
      toast.error("Failed to fetch data")
      console.error('Error:', error)
    } finally {
      await delay(500)
      setInProgress(false)
    }
  }


  const handleSearch = async (params) => {
    await fetchMovies(params, 1)
  }
  
  const handlePageChange = (newPage) => {
    if (lastSearch) {
      fetchMovies(lastSearch, newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (    
    <Router basename="/moviesearch">
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
                  <Movies 
                    movies={moviesList} 
                    totalItems={totalItems}
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={handlePageChange}
                  />
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
          theme="colored"
        />   
      </TypeContext> 
    </Router>
  )
}

export default App
