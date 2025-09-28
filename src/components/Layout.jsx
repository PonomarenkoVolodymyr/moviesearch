import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from "./Header"

const Layout = () => {
  return (     
      <Container className="py-4">
        <Header />
        <Outlet />
      </Container>    
  )
}

export default Layout