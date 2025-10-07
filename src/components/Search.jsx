import React, { useState } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import "../assets/css/styles.scss"
import { toast } from 'react-toastify'

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("")
  const [type, setType] = useState("movie")
  const [year, setYear] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const searchString = search.trim().toLowerCase()
    if (searchString === "" ) return toast.warning("Enter movie name")
    onSearch({search: searchString, type, year})
  }

  return (
    <Card className='custom-card'>
      <Card.Body>
      <Form className='search-form' onSubmit={handleSubmit}>
  <div className='row g-2'>
    <Form.Group className='col-12 col-md-6'>
      <Form.Control 
        onChange={(e) => setSearch(e.target.value)}  
        type="text" 
        placeholder="Enter movie" 
        value={search}
      />
    </Form.Group>

    <Form.Group className='col-6 col-md-3'>
      <Form.Select 
        onChange={(e) => setType(e.target.value)} 
        value={type}
      >
        <option value="movie">Movie</option>
        <option value="tv">TV Series</option>
        <option value="person">Actor</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className='col-6 col-md-2'>
      <Form.Control 
        onChange={(e) => setYear(e.target.value)} 
        type="number" 
        placeholder="Enter year" 
        value={year}
      />
    </Form.Group>

    <div className='col-12 col-md-1 d-grid'>
      <Button variant="success" type="submit">Search</Button>
    </div>
  </div>
</Form>

      </Card.Body>
    </Card>
  )  
}

export default Search